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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-16) var(--space-6) var(--space-12)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-5xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-4)' }}>
          Simple, honest pricing
        </h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>
          Start free. Upgrade when you're ready. Cancel anytime. No tricks.
        </p>
      </section>

      {/* Pricing Cards */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--space-6) var(--space-16)' }}>
        <div className="grid grid-cols-4" style={{ gap: 'var(--space-6)' }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="glass-strong"
              style={{
                padding: 'var(--space-8)',
                borderRadius: 'var(--radius-2xl)',
                border: plan.popular ? '2px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transform: plan.popular ? 'scale(1.05)' : 'none',
                boxShadow: plan.popular ? '0 20px 60px rgba(168, 85, 247, 0.2)' : 'none'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                  padding: 'var(--space-2) var(--space-6)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)'
                }}>
                  <Zap className="w-4 h-4" />
                  Popular
                </div>
              )}

              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-2)' }}>
                {plan.name}
              </h3>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>
                  ${plan.price}
                </span>
                <span style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)' }}>/month</span>
              </div>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-6)' }}>{plan.description}</p>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-8)', flex: 1 }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                    <Check className="w-5 h-5" style={{ color: plan.popular ? 'var(--primary-pink)' : 'var(--primary-cyan)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.8)' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  style={plan.popular ? {
                    width: '100%',
                    background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                    border: 'none'
                  } : { width: '100%', color: 'white' }}
                  className={!plan.popular ? 'glass' : ''}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)' }}>
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'var(--space-16) var(--space-6)', background: 'rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-12)', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-2)' }}>
                Can I change plans anytime?
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>
                Yes. Upgrade or downgrade whenever you want. Your billing adjusts automatically.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-2)' }}>
                What happens to my data if I downgrade?
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>
                Your data stays in your Google Sheet. It's yours forever. You'll just have reduced upload limits.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-2)' }}>
                Is my data secure?
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>
                Yes. We use bank-level encryption. Your data lives in YOUR Google Sheet, which you control. We only write data, never read or share it.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-2)' }}>
                Do I need a credit card for the free plan?
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>
                Nope. Sign up free, no credit card required. Upgrade when you're ready.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-2)' }}>
                Can I get a refund?
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>
                Yes. 14-day money-back guarantee on all paid plans. Email us and we'll refund you, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-6)' }}>
            Ready to stop losing receipts?
          </h2>
          <p style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-8)' }}>
            Start free. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="large" style={{
              background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
              border: 'none',
              padding: 'var(--space-4) var(--space-8)',
              fontSize: 'var(--text-lg)',
              minWidth: '200px'
            }}>
              Start Free Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
