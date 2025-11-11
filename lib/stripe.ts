import Stripe from 'stripe';

// Initialize Stripe only if API key is available
// This allows the build to succeed even without Stripe configured
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    })
  : null;

function getStripe(): Stripe {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
  }
  return stripe;
}

export const PLAN_LIMITS = {
  free: {
    receipts_per_month: 50,
    sheets: 1,
    storage_gb: 1,
  },
  pro: {
    receipts_per_month: Infinity,
    sheets: Infinity,
    storage_gb: 10,
  },
  family: {
    receipts_per_month: Infinity,
    sheets: Infinity,
    storage_gb: 50,
    users: 5,
  },
  business: {
    receipts_per_month: Infinity,
    sheets: Infinity,
    storage_gb: Infinity,
    users: Infinity,
  },
};

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  customerEmail: string
): Promise<string> {
  const stripeClient = getStripe();
  const session = await stripeClient.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    customer_email: customerEmail,
    client_reference_id: userId,
    metadata: {
      user_id: userId,
    },
  });

  return session.url!;
}
