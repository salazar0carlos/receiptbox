# ReceiptBox Deployment Guide

This guide will walk you through deploying ReceiptBox to production.

## Prerequisites
- GitHub account (repo already set up ✓)
- Supabase account (free tier works)
- Vercel account (free tier works)
- Google Cloud account (for Vision API and Sheets API)
- Stripe account (for payments)

---

## Step 1: Supabase Setup (Database & Storage)

### 1.1 Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Enter project details:
   - Name: `receiptbox`
   - Database Password: (save this securely)
   - Region: Choose closest to your users
4. Wait for project to provision (~2 minutes)

### 1.2 Run Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `database-schema.sql` from this repo
4. Paste into the SQL editor
5. Click "Run" or press Cmd/Ctrl + Enter
6. ✅ You should see success messages for all tables

### 1.3 Create Storage Bucket (if not auto-created)
1. Go to **Storage** in Supabase dashboard
2. If "receipts" bucket doesn't exist, click "New Bucket"
3. Name: `receipts`
4. **Important:** Make it **private** (not public)
5. Click "Create Bucket"

### 1.4 Enable Email Authentication
1. Go to **Authentication** → **Providers**
2. Enable "Email" provider
3. Configure email templates (optional but recommended):
   - Go to **Email Templates**
   - Customize confirmation and reset password emails

### 1.5 Get Supabase Credentials
You'll need these for Vercel:
- **Project URL**: Found in Settings → API
  - Format: `https://xxxxx.supabase.co`
- **Anon Key**: Found in Settings → API
- **Service Role Key**: Found in Settings → API (keep this secret!)

---

## Step 2: Google Cloud Setup (Vision API & Sheets API)

### 2.1 Create Google Cloud Project
1. Go to https://console.cloud.google.com
2. Create new project: "ReceiptBox"
3. Select the project from the dropdown

### 2.2 Enable Required APIs
1. Go to **APIs & Services** → **Library**
2. Search and enable:
   - ✅ **Cloud Vision API**
   - ✅ **Google Sheets API**
   - ✅ **Google Drive API** (needed for Sheets)

### 2.3 Create Service Account (for Vision API)
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Name: `receiptbox-vision`
4. Click **Create and Continue**
5. Role: Select **Cloud Vision** → **Cloud Vision API User**
6. Click **Done**
7. Click on the created service account
8. Go to **Keys** tab → **Add Key** → **Create New Key**
9. Choose **JSON** format
10. Download the JSON file (keep it secure!)

### 2.4 Create OAuth 2.0 Credentials (for Sheets API)
1. Still in **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. If prompted, configure OAuth consent screen:
   - User Type: **External**
   - App name: `ReceiptBox`
   - Support email: Your email
   - Add scopes: `.../auth/spreadsheets` and `.../auth/userinfo.email`
   - Add yourself as test user
4. Application type: **Web application**
5. Name: `ReceiptBox Web`
6. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback
   https://your-app.vercel.app/api/auth/callback
   ```
   (Add your Vercel domain after deployment)
7. Click **Create**
8. Save the **Client ID** and **Client Secret**

### 2.5 Get API Key (optional, for rate limiting)
1. **Create Credentials** → **API Key**
2. Restrict key (recommended):
   - API restrictions: Restrict key
   - Select: Cloud Vision API, Google Sheets API
3. Save the API key

---

## Step 3: Stripe Setup (Payments)

### 3.1 Create Stripe Account
1. Go to https://dashboard.stripe.com/register
2. Complete registration
3. Switch to **Test Mode** (toggle in top-right)

### 3.2 Create Products and Prices
1. Go to **Products** in Stripe dashboard
2. Click **Add Product** for each plan:

**Pro Plan:**
- Name: `ReceiptBox Pro`
- Price: `$9.00 USD` / month recurring
- Copy the **Price ID** (starts with `price_`)

**Family Plan:**
- Name: `ReceiptBox Family`
- Price: `$19.00 USD` / month recurring
- Copy the **Price ID**

**Business Plan:**
- Name: `ReceiptBox Business`
- Price: `$39.00 USD` / month recurring
- Copy the **Price ID**

### 3.3 Get API Keys
1. Go to **Developers** → **API Keys**
2. Copy:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### 3.4 Setup Webhook (do this after Vercel deployment)
- We'll come back to this after deploying to Vercel

---

## Step 4: Deploy to Vercel

### 4.1 Connect GitHub Repository
1. Go to https://vercel.com/new
2. Import your GitHub repository: `salazar0carlos/receiptbox`
3. Vercel will auto-detect Next.js

### 4.2 Configure Environment Variables
In Vercel project settings, add all these environment variables:

**Supabase:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

**Google Cloud:**
```bash
GOOGLE_CLOUD_PROJECT_ID=receiptbox
GOOGLE_OAUTH_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=GOCSPX-xxxxx
```

**Google Service Account (Vision API):**
For the service account JSON, you need to set `GOOGLE_APPLICATION_CREDENTIALS_JSON`:
```bash
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account","project_id":"receiptbox",...}
```
(Paste the entire JSON file content as a single line)

**Stripe:**
```bash
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_PRICE_ID_PRO=price_xxxxx
STRIPE_PRICE_ID_FAMILY=price_xxxxx
STRIPE_PRICE_ID_BUSINESS=price_xxxxx
```

**App URL:**
```bash
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```
(Use your actual Vercel URL)

### 4.3 Deploy
1. Click **Deploy**
2. Wait for build to complete (~2-3 minutes)
3. 🎉 Your app is live!
4. Copy your Vercel URL

---

## Step 5: Post-Deployment Configuration

### 5.1 Update Google OAuth Redirect URI
1. Go back to Google Cloud Console
2. **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client
4. Add authorized redirect URI:
   ```
   https://your-actual-vercel-url.vercel.app/api/auth/callback
   ```
5. Save

### 5.2 Setup Stripe Webhook
1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add Endpoint**
3. Endpoint URL:
   ```
   https://your-actual-vercel-url.vercel.app/api/webhooks/stripe
   ```
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **Add Endpoint**
6. Copy the **Signing Secret** (starts with `whsec_`)
7. Add to Vercel environment variables:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```
8. Redeploy on Vercel (or it will auto-deploy)

### 5.3 Update Supabase Redirect URLs
1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/**`

---

## Step 6: Testing

### 6.1 Test Authentication
1. Visit your Vercel URL
2. Click "Sign Up"
3. Create account with email/password
4. Check Supabase Auth dashboard for new user
5. Check if `user_settings` and `subscriptions` tables have entries

### 6.2 Test Receipt Upload
1. Login to your app
2. Upload a test receipt
3. Check if it appears in Supabase:
   - Storage → receipts → your-user-id folder
   - Table Editor → receipts table

### 6.3 Test Google Sheets Connection
1. Click "Connect Google Sheets"
2. Authorize with Google
3. Select a template
4. Check if sheet is created in your Google Drive

### 6.4 Test Stripe (in test mode)
1. Go to pricing page
2. Select Pro plan
3. Use test card: `4242 4242 4242 4242`
4. Any future expiry date, any CVC
5. Complete checkout
6. Check Stripe dashboard for payment
7. Check `subscriptions` table updated

---

## Going to Production

When ready to go live:

### Stripe
1. Activate your Stripe account
2. Create production products/prices
3. Use live API keys (starts with `pk_live_` and `sk_live_`)
4. Create production webhook

### Google Cloud
1. Submit OAuth consent screen for verification (if needed)
2. Use production service account

### Supabase
1. Upgrade to Pro plan if needed (free tier has limits)
2. Consider enabling database backups

---

## Environment Variables Checklist

Here's your complete `.env` for Vercel:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Cloud
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
GOOGLE_APPLICATION_CREDENTIALS_JSON=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_ID_PRO=
STRIPE_PRICE_ID_FAMILY=
STRIPE_PRICE_ID_BUSINESS=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Troubleshooting

**Build fails on Vercel:**
- Check all environment variables are set
- Make sure Node.js version is 18+ (set in Vercel settings)

**Vision API errors:**
- Verify API is enabled in Google Cloud
- Check service account has correct permissions
- Ensure JSON credentials are valid

**Sheets API errors:**
- Verify redirect URIs match exactly
- Check OAuth consent screen is configured
- Make sure user is added as test user (if in testing mode)

**Storage errors:**
- Check bucket name is "receipts"
- Verify storage RLS policies are in place
- Ensure bucket is private (not public)

---

## Next Steps

After deployment:
1. Set up monitoring (Vercel Analytics, Sentry)
2. Configure custom domain
3. Set up SSL/HTTPS (automatic on Vercel)
4. Monitor Supabase usage and upgrade if needed
5. Test with real receipts and Google Sheets

---

**Need help?** Check the README.md or create an issue on GitHub.
