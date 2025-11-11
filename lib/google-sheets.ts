import { google, sheets_v4 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { getTemplateByType } from './sheet-templates';
import { TemplateType } from '@/types';

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/sheets/connect`
);

export function getAuthUrl(): string {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
    ],
    prompt: 'consent',
  });
}

export async function getTokensFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export async function createSheetFromTemplate(
  accessToken: string,
  templateType: TemplateType
): Promise<{ sheetId: string; sheetUrl: string; sheetName: string }> {
  oauth2Client.setCredentials({ access_token: accessToken });

  const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
  const template = getTemplateByType(templateType);

  // Create new spreadsheet
  const response = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: `ReceiptBox - ${template.name}`,
      },
      sheets: template.sheets.map((sheet, index) => ({
        properties: {
          title: sheet.name,
          sheetId: index,
          gridProperties: {
            rowCount: 1000,
            columnCount: 26,
            frozenRowCount: sheet.headers ? 1 : 0,
          },
        },
      })),
    },
  });

  const spreadsheetId = response.data.spreadsheetId!;
  const sheetUrl = response.data.spreadsheetUrl!;

  // Add headers to the first sheet (Transactions sheet)
  const firstSheet = template.sheets[0];
  if (firstSheet.headers) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${firstSheet.name}!A1:${String.fromCharCode(64 + firstSheet.headers.length)}1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [firstSheet.headers],
      },
    });

    // Format header row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.06, green: 0.73, blue: 0.51 }, // emerald-600
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    fontSize: 11,
                    bold: true,
                  },
                  horizontalAlignment: 'CENTER',
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
            },
          },
        ],
      },
    });
  }

  // Add content to other sheets based on template type
  await populateTemplateSheets(sheets, spreadsheetId, templateType);

  return {
    sheetId: spreadsheetId,
    sheetUrl,
    sheetName: response.data.properties?.title || template.name,
  };
}

async function populateTemplateSheets(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  templateType: TemplateType
) {
  // Add instructions to the Instructions sheet
  const instructionsSheetName = 'Instructions';
  const instructions = getInstructionsForTemplate(templateType);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${instructionsSheetName}!A1:B10`,
    valueInputOption: 'RAW',
    requestBody: {
      values: instructions,
    },
  });
}

function getInstructionsForTemplate(templateType: TemplateType): string[][] {
  const baseInstructions = [
    ['Welcome to ReceiptBox!', ''],
    ['', ''],
    ['How to use:', ''],
    ['1. Upload receipts in ReceiptBox', ''],
    ['2. Review and confirm the extracted data', ''],
    ['3. Click "Add to Sheet" to write the data here', ''],
    ['4. Your data will appear in the first sheet', ''],
    ['5. The Dashboard sheet will update automatically', ''],
    ['', ''],
    ['Need help? Visit receiptbox.com/support', ''],
  ];

  return baseInstructions;
}

export async function writeReceiptToSheet(
  accessToken: string,
  sheetId: string,
  receiptData: {
    date: Date | null;
    vendor: string | null;
    category: string | null;
    amount: number | null;
    tax_amount: number | null;
    payment_method: string | null;
    receipt_link: string;
    notes: string | null;
  }
): Promise<void> {
  oauth2Client.setCredentials({ access_token: accessToken });

  const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

  // Get the sheet metadata to find the first sheet name
  const metadata = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const firstSheetName = metadata.data.sheets?.[0]?.properties?.title || 'Transactions';

  // Format the row data
  const rowData = [
    receiptData.date ? receiptData.date.toISOString().split('T')[0] : '',
    receiptData.vendor || '',
    receiptData.category || '',
    receiptData.amount || '',
    receiptData.tax_amount || '',
    receiptData.payment_method || '',
    receiptData.receipt_link || '',
    receiptData.notes || '',
  ];

  // Append the row
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${firstSheetName}!A:H`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [rowData],
    },
  });
}

export async function listUserSheets(accessToken: string): Promise<any[]> {
  oauth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const response = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
    fields: 'files(id, name, webViewLink, createdTime)',
    orderBy: 'modifiedTime desc',
    pageSize: 100,
  });

  return response.data.files || [];
}

export async function connectToExistingSheet(
  accessToken: string,
  sheetId: string
): Promise<{ sheetName: string; sheetUrl: string }> {
  oauth2Client.setCredentials({ access_token: accessToken });

  const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

  const response = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
  });

  return {
    sheetName: response.data.properties?.title || 'Unknown Sheet',
    sheetUrl: response.data.spreadsheetUrl || '',
  };
}
