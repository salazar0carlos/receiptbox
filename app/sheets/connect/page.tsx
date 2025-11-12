'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { FileSpreadsheet, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

function SheetsConnectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    handleOAuthCallback();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      router.push('/login');
    }
  };

  const handleOAuthCallback = async () => {
    const code = searchParams?.get('code');
    if (!code) return;

    setLoading(true);

    try {
      // Exchange code for tokens (this would need to be implemented)
      // For now, redirect to template selection
      router.push('/sheets/setup');
    } catch (error) {
      console.error('OAuth error:', error);
      toast.error('Failed to connect Google account');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGoogle = () => {
    // Redirect to Google OAuth
    window.location.href = '/api/sheets/oauth';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '4px solid rgba(168, 85, 247, 0.5)', borderTop: '4px solid var(--primary-purple)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: 'var(--space-4)', color: 'rgba(255,255,255,0.8)' }}>Connecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
      <Navbar user={user} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-4)',
            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
          }}>
            <FileSpreadsheet className="w-8 h-8 text-white" />
          </div>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-2)' }}>
            Connect Google Sheets
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.8)' }}>
            Your data, your control. We just make it easy to fill your sheet.
          </p>
        </div>

        <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-4)' }}>
                What happens next?
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <CheckCircle className="w-6 h-6" style={{ color: 'var(--primary-cyan)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ fontWeight: 'var(--font-medium)', color: 'white', marginBottom: 'var(--space-1)' }}>Connect your Google account</p>
                    <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>
                      We'll ask for permission to create and write to your Google Sheets.
                    </p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <CheckCircle className="w-6 h-6" style={{ color: 'var(--primary-pink)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ fontWeight: 'var(--font-medium)', color: 'white', marginBottom: 'var(--space-1)' }}>Choose a template</p>
                    <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>
                      Business expenses, household budget, homestead tracker, or personal finance.
                    </p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <CheckCircle className="w-6 h-6" style={{ color: 'var(--primary-purple)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ fontWeight: 'var(--font-medium)', color: 'white', marginBottom: 'var(--space-1)' }}>Start tracking</p>
                    <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)' }}>
                      Upload receipts and watch your data sync automatically.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div style={{ paddingTop: 'var(--space-6)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Button onClick={handleConnectGoogle} size="large" style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                border: 'none'
              }}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                </svg>
                Connect with Google
              </Button>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 'var(--space-4)' }}>
                Your data never leaves your Google Sheet. We only write data, never read or share it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SheetsConnectPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '4px solid rgba(168, 85, 247, 0.5)', borderTop: '4px solid var(--primary-purple)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: 'var(--space-4)', color: 'rgba(255,255,255,0.8)' }}>Loading...</p>
        </div>
      </div>
    }>
      <SheetsConnectContent />
    </Suspense>
  );
}
