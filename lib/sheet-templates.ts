import { SheetTemplate, TemplateType } from '@/types';

export const SHEET_TEMPLATES: Record<TemplateType, SheetTemplate> = {
  business: {
    type: 'business',
    name: 'Business Expenses',
    description: 'Track business expenses with tax deductions, quarterly summaries, and dashboard analytics.',
    sheets: [
      {
        name: 'Transactions',
        headers: [
          'Date',
          'Vendor',
          'Category',
          'Amount',
          'Tax',
          'Payment Method',
          'Receipt Link',
          'Notes',
          'Deductible',
        ],
      },
      {
        name: 'Dashboard',
      },
      {
        name: 'Tax Summary',
      },
      {
        name: 'Monthly Trends',
      },
      {
        name: 'Instructions',
      },
    ],
  },
  household: {
    type: 'household',
    name: 'Household Budget',
    description: 'Family-friendly budget tracking with spending by person, budget vs actual, and savings goals.',
    sheets: [
      {
        name: 'Transactions',
        headers: [
          'Date',
          'Store',
          'Category',
          'Amount',
          'Who Bought',
          'Budget Category',
          'Receipt Link',
          'Over/Under Budget',
          'Notes',
        ],
      },
      {
        name: 'Family Dashboard',
      },
      {
        name: 'Budget Planner',
      },
      {
        name: 'Bills & Subscriptions',
      },
      {
        name: 'Savings Tracker',
      },
      {
        name: 'Instructions',
      },
    ],
  },
  homestead: {
    type: 'homestead',
    name: 'Homestead Tracker',
    description: 'Track homestead investments, garden ROI, livestock costs, and project budgets.',
    sheets: [
      {
        name: 'Purchases',
        headers: [
          'Date',
          'Vendor',
          'Item',
          'Category',
          'Cost',
          'Season',
          'Project',
          'Receipt Link',
          'ROI Notes',
        ],
      },
      {
        name: 'Homestead Dashboard',
      },
      {
        name: 'Garden ROI',
      },
      {
        name: 'Livestock Costs',
      },
      {
        name: 'Projects',
      },
      {
        name: 'Instructions',
      },
    ],
  },
  personal: {
    type: 'personal',
    name: 'Personal Finance',
    description: 'Comprehensive personal finance tracking with net worth, budget vs actual, and financial goals.',
    sheets: [
      {
        name: 'All Transactions',
        headers: [
          'Date',
          'Vendor',
          'Category',
          'Amount',
          'Account',
          'Receipt Link',
          'Budget',
          'Notes',
        ],
      },
      {
        name: 'Financial Dashboard',
      },
      {
        name: 'Budget vs Actual',
      },
      {
        name: 'Net Worth Tracker',
      },
      {
        name: 'Goals',
      },
      {
        name: 'Instructions',
      },
    ],
  },
};

export function getTemplateByType(type: TemplateType): SheetTemplate {
  return SHEET_TEMPLATES[type];
}

export function getAllTemplates(): SheetTemplate[] {
  return Object.values(SHEET_TEMPLATES);
}
