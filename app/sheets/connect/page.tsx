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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Connecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileSpreadsheet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Connect Google Sheets
          </h1>
          <p className="text-xl text-gray-600">
            Your data, your control. We just make it easy to fill your sheet.
          </p>
        </div>

        <Card variant="shadow" padding="large">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What happens next?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Connect your Google account</p>
                    <p className="text-gray-600">
                      We'll ask for permission to create and write to your Google Sheets.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Choose a template</p>
                    <p className="text-gray-600">
                      Business expenses, household budget, homestead tracker, or personal finance.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Start tracking</p>
                    <p className="text-gray-600">
                      Upload receipts and watch your data sync automatically.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <Button onClick={handleConnectGoogle} className="w-full" size="large">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                </svg>
                Connect with Google
              </Button>
              <p className="text-sm text-gray-500 text-center mt-4">
                Your data never leaves your Google Sheet. We only write data, never read or share it.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function SheetsConnectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SheetsConnectContent />
    </Suspense>
  );
}
