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
    <nav className="glass-strong sticky top-0 z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-purple-500/50 transition-all">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">ReceiptBox</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all hover:text-white ${
                  pathname === item.href
                    ? 'text-white'
                    : 'text-white/70'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-white/70 font-light">{user.email}</span>
                <form action="/api/auth/logout" method="POST">
                  <Button variant="secondary" size="small" type="submit" className="glass text-white hover:bg-white/20 border-white/20">
                    Log Out
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="small" className="text-white hover:bg-white/10">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="small" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg text-white">
                    Start Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
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
        <div className="md:hidden border-t border-white/10 glass-strong">
          <div className="px-6 py-6 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2.5 text-sm font-medium ${
                  pathname === item.href
                    ? 'text-white'
                    : 'text-white/70'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              {user ? (
                <>
                  <p className="text-sm text-white/70 font-light">{user.email}</p>
                  <form action="/api/auth/logout" method="POST">
                    <Button variant="secondary" size="small" className="w-full glass text-white" type="submit">
                      Log Out
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button variant="ghost" size="small" className="w-full text-white">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" className="block">
                    <Button size="small" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white">
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
