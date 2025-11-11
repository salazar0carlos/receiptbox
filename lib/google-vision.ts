import { ImageAnnotatorClient } from '@google-cloud/vision';
import { OCRData } from '@/types';
import { categorizeVendor } from './categorize';

// Initialize Google Vision client
// For local: set GOOGLE_APPLICATION_CREDENTIALS to path of service account JSON
// For Vercel: set GOOGLE_APPLICATION_CREDENTIALS_JSON to the JSON content
let vision: ImageAnnotatorClient;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  // Vercel/production: credentials from environment variable
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  vision = new ImageAnnotatorClient({ credentials });
} else {
  // Local development: uses GOOGLE_APPLICATION_CREDENTIALS file path
  vision = new ImageAnnotatorClient();
}

export async function extractReceiptData(imageBuffer: Buffer): Promise<OCRData> {
  try {
    const [result] = await vision.textDetection(imageBuffer);
    const detections = result.textAnnotations;

    if (!detections || detections.length === 0) {
      throw new Error('No text detected in image');
    }

    // First annotation contains all text
    const fullText = detections[0]?.description || '';

    // Parse receipt data
    const vendor = extractVendor(fullText);
    const amount = extractAmount(fullText);
    const date = extractDate(fullText);
    const taxAmount = extractTax(fullText);
    const paymentMethod = extractPaymentMethod(fullText);
    const category = categorizeVendor(vendor || '');

    return {
      vendor,
      amount,
      date,
      category,
      tax_amount: taxAmount,
      payment_method: paymentMethod,
      raw_text: fullText,
      confidence: result.textAnnotations?.[0]?.confidence || 0.5,
    };
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from receipt');
  }
}

function extractVendor(text: string): string | null {
  // Usually the vendor is in the first few lines
  const lines = text.split('\n').filter(line => line.trim().length > 0);

  if (lines.length > 0) {
    // Return the first substantial line (more than 2 chars)
    const vendor = lines.find(line => line.length > 2);
    return vendor?.trim() || null;
  }

  return null;
}

function extractAmount(text: string): number | null {
  // Look for patterns like "TOTAL: $XX.XX" or "Total $XX.XX"
  const patterns = [
    /total[:\s]+\$?(\d+\.\d{2})/i,
    /amount[:\s]+\$?(\d+\.\d{2})/i,
    /balance[:\s]+\$?(\d+\.\d{2})/i,
    /\$(\d+\.\d{2})/g,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const amount = parseFloat(match[1] || match[0].replace('$', ''));
      if (!isNaN(amount)) {
        return amount;
      }
    }
  }

  return null;
}

function extractDate(text: string): Date | null {
  // Look for date patterns
  const patterns = [
    /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/,
    /(\d{1,2})-(\d{1,2})-(\d{2,4})/,
    /(\d{4})-(\d{1,2})-(\d{1,2})/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      try {
        // Try to parse the date
        let date: Date;
        if (match[0].includes('-') && match[1].length === 4) {
          // YYYY-MM-DD
          date = new Date(match[0]);
        } else {
          // MM/DD/YYYY or similar
          const [, month, day, year] = match;
          const fullYear = year.length === 2 ? `20${year}` : year;
          date = new Date(`${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        }

        if (!isNaN(date.getTime())) {
          return date;
        }
      } catch (e) {
        continue;
      }
    }
  }

  return null;
}

function extractTax(text: string): number | null {
  const patterns = [
    /tax[:\s]+\$?(\d+\.\d{2})/i,
    /sales tax[:\s]+\$?(\d+\.\d{2})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const tax = parseFloat(match[1]);
      if (!isNaN(tax)) {
        return tax;
      }
    }
  }

  return null;
}

function extractPaymentMethod(text: string): string | null {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('visa')) return 'Visa';
  if (lowerText.includes('mastercard') || lowerText.includes('master card')) return 'Mastercard';
  if (lowerText.includes('amex') || lowerText.includes('american express')) return 'American Express';
  if (lowerText.includes('discover')) return 'Discover';
  if (lowerText.includes('cash')) return 'Cash';
  if (lowerText.includes('debit')) return 'Debit Card';
  if (lowerText.includes('credit')) return 'Credit Card';

  return null;
}
