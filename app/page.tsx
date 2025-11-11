import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Receipt, Upload, Sparkles, FileSpreadsheet, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-[1.05] tracking-tight">
            Track every purchase.
            <br />
            <span className="text-emerald-600">Household, business, life.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Upload receipts. AI extracts data. Writes to your Google Sheet.
            <br />
            <span className="font-medium">Zero manual entry.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/signup">
              <Button size="large" className="min-w-[220px]">
                Start Free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="large" variant="secondary" className="min-w-[220px]">
                See How It Works
              </Button>
            </Link>
          </div>
          <p className="text-[15px] text-gray-500 mt-8">
            Free plan includes 50 receipts/month. No credit card required.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-10 leading-tight">
              Stop losing receipts
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-6">
              You're losing money on lost receipts, forgotten expenses, and manual spreadsheet hell.
            </p>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12">
              ReceiptBox captures every receipt, extracts the data automatically, and writes it directly to your Google Sheet.
            </p>
            <p className="text-3xl md:text-4xl font-semibold text-emerald-600">
              Your spending, finally organized.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              Three steps. That's it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Step 1 */}
            <Card variant="default" padding="large" className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Upload receipt
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Drag-drop, click to upload, or use your phone camera. Works with photos and PDFs.
              </p>
            </Card>

            {/* Step 2 */}
            <Card variant="default" padding="large" className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                2. AI extracts data
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Vendor, amount, date, tax, category. All extracted automatically. Review and edit if needed.
              </p>
            </Card>

            {/* Step 3 */}
            <Card variant="default" padding="large" className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <FileSpreadsheet className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Syncs to your Sheet
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                One click. Data writes directly to your Google Sheet. See it update in real-time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div>
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-5">
                Smart Categorization
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Costco → Groceries. Shell → Gas. Amazon → Shopping. ReceiptBox auto-categorizes based on vendor. Add your own custom categories and mappings.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <FileSpreadsheet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-5">
                Google Sheets Native
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Your Google Sheet IS your database. You control your data, use your own formulas, share with who you want. We just make it easy to fill your sheet.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Receipt Library
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Search, filter, never lose a receipt. Find that Home Depot purchase from 3 months ago in seconds. Download originals anytime.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Multi-Sheet Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Business, household, personal. Connect unlimited Sheets (Pro plan). Each receipt goes exactly where you want it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Free */}
            <Card variant="bordered" padding="large">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">50 receipts/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">1 Sheet</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">1 GB storage</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full">
                  Start Free
                </Button>
              </Link>
            </Card>

            {/* Pro */}
            <Card variant="shadow" padding="large" className="border-2 border-emerald-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$9</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Unlimited receipts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Unlimited Sheets</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">10 GB storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">All templates</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button className="w-full">
                  Get Pro
                </Button>
              </Link>
            </Card>

            {/* Family */}
            <Card variant="bordered" padding="large">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Family</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$19</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">5 users</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Shared Sheets</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">50 GB storage</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full">
                  Get Family
                </Button>
              </Link>
            </Card>

            {/* Business */}
            <Card variant="bordered" padding="large">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$39</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Everything in Family</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Unlimited users</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">QuickBooks export</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button variant="secondary" className="w-full">
                  Get Business
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stop losing receipts
          </h2>
          <p className="text-xl text-emerald-50 mb-8">
            Start tracking free. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="large" variant="secondary" className="min-w-[200px]">
              Start Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-emerald-600 rounded-lg">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ReceiptBox</span>
              </div>
              <p className="text-gray-400">
                Track every purchase. Household, business, life.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ReceiptBox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
