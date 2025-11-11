import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Receipt, Upload, Sparkles, FileSpreadsheet, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-48 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-bold text-gray-900 mb-12 leading-[0.9] tracking-[-0.04em]">
            Track every
            <br />
            purchase.
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-16 leading-[1.5] font-light max-w-3xl mx-auto">
            Upload receipts. AI extracts data.
            <br />
            Writes to your Google Sheet.
            <br className="hidden md:block" />
            <span className="text-gray-900 font-normal">Zero manual entry.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href="/signup">
              <Button size="large" className="text-xl px-14 py-6">
                Start Free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="large" variant="secondary" className="text-xl px-14 py-6">
                See How It Works
              </Button>
            </Link>
          </div>
          <p className="text-lg text-gray-500">
            Free plan • 50 receipts/month • No credit card
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-48 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-12 leading-tight tracking-[-0.02em]">
            Stop losing
            <br />
            receipts
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600 leading-[1.6] mb-8 font-light">
            You're losing money on lost receipts, forgotten expenses, and manual spreadsheet hell.
          </p>
          <p className="text-2xl md:text-3xl text-gray-600 leading-[1.6] mb-16 font-light">
            ReceiptBox captures every receipt, extracts the data automatically, and writes it directly to your Google Sheet.
          </p>
          <p className="text-4xl md:text-5xl font-semibold text-emerald-600 tracking-[-0.02em]">
            Your spending,
            <br />
            finally organized.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-48 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-[-0.02em]">
              How It Works
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 font-light">
              Three steps. That's it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-lg">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                1. Upload receipt
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Drag-drop, click to upload, or use your phone camera. Works with photos and PDFs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-lg">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                2. AI extracts data
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Vendor, amount, date, tax, category. All extracted automatically. Review and edit if needed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-lg">
                <FileSpreadsheet className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                3. Syncs to your Sheet
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                One click. Data writes directly to your Google Sheet. See it update in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-48 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mb-8 shadow-md">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-semibold text-gray-900 mb-6 tracking-[-0.01em]">
                Smart Categorization
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Costco → Groceries. Shell → Gas. Amazon → Shopping. ReceiptBox auto-categorizes based on vendor. Add your own custom categories and mappings.
              </p>
            </div>

            <div>
              <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mb-8 shadow-md">
                <FileSpreadsheet className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-semibold text-gray-900 mb-6 tracking-[-0.01em]">
                Google Sheets Native
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Your Google Sheet IS your database. You control your data, use your own formulas, share with who you want. We just make it easy to fill your sheet.
              </p>
            </div>

            <div>
              <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mb-8 shadow-md">
                <Receipt className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-semibold text-gray-900 mb-6 tracking-[-0.01em]">
                Receipt Library
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Search, filter, never lose a receipt. Find that Home Depot purchase from 3 months ago in seconds. Download originals anytime.
              </p>
            </div>

            <div>
              <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mb-8 shadow-md">
                <FileSpreadsheet className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-semibold text-gray-900 mb-6 tracking-[-0.01em]">
                Multi-Sheet Support
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Business, household, personal. Connect unlimited Sheets (Pro plan). Each receipt goes exactly where you want it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-48 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-[-0.02em]">
              Simple pricing
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 font-light">
              Start free. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Free */}
            <Card variant="bordered" padding="large">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Free</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">$0</span>
                <span className="text-xl text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">50 receipts/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">1 Sheet</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">1 GB storage</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full text-lg">
                  Start Free
                </Button>
              </Link>
            </Card>

            {/* Pro */}
            <Card variant="shadow" padding="large" className="border-2 border-emerald-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full text-base font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Pro</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">$9</span>
                <span className="text-xl text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">Unlimited receipts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">Unlimited Sheets</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">10 GB storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">All templates</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button className="w-full text-lg">
                  Get Pro
                </Button>
              </Link>
            </Card>

            {/* Family */}
            <Card variant="bordered" padding="large">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Family</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">$19</span>
                <span className="text-xl text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">5 users</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">Shared Sheets</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">50 GB storage</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full text-lg">
                  Get Family
                </Button>
              </Link>
            </Card>

            {/* Business */}
            <Card variant="bordered" padding="large">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Business</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">$39</span>
                <span className="text-xl text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">Everything in Family</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">Unlimited users</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">API access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-600">QuickBooks export</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full text-lg">
                  Get Business
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-10 tracking-[-0.02em]">
            Stop losing
            <br />
            receipts
          </h2>
          <p className="text-2xl md:text-3xl text-emerald-50 mb-12 font-light">
            Start tracking free. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="large" variant="secondary" className="text-xl px-14 py-6">
              Start Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-600 rounded-xl">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">ReceiptBox</span>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed">
                Track every purchase. Household, business, life.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-4 text-lg text-gray-400">
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-lg text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-10 text-center text-lg text-gray-400">
            <p>&copy; 2025 ReceiptBox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
