'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Image, Library, Camera } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Hide on auth pages and settings
  if (pathname === '/login' || pathname === '/signup' || pathname === '/settings' || pathname === '/pricing') {
    return null;
  }

  return (
    <nav
      className="mobile-bottom-nav glass-strong"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '72px',
        background: 'rgba(88, 28, 135, 0.9)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'none',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 var(--space-4)',
        }}
      >
        {/* Dashboard */}
        <Link
          href="/dashboard"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-1)',
            padding: 'var(--space-2)',
            minWidth: '64px',
            color: isActive('/dashboard') ? 'white' : 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            transition: 'all var(--transition-fast)',
          }}
        >
          <Home
            size={24}
            strokeWidth={isActive('/dashboard') ? 2.5 : 2}
            style={{
              filter: isActive('/dashboard')
                ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))'
                : 'none',
            }}
          />
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: isActive('/dashboard') ? 'var(--font-semibold)' : 'var(--font-normal)',
            }}
          >
            Home
          </span>
        </Link>

        {/* Upload FAB - Floating Action Button */}
        <Link
          href="/dashboard"
          style={{
            position: 'relative',
            bottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
            borderRadius: '50%',
            boxShadow: '0 8px 24px rgba(168, 85, 247, 0.4), 0 0 0 4px rgba(88, 28, 135, 0.9)',
            textDecoration: 'none',
            transition: 'all var(--transition-base)',
          }}
        >
          <Camera size={28} color="white" strokeWidth={2.5} />
        </Link>

        {/* Library */}
        <Link
          href="/library"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-1)',
            padding: 'var(--space-2)',
            minWidth: '64px',
            color: isActive('/library') ? 'white' : 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            transition: 'all var(--transition-fast)',
          }}
        >
          <Library
            size={24}
            strokeWidth={isActive('/library') ? 2.5 : 2}
            style={{
              filter: isActive('/library')
                ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))'
                : 'none',
            }}
          />
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: isActive('/library') ? 'var(--font-semibold)' : 'var(--font-normal)',
            }}
          >
            Library
          </span>
        </Link>
      </div>

      {/* Mobile-only display */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
