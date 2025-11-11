import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Receipt, Upload, Sparkles, FileSpreadsheet, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-56 px-6 gradient-mesh-1 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-bold mb-16 leading-[0.88] tracking-[-0.045em] gradient-text text-white">
            Track every
            <br />
            purchase.
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 mb-20 leading-[1.5] font-light max-w-4xl mx-auto">
            Upload receipts. AI extracts data.
            <br />
            Writes to your Google Sheet.
            <br className="hidden md:block" />
            <span className="text-white font-normal">Zero manual entry.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Link href="/signup">
              <Button size="large" className="text-2xl px-16 py-7 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 border-0 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
                Start Free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="large" variant="secondary" className="text-2xl px-16 py-7 glass-strong text-white hover:bg-white/25 border-white/30">
                See How It Works
              </Button>
            </Link>
          </div>
          <div className="glass-strong inline-block px-8 py-4 rounded-2xl">
            <p className="text-xl text-white font-light">
              Free plan • 50 receipts/month • No credit card
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-56 px-6 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-16 leading-tight tracking-[-0.03em]">
            Stop losing
            <br />
            receipts
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-[1.6] mb-12 font-light max-w-4xl mx-auto">
            You're losing money on lost receipts, forgotten expenses, and manual spreadsheet hell.
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-[1.6] mb-20 font-light max-w-4xl mx-auto">
            ReceiptBox captures every receipt, extracts the data automatically, and writes it directly to your Google Sheet.
          </p>
          <div className="glass-strong inline-block px-12 py-8 rounded-3xl">
            <p className="text-5xl md:text-6xl font-semibold text-white tracking-[-0.025em] leading-tight">
              Your spending,
              <br />
              finally organized.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-56 px-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-40">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-10 tracking-[-0.03em] gradient-text-cyan">
              How It Works
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light">
              Three steps. That's it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-24">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-32 h-32 icon-gradient-1 rounded-3xl flex items-center justify-center mx-auto mb-12 glow-purple transform hover:scale-110 transition-all duration-300">
                <Upload className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-4xl font-semibold text-white mb-8 tracking-tight">
                1. Upload receipt
              </h3>
              <p className="text-2xl text-white/70 leading-relaxed font-light">
                Drag-drop, click to upload, or use your phone camera. Works with photos and PDFs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-32 h-32 icon-gradient-2 rounded-3xl flex items-center justify-center mx-auto mb-12 glow-pink transform hover:scale-110 transition-all duration-300">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-4xl font-semibold text-white mb-8 tracking-tight">
                2. AI extracts data
              </h3>
              <p className="text-2xl text-white/70 leading-relaxed font-light">
                Vendor, amount, date, tax, category. All extracted automatically. Review and edit if needed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-32 h-32 icon-gradient-3 rounded-3xl flex items-center justify-center mx-auto mb-12 glow-cyan transform hover:scale-110 transition-all duration-300">
                <FileSpreadsheet className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-4xl font-semibold text-white mb-8 tracking-tight">
                3. Syncs to your Sheet
              </h3>
              <p className="text-2xl text-white/70 leading-relaxed font-light">
                One click. Data writes directly to your Google Sheet. See it update in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-56 px-6 gradient-mesh-2">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-32">
            <Card variant="glass-strong" padding="large" className="hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 icon-gradient-1 rounded-3xl flex items-center justify-center mb-10 glow-purple">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-5xl font-semibold text-white mb-8 tracking-[-0.02em]">
                Smart Categorization
              </h3>
              <p className="text-2xl text-white/80 leading-relaxed font-light">
                Costco → Groceries. Shell → Gas. Amazon → Shopping. ReceiptBox auto-categorizes based on vendor. Add your own custom categories and mappings.
              </p>
            </Card>

            <Card variant="glass-strong" padding="large" className="hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 icon-gradient-2 rounded-3xl flex items-center justify-center mb-10 glow-pink">
                <FileSpreadsheet className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-5xl font-semibold text-white mb-8 tracking-[-0.02em]">
                Google Sheets Native
              </h3>
              <p className="text-2xl text-white/80 leading-relaxed font-light">
                Your Google Sheet IS your database. You control your data, use your own formulas, share with who you want. We just make it easy to fill your sheet.
              </p>
            </Card>

            <Card variant="glass-strong" padding="large" className="hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 icon-gradient-3 rounded-3xl flex items-center justify-center mb-10 glow-cyan">
                <Receipt className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-5xl font-semibold text-white mb-8 tracking-[-0.02em]">
                Receipt Library
              </h3>
              <p className="text-2xl text-white/80 leading-relaxed font-light">
                Search, filter, never lose a receipt. Find that Home Depot purchase from 3 months ago in seconds. Download originals anytime.
              </p>
            </Card>

            <Card variant="glass-strong" padding="large" className="hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 icon-gradient-4 rounded-3xl flex items-center justify-center mb-10 shadow-2xl">
                <FileSpreadsheet className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-5xl font-semibold text-white mb-8 tracking-[-0.02em]">
                Multi-Sheet Support
              </h3>
              <p className="text-2xl text-white/80 leading-relaxed font-light">
                Business, household, personal. Connect unlimited Sheets (Pro plan). Each receipt goes exactly where you want it.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-56 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-40">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-10 tracking-[-0.03em] gradient-text-purple">
              Simple pricing
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light">
              Start free. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Free */}
            <Card variant="glass-strong" padding="large" className="flex flex-col border-2 border-white/20 hover:border-white/40 transition-all duration-300">
              <h3 className="text-3xl font-semibold text-white mb-6">Free</h3>
              <div className="mb-10">
                <span className="text-6xl font-bold text-white">$0</span>
                <span className="text-2xl text-white/70">/month</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">50 receipts/month</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">1 Sheet</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">1 GB storage</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full text-xl py-4 glass text-white hover:bg-white/25 border-white/30">
                  Start Free
                </Button>
              </Link>
            </Card>

            {/* Pro */}
            <Card variant="glass-strong" padding="large" className="border-2 border-purple-400 relative flex flex-col glow-purple transform scale-105 hover:scale-110 transition-all duration-300">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl">
                Popular
              </div>
              <h3 className="text-3xl font-semibold text-white mb-6">Pro</h3>
              <div className="mb-10">
                <span className="text-6xl font-bold text-white">$9</span>
                <span className="text-2xl text-white/70">/month</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">Unlimited receipts</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">Unlimited Sheets</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">10 GB storage</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">All templates</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button className="w-full text-xl py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 border-0 shadow-2xl">
                  Get Pro
                </Button>
              </Link>
            </Card>

            {/* Business */}
            <Card variant="glass-strong" padding="large" className="flex flex-col border-2 border-white/20 hover:border-white/40 transition-all duration-300">
              <h3 className="text-3xl font-semibold text-white mb-6">Business</h3>
              <div className="mb-10">
                <span className="text-6xl font-bold text-white">$39</span>
                <span className="text-2xl text-white/70">/month</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">Unlimited users</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">API access</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-xl text-white/80 font-light">QuickBooks export</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full text-xl py-4 glass text-white hover:bg-white/25 border-white/30">
                  Get Business
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-56 px-6 gradient-mesh-3 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-cyan-600/30"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-12 tracking-[-0.03em] leading-tight">
            Stop losing
            <br />
            receipts
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 mb-16 font-light">
            Start tracking free. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="large" className="text-2xl px-16 py-7 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 border-0 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
              Start Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-24 mb-20">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 icon-gradient-1 rounded-xl shadow-lg">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold gradient-text-purple">ReceiptBox</span>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Track every purchase. Household, business, life.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-8 text-white">Product</h4>
              <ul className="space-y-5 text-xl text-gray-300">
                <li><Link href="/#how-it-works" className="hover:text-white hover:gradient-text-purple transition-colors font-light">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white hover:gradient-text-purple transition-colors font-light">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-8 text-white">Company</h4>
              <ul className="space-y-5 text-xl text-gray-300">
                <li><a href="#" className="hover:text-white hover:gradient-text-purple transition-colors font-light">Privacy</a></li>
                <li><a href="#" className="hover:text-white hover:gradient-text-purple transition-colors font-light">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-12 text-center text-xl text-gray-400">
            <p className="font-light">&copy; 2025 ReceiptBox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
