# ReceiptBox

**Track every purchase. Household, business, life.**

ReceiptBox is a production-grade receipt management app that uses AI to extract data from receipts and writes directly to your Google Sheets. No manual entry. Zero hassle.

![ReceiptBox](https://via.placeholder.com/1200x600/10b981/ffffff?text=ReceiptBox)

## 🚀 Features

- 📸 **Receipt Upload** - Drag-drop, file picker, or mobile camera
- 🤖 **AI OCR** - Google Vision API extracts vendor, amount, date, category, and more
- 📊 **Google Sheets Integration** - Your data writes directly to your Google Sheet
- 📚 **Receipt Library** - Search, filter, and never lose a receipt
- 🎨 **Beautiful Templates** - Business, Household, Homestead, and Personal finance templates
- 📱 **Mobile Optimized** - Works perfectly on all devices
- 🔒 **Secure** - Bank-level encryption, your data stays in YOUR Google Sheet
- 💳 **Stripe Payments** - Free, Pro, Family, and Business plans

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Database:** Supabase (PostgreSQL + Auth)
- **Styling:** Tailwind CSS
- **OCR:** Google Vision API
- **Sheets:** Google Sheets API v4
- **Storage:** Supabase Storage
- **Auth:** Supabase Auth + Google OAuth
- **Payments:** Stripe
- **Icons:** lucide-react
- **Deployment:** Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Cloud Platform account (for Vision API & Sheets API)
- Stripe account (for payments)

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/receiptbox.git
cd receiptbox
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your URL and keys from Project Settings → API
3. Run the SQL from `database-schema.sql` in SQL Editor
4. Create a storage bucket called `receipts` (make it private)

### 3. Set up Google Cloud

**Enable APIs:**
- Google Vision API
- Google Sheets API
- Google Drive API

**Create OAuth Credentials:**
1. Go to APIs & Services → Credentials
2. Create OAuth 2.0 Client ID
3. Add redirect URI: `http://localhost:3000/sheets/connect`

**Create API Key:**
1. Go to APIs & Services → Credentials
2. Create API Key (restrict to Vision API)

### 4. Set up Stripe

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard
3. Create products for Pro, Family, Business plans
4. Set up webhook endpoint: `/api/webhooks/stripe`

### 5. Configure Environment

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in all environment variables with your actual credentials.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
receiptbox/
├── app/                        # Next.js App Router pages
│   ├── page.tsx               # Homepage
│   ├── dashboard/             # Main app dashboard
│   ├── library/               # Receipt library
│   ├── settings/              # Settings page
│   └── api/                   # API routes
├── components/                # Reusable React components
├── lib/                       # Utility libraries
│   ├── supabase.ts           # Supabase client
│   ├── google-vision.ts      # OCR processing
│   ├── google-sheets.ts      # Sheets integration
│   └── stripe.ts             # Payment processing
├── types/                     # TypeScript types
└── database-schema.sql        # Complete database schema
```

## 🎨 Design System

ReceiptBox follows a clean, minimal aesthetic:

- **Primary Color:** Emerald-600 (#10b981)
- **Spacing:** 8px grid system
- **Typography:** Inter font family
- **Components:** Subtle shadows, 8px border radius
- **Mobile:** 44x44px minimum touch targets

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

### Post-Deployment

1. Update Google OAuth redirect URIs with production URL
2. Update Stripe webhook endpoint with production URL
3. Test all flows end-to-end

## 📖 Database Schema

Complete schema in `database-schema.sql` includes:

- `receipts` - Receipt data and images
- `sheet_connections` - Google Sheet connections
- `user_settings` - User preferences
- `custom_categories` - Custom expense categories
- `vendor_mappings` - Auto-categorization rules
- `subscriptions` - Stripe subscriptions
- `usage_logs` - Usage tracking

All tables use Row-Level Security (RLS) for data protection.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file

## 💬 Support

- Email: support@receiptbox.com
- GitHub Issues: [Report a bug](https://github.com/yourusername/receiptbox/issues)

## 🙏 Acknowledgments

Built with:
- Next.js by Vercel
- Supabase for backend
- Google Cloud APIs
- Stripe for payments

---

**Stop losing receipts. Start tracking today. 🚀**
