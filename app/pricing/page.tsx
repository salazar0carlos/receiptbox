import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Check, Zap } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        '50 receipts per month',
        '1 Google Sheet connection',
        '1 GB storage',
        'Basic categorization',
        'Receipt library',
        'Search & filters',
      ],
      cta: 'Start Free',
      href: '/signup',
      popular: false,
    },
    {
      name: 'Pro',
      price: 9,
      description: 'For power users',
      features: [
        'Unlimited receipts',
        'Unlimited Sheet connections',
        '10 GB storage',
        'All templates',
        'Custom categories',
        'Vendor mappings',
        'Priority support',
      ],
      cta: 'Get Pro',
      href: '/signup',
      popular: true,
    },
    {
      name: 'Family',
      price: 19,
      description: 'For households',
      features: [
        'Everything in Pro',
        'Up to 5 users',
        'Shared Sheets',
        '50 GB storage',
        'Family dashboard',
        'Budget tracking',
        'Spending by person',
      ],
      cta: 'Get Family',
      href: '/signup',
      popular: false,
    },
    {
      name: 'Business',
      price: 39,
      description: 'For teams',
      features: [
        'Everything in Family',
        'Unlimited users',
        'API access',
        'QuickBooks export',
        'NetSuite integration',
        'Tax summaries',
        'Dedicated support',
      ],
      cta: 'Get Business',
      href: '/signup',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Simple, honest pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start free. Upgrade when you're ready. Cancel anytime. No tricks.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              variant={plan.popular ? 'shadow' : 'bordered'}
              padding="large"
              className={`relative ${
                plan.popular ? 'border-2 border-emerald-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Popular
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes. Upgrade or downgrade whenever you want. Your billing adjusts automatically.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                What happens to my data if I downgrade?
              </h3>
              <p className="text-gray-600">
                Your data stays in your Google Sheet. It's yours forever. You'll just have reduced upload limits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Yes. We use bank-level encryption. Your data lives in YOUR Google Sheet, which you control. We only write data, never read or share it.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Do I need a credit card for the free plan?
              </h3>
              <p className="text-gray-600">
                Nope. Sign up free, no credit card required. Upgrade when you're ready.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Can I get a refund?
              </h3>
              <p className="text-gray-600">
                Yes. 14-day money-back guarantee on all paid plans. Email us and we'll refund you, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to stop losing receipts?
          </h2>
          <p className="text-xl text-emerald-50 mb-8">
            Start free. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="large" variant="secondary" className="min-w-[200px]">
              Start Free Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
