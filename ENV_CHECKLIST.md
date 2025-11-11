# Environment Variables Checklist for Vercel

Copy this checklist and fill in your values as you go through the deployment.

## ✅ Supabase (3 variables)

Get from: Supabase Dashboard → Settings → API

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh12345678.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ Google Cloud (3 variables + JSON)

Get from: Google Cloud Console → APIs & Services → Credentials

```bash
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
GOOGLE_APPLICATION_CREDENTIALS_JSON=
```

**Example:**
```bash
GOOGLE_CLOUD_PROJECT_ID=receiptbox-123456
GOOGLE_OAUTH_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=GOCSPX-abc123xyz789
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account","project_id":"receiptbox-123456","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\n...","client_email":"receiptbox-vision@receiptbox-123456.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token"}
```

**⚠️ Important for GOOGLE_APPLICATION_CREDENTIALS_JSON:**
- Open your service account JSON file
- Copy the ENTIRE content
- Remove all newlines and spaces (make it one line)
- Paste as the value

---

## ✅ Stripe (6 variables)

Get from: Stripe Dashboard → Developers

### API Keys
```bash
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

**Example:**
```bash
STRIPE_SECRET_KEY=sk_test_51Abc123...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Abc123...
```

### Price IDs (from Products page)
```bash
STRIPE_PRICE_ID_PRO=
STRIPE_PRICE_ID_FAMILY=
STRIPE_PRICE_ID_BUSINESS=
```

**Example:**
```bash
STRIPE_PRICE_ID_PRO=price_1Abc123DEF456
STRIPE_PRICE_ID_FAMILY=price_1Ghi789JKL012
STRIPE_PRICE_ID_BUSINESS=price_1Mno345PQR678
```

### Webhook Secret (set this AFTER first deployment)
```bash
STRIPE_WEBHOOK_SECRET=
```

**Example:**
```bash
STRIPE_WEBHOOK_SECRET=whsec_abc123xyz789...
```

---

## ✅ App URL (1 variable)

Set this AFTER first deployment

```bash
NEXT_PUBLIC_APP_URL=
```

**Example:**
```bash
NEXT_PUBLIC_APP_URL=https://receiptbox.vercel.app
```

---

## Summary

**Total: 14 environment variables**

- ✅ 3 Supabase variables
- ✅ 4 Google Cloud variables
- ✅ 6 Stripe variables
- ✅ 1 App URL variable

---

## Quick Copy Template

Use this template in Vercel (fill in the values):

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

## Pro Tips

1. **Start with Supabase** - easiest to set up
2. **Google Cloud takes longest** - be patient with OAuth setup
3. **Stripe webhook** - can only be set after you have a live URL
4. **Test in stages** - deploy with partial variables first, test, then add more
5. **Copy-paste carefully** - one wrong character breaks everything
6. **Save your values** - keep them in a password manager for easy updates

---

## Troubleshooting

**"Invalid Supabase URL"**
- Make sure it starts with `https://` and ends with `.supabase.co`
- No trailing slash

**"Google authentication failed"**
- Double-check OAuth Client ID format (ends with `.apps.googleusercontent.com`)
- Verify redirect URIs are added in Google Console

**"Stripe webhook failed"**
- Wait until app is deployed first
- Make sure webhook URL matches your Vercel URL exactly
- Check you selected the correct events

**"Vision API not working"**
- Ensure JSON is on a single line (no newlines)
- Verify service account has Vision API permissions
- Check API is enabled in Google Cloud Console
