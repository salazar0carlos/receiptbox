import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import { Receipt, Upload, Sparkles, FileSpreadsheet, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ padding: 'var(--space-20) var(--space-6)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'var(--text-5xl)',
            fontWeight: 'var(--font-bold)',
            color: 'white',
            marginBottom: 'var(--space-6)',
            lineHeight: 'var(--leading-tight)'
          }}>
            Track every purchase.
            <br />
            <span className="gradient-text">Automatically.</span>
          </h1>
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 'var(--space-8)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: '700px',
            margin: '0 auto var(--space-8)'
          }}>
            Upload receipts. AI extracts data. Writes to your Google Sheet.
            <br />
            <span style={{ fontWeight: 'var(--font-semibold)' }}>Zero manual entry.</span>
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
            <Link href="/signup">
              <Button size="large" style={{
                background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                border: 'none',
                padding: 'var(--space-4) var(--space-8)',
                fontSize: 'var(--text-lg)'
              }}>
                Start Free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="large" variant="secondary" className="glass" style={{
                color: 'white',
                padding: 'var(--space-4) var(--space-8)',
                fontSize: 'var(--text-lg)'
              }}>
                See How It Works
              </Button>
            </Link>
          </div>
          <div className="glass" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-3) var(--space-6)',
            borderRadius: 'var(--radius-full)'
          }}>
            <Check size={18} style={{ color: '#10B981' }} />
            <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.95)' }}>
              Free plan • 50 receipts/month • No credit card
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: 'var(--space-16) var(--space-6)', background: 'rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-bold)',
              color: 'white',
              marginBottom: 'var(--space-4)'
            }}>
              How It Works
            </h2>
            <p style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.7)' }}>
              Three steps. That's it.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: 'var(--space-6)' }}>
            {/* Step 1 */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, var(--primary-purple), #9333ea)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6)',
                boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
              }}>
                <Upload size={32} color="white" />
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'white',
                marginBottom: 'var(--space-3)'
              }}>
                1. Upload receipt
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--leading-relaxed)' }}>
                Drag-drop, click to upload, or use your phone camera. Works with photos and PDFs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, var(--primary-pink), #ec4899)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6)',
                boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)'
              }}>
                <Sparkles size={32} color="white" />
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'white',
                marginBottom: 'var(--space-3)'
              }}>
                2. AI extracts data
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--leading-relaxed)' }}>
                Vendor, amount, date, tax, category. All extracted automatically. Review and edit if needed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, var(--primary-cyan), #0891b2)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6)',
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
              }}>
                <FileSpreadsheet size={32} color="white" />
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'white',
                marginBottom: 'var(--space-3)'
              }}>
                3. Syncs to your Sheet
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--leading-relaxed)' }}>
                One click. Data writes directly to your Google Sheet. See it update in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-2" style={{ gap: 'var(--space-6)' }}>
            {/* Feature 1 */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, var(--primary-purple), #9333ea)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)'
              }}>
                <Sparkles size={28} color="white" />
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'white',
                marginBottom: 'var(--space-3)'
              }}>
                Smart Categorization
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--leading-relaxed)' }}>
                Costco → Groceries. Shell → Gas. Amazon → Shopping. ReceiptBox auto-categorizes based on vendor. Add your own custom categories and mappings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, var(--primary-pink), #ec4899)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)'
              }}>
                <FileSpreadsheet size={28} color="white" />
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'white',
                marginBottom: 'var(--space-3)'
              }}>
                Google Sheets Native
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--leading-relaxed)' }}>
                Your Google Sheet IS your database. You control your data, use your own formulas, share with who you want. We just make it easy to fill your sheet.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, var(--primary-cyan), #0891b2)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)'
              }}>
                <Receipt size={28} color="white" />
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'white',
                marginBottom: 'var(--space-3)'
              }}>
                Receipt Library
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--leading-relaxed)' }}>
                Search, filter, never lose a receipt. Find that Home Depot purchase from 3 months ago in seconds. Download originals anytime.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)'
              }}>
                <FileSpreadsheet size={28} color="white" />
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'white',
                marginBottom: 'var(--space-3)'
              }}>
                Multi-Sheet Support
              </h3>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--leading-relaxed)' }}>
                Business, household, personal. Connect unlimited Sheets (Pro plan). Each receipt goes exactly where you want it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: 'var(--space-16) var(--space-6)', background: 'rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-bold)',
              color: 'white',
              marginBottom: 'var(--space-4)'
            }}>
              Simple pricing
            </h2>
            <p style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.7)' }}>
              Start free. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: 'var(--space-6)' }}>
            {/* Free Plan */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              border: '2px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-6)' }}>
                Free
              </h3>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span style={{ fontSize: 'var(--text-5xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>$0</span>
                <span style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.6)' }}>/month</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-8)', flex: 1 }}>
                {['50 receipts/month', '1 Sheet', '1 GB storage'].map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <Check size={20} style={{ color: 'var(--primary-cyan)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button variant="secondary" className="glass" style={{ width: '100%', color: 'white' }}>
                  Start Free
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              border: '2px solid rgba(168, 85, 247, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transform: 'scale(1.05)',
              boxShadow: '0 20px 60px rgba(168, 85, 247, 0.2)'
            }}>
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
                color: 'white'
              }}>
                Popular
              </div>
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-6)' }}>
                Pro
              </h3>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span style={{ fontSize: 'var(--text-5xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>$9</span>
                <span style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.6)' }}>/month</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-8)', flex: 1 }}>
                {['Unlimited receipts', 'Unlimited Sheets', '10 GB storage', 'All templates'].map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <Check size={20} style={{ color: 'var(--primary-pink)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                  border: 'none'
                }}>
                  Get Pro
                </Button>
              </Link>
            </div>

            {/* Business Plan */}
            <div className="glass-strong" style={{
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-2xl)',
              border: '2px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-6)' }}>
                Business
              </h3>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span style={{ fontSize: 'var(--text-5xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>$39</span>
                <span style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.6)' }}>/month</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-8)', flex: 1 }}>
                {['Everything in Pro', 'Unlimited users', 'API access', 'QuickBooks export'].map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <Check size={20} style={{ color: 'var(--primary-cyan)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button variant="secondary" className="glass" style={{ width: '100%', color: 'white' }}>
                  Get Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-bold)',
            color: 'white',
            marginBottom: 'var(--space-6)'
          }}>
            Stop losing receipts
          </h2>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 'var(--space-8)'
          }}>
            Start tracking free. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="large" style={{
              background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
              border: 'none',
              padding: 'var(--space-4) var(--space-8)',
              fontSize: 'var(--text-lg)'
            }}>
              Start Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: 'var(--space-12) var(--space-6)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-3" style={{ gap: 'var(--space-12)', marginBottom: 'var(--space-8)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div style={{
                  padding: 'var(--space-2)',
                  background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                  borderRadius: 'var(--radius-xl)'
                }}>
                  <Receipt size={20} color="white" />
                </div>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)' }}>ReceiptBox</span>
              </div>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.6)' }}>
                Track every purchase. Household, business, life.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-4)' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: 'var(--space-3)' }}>
                  <Link href="/#how-it-works" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>How It Works</Link>
                </li>
                <li>
                  <Link href="/pricing" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Pricing</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-4)' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: 'var(--space-3)' }}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Privacy</a>
                </li>
                <li>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Terms</a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 'var(--space-6)',
            textAlign: 'center',
            fontSize: 'var(--text-sm)',
            color: 'rgba(255,255,255,0.5)'
          }}>
            <p>&copy; 2025 ReceiptBox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
