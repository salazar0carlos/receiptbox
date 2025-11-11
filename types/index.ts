export interface Receipt {
  id: string;
  user_id: string;
  image_url: string;
  vendor: string | null;
  amount: number | null;
  date: Date | null;
  category: string | null;
  tax_amount: number | null;
  payment_method: string | null;
  notes: string | null;
  raw_ocr_data: any;
  sheet_id: string | null;
  sheet_row_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface SheetConnection {
  id: string;
  user_id: string;
  sheet_id: string;
  sheet_name: string;
  sheet_url: string;
  template_type: 'business' | 'household' | 'homestead' | 'personal' | 'custom' | null;
  is_default: boolean;
  last_sync_at: Date | null;
  created_at: Date;
}

export interface UserSettings {
  user_id: string;
  default_category: string | null;
  auto_categorize: boolean;
  require_review: boolean;
  image_quality: 'high' | 'medium' | 'low';
  auto_delete_days: number | null;
  theme: 'light' | 'dark' | 'system';
  notifications_email: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CustomCategory {
  id: string;
  user_id: string;
  name: string;
  color: string | null;
  created_at: Date;
}

export interface VendorMapping {
  id: string;
  user_id: string;
  vendor_pattern: string;
  category: string;
  created_at: Date;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  plan_type: 'free' | 'pro' | 'family' | 'business';
  status: string;
  current_period_end: Date | null;
  created_at: Date;
}

export interface UsageLog {
  id: string;
  user_id: string;
  action: string;
  created_at: Date;
}

export const DEFAULT_CATEGORIES = [
  'Groceries',
  'Restaurants',
  'Gas/Fuel',
  'Transportation',
  'Home Improvement',
  'Utilities',
  'Healthcare',
  'Pet Care',
  'Entertainment',
  'Shopping',
  'Office Supplies',
  'Professional Services',
  'Insurance',
  'Taxes',
  'Gifts',
  'Travel',
  'Education',
  'Subscriptions',
  'Other',
] as const;

export type Category = typeof DEFAULT_CATEGORIES[number];

export interface OCRData {
  vendor: string | null;
  amount: number | null;
  date: Date | null;
  category: string | null;
  tax_amount: number | null;
  payment_method: string | null;
  raw_text: string;
  confidence: number;
}

export type TemplateType = 'business' | 'household' | 'homestead' | 'personal';

export interface SheetTemplate {
  type: TemplateType;
  name: string;
  description: string;
  sheets: {
    name: string;
    headers?: string[];
    formulas?: Record<string, string>;
  }[];
}
