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
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Track every purchase.
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Automatically.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Upload receipts. AI extracts data. Writes to your Google Sheet.
            <br />
            <span className="text-white font-normal">Zero manual entry.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup">
              <Button size="large" className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-xl text-white">
                Start Free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="large" variant="secondary" className="px-12 py-4 glass text-white hover:bg-white/20 border-white/20">
                See How It Works
              </Button>
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full">
            <Check className="w-5 h-5 text-green-400" />
            <p className="text-sm text-white/90 font-light">
              Free plan • 50 receipts/month • No credit card
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Stop losing receipts
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6 font-light">
            You're losing money on lost receipts, forgotten expenses, and manual spreadsheet hell.
          </p>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-normal">
            ReceiptBox captures every receipt, extracts the data automatically, and writes it directly to your Google Sheet.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-light">
              Three steps. That's it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center p-8 glass-strong rounded-2xl border border-white/10">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                1. Upload receipt
              </h3>
              <p className="text-base text-white/70 leading-relaxed font-light">
                Drag-drop, click to upload, or use your phone camera. Works with photos and PDFs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center p-8 glass-strong rounded-2xl border border-white/10">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                2. AI extracts data
              </h3>
              <p className="text-base text-white/70 leading-relaxed font-light">
                Vendor, amount, date, tax, category. All extracted automatically. Review and edit if needed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center p-8 glass-strong rounded-2xl border border-white/10">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30">
                <FileSpreadsheet className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                3. Syncs to your Sheet
              </h3>
              <p className="text-base text-white/70 leading-relaxed font-light">
                One click. Data writes directly to your Google Sheet. See it update in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 glass-strong rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Smart Categorization
              </h3>
              <p className="text-base text-white/70 leading-relaxed font-light">
                Costco → Groceries. Shell → Gas. Amazon → Shopping. ReceiptBox auto-categorizes based on vendor. Add your own custom categories and mappings.
              </p>
            </div>

            <div className="p-10 glass-strong rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30">
                <FileSpreadsheet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Google Sheets Native
              </h3>
              <p className="text-base text-white/70 leading-relaxed font-light">
                Your Google Sheet IS your database. You control your data, use your own formulas, share with who you want. We just make it easy to fill your sheet.
              </p>
            </div>

            <div className="p-10 glass-strong rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Receipt Library
              </h3>
              <p className="text-base text-white/70 leading-relaxed font-light">
                Search, filter, never lose a receipt. Find that Home Depot purchase from 3 months ago in seconds. Download originals anytime.
              </p>
            </div>

            <div className="p-10 glass-strong rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                <FileSpreadsheet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Multi-Sheet Support
              </h3>
              <p className="text-base text-white/70 leading-relaxed font-light">
                Business, household, personal. Connect unlimited Sheets (Pro plan). Each receipt goes exactly where you want it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Simple pricing
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-light">
              Start free. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="p-8 glass-strong rounded-2xl border-2 border-white/10 hover:border-white/20 transition-all flex flex-col">
              <h3 className="text-2xl font-semibold text-white mb-6">Free</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$0</span>
                <span className="text-xl text-white/60">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">50 receipts/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">1 Sheet</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">1 GB storage</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full glass text-white hover:bg-white/20 border-white/20">
                  Start Free
                </Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="p-8 glass-strong rounded-2xl border-2 border-purple-400/50 relative flex flex-col transform md:scale-105 shadow-2xl shadow-purple-500/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                Popular
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6">Pro</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$9</span>
                <span className="text-xl text-white/60">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">Unlimited receipts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">Unlimited Sheets</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">10 GB storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">All templates</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg text-white">
                  Get Pro
                </Button>
              </Link>
            </div>

            {/* Business */}
            <div className="p-8 glass-strong rounded-2xl border-2 border-white/10 hover:border-white/20 transition-all flex flex-col">
              <h3 className="text-2xl font-semibold text-white mb-6">Business</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$39</span>
                <span className="text-xl text-white/60">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">Unlimited users</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">API access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-white/80 font-light">QuickBooks export</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full glass text-white hover:bg-white/20 border-white/20">
                  Get Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Stop losing receipts
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 font-light">
            Start tracking free. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="large" className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-xl text-white">
              Start Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">ReceiptBox</span>
              </div>
              <p className="text-base text-white/60 leading-relaxed font-light">
                Track every purchase. Household, business, life.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-base text-white/60">
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors font-light">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors font-light">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-base text-white/60">
                <li><a href="#" className="hover:text-white transition-colors font-light">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
            <p className="font-light">&copy; 2025 ReceiptBox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
