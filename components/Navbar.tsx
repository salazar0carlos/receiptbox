'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Receipt } from 'lucide-react';
import Button from './Button';

interface NavbarProps {
  user?: {
    email: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = user
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Library', href: '/library' },
        { name: 'Settings', href: '/settings' },
      ]
    : [
        { name: 'How It Works', href: '/#how-it-works' },
        { name: 'Pricing', href: '/pricing' },
      ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 text-xl font-bold text-gray-900">
            <div className="p-3 bg-emerald-600 rounded-xl shadow-sm">
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">ReceiptBox</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg font-medium transition-colors hover:text-emerald-600 ${
                  pathname === item.href
                    ? 'text-emerald-600'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <>
                <span className="text-base text-gray-600 font-light">{user.email}</span>
                <form action="/api/auth/logout" method="POST">
                  <Button variant="secondary" size="small" type="submit">
                    Log Out
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="small">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="small">
                    Start Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-3 text-base font-medium ${
                  pathname === item.href
                    ? 'text-emerald-600'
                    : 'text-gray-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-gray-200 space-y-3">
              {user ? (
                <>
                  <p className="text-base text-gray-600 font-light">{user.email}</p>
                  <form action="/api/auth/logout" method="POST">
                    <Button variant="secondary" size="small" className="w-full" type="submit">
                      Log Out
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button variant="ghost" size="small" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" className="block">
                    <Button variant="primary" size="small" className="w-full">
                      Start Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
