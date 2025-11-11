import { DEFAULT_CATEGORIES } from '@/types';

// Default vendor-to-category mappings
const DEFAULT_VENDOR_MAPPINGS: Record<string, string> = {
  // Groceries
  'costco': 'Groceries',
  'walmart': 'Groceries',
  'target': 'Groceries',
  'whole foods': 'Groceries',
  'trader joe': 'Groceries',
  'safeway': 'Groceries',
  'kroger': 'Groceries',
  'publix': 'Groceries',
  'albertsons': 'Groceries',

  // Restaurants
  'mcdonald': 'Restaurants',
  'starbucks': 'Restaurants',
  'chipotle': 'Restaurants',
  'panera': 'Restaurants',
  'subway': 'Restaurants',
  'dunkin': 'Restaurants',
  'chick-fil-a': 'Restaurants',
  'taco bell': 'Restaurants',
  'pizza': 'Restaurants',
  'restaurant': 'Restaurants',
  'cafe': 'Restaurants',
  'coffee': 'Restaurants',

  // Gas/Fuel
  'shell': 'Gas/Fuel',
  'chevron': 'Gas/Fuel',
  'exxon': 'Gas/Fuel',
  'mobil': 'Gas/Fuel',
  'bp': 'Gas/Fuel',
  'arco': 'Gas/Fuel',
  '76': 'Gas/Fuel',
  'valero': 'Gas/Fuel',
  'gas': 'Gas/Fuel',
  'fuel': 'Gas/Fuel',

  // Transportation
  'uber': 'Transportation',
  'lyft': 'Transportation',
  'parking': 'Transportation',
  'toll': 'Transportation',
  'transit': 'Transportation',

  // Home Improvement
  'home depot': 'Home Improvement',
  'lowes': 'Home Improvement',
  'ace hardware': 'Home Improvement',
  'menards': 'Home Improvement',
  'hardware': 'Home Improvement',

  // Utilities
  'electric': 'Utilities',
  'water': 'Utilities',
  'gas company': 'Utilities',
  'internet': 'Utilities',
  'comcast': 'Utilities',
  'at&t': 'Utilities',
  'verizon': 'Utilities',

  // Healthcare
  'pharmacy': 'Healthcare',
  'cvs': 'Healthcare',
  'walgreens': 'Healthcare',
  'rite aid': 'Healthcare',
  'hospital': 'Healthcare',
  'medical': 'Healthcare',
  'doctor': 'Healthcare',
  'dental': 'Healthcare',

  // Pet Care
  'pet': 'Pet Care',
  'petsmart': 'Pet Care',
  'petco': 'Pet Care',
  'veterinary': 'Pet Care',
  'vet': 'Pet Care',

  // Entertainment
  'netflix': 'Entertainment',
  'spotify': 'Entertainment',
  'movie': 'Entertainment',
  'theater': 'Entertainment',
  'cinema': 'Entertainment',
  'game': 'Entertainment',

  // Shopping
  'amazon': 'Shopping',
  'amzn': 'Shopping',
  'ebay': 'Shopping',
  'etsy': 'Shopping',
  'best buy': 'Shopping',
  'mall': 'Shopping',

  // Office Supplies
  'staples': 'Office Supplies',
  'office depot': 'Office Supplies',
  'fedex': 'Office Supplies',
  'ups': 'Office Supplies',
  'usps': 'Office Supplies',

  // Professional Services
  'legal': 'Professional Services',
  'attorney': 'Professional Services',
  'accountant': 'Professional Services',
  'consulting': 'Professional Services',

  // Insurance
  'insurance': 'Insurance',
  'geico': 'Insurance',
  'state farm': 'Insurance',
  'allstate': 'Insurance',

  // Travel
  'airline': 'Travel',
  'hotel': 'Travel',
  'marriott': 'Travel',
  'hilton': 'Travel',
  'airbnb': 'Travel',
  'travel': 'Travel',

  // Education
  'school': 'Education',
  'university': 'Education',
  'college': 'Education',
  'tuition': 'Education',
  'books': 'Education',
};

export function categorizeVendor(vendor: string): string | null {
  if (!vendor) return null;

  const lowerVendor = vendor.toLowerCase();

  // Check each mapping pattern
  for (const [pattern, category] of Object.entries(DEFAULT_VENDOR_MAPPINGS)) {
    if (lowerVendor.includes(pattern)) {
      return category;
    }
  }

  return 'Other';
}

export function getDefaultCategory(): string {
  return 'Other';
}

export { DEFAULT_CATEGORIES };
