'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import UploadZone from '@/components/UploadZone';
import ReceiptReview from '@/components/ReceiptReview';
import Button from '@/components/Button';
import Card from '@/components/Card';
import WelcomeModal from '@/components/WelcomeModal';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import { FileSpreadsheet, Receipt as ReceiptIcon, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'upload' | 'review' | 'success'>('upload');
  const [receiptData, setReceiptData] = useState<any>(null);
  const [sheetConnections, setSheetConnections] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    fetchSheetConnections();
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
    } finally {
      setLoading(false);
    }
  };

  const fetchSheetConnections = async () => {
    try {
      const response = await fetch('/api/sheets/list');
      if (response.ok) {
        const data = await response.json();
        setSheetConnections(data.connections || []);
      }
    } catch (error) {
      console.error('Failed to fetch sheet connections:', error);
    }
  };

  const handleUploadComplete = (data: { imageUrl: string; ocrData: any }) => {
    setReceiptData(data);
    setStep('review');
  };

  const handleSaveReceipt = async (formData: any) => {
    try {
      // Save receipt to database
      const response = await fetch('/api/receipts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image_url: receiptData.imageUrl,
          raw_ocr_data: receiptData.ocrData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save receipt');
      }

      const { receipt } = await response.json();

      // If user has sheet connections, offer to sync
      if (sheetConnections.length > 0) {
        // For now, just show success
        toast.success('Receipt saved!');
      } else {
        toast.success('Receipt saved! Connect a Google Sheet to sync your data.');
      }

      setStep('success');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save receipt');
    }
  };

  const handleStartNew = () => {
    setStep('upload');
    setReceiptData(null);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '4px solid rgba(168, 85, 247, 0.5)', borderTop: '4px solid var(--primary-purple)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: 'var(--space-4)', color: 'rgba(255,255,255,0.8)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
      <Navbar user={user} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-6) var(--space-6) var(--space-12)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-12)', textAlign: 'center', paddingTop: 'var(--space-16)' }}>
          <h1 style={{ fontSize: 'var(--text-5xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-4)' }}>
            Dashboard
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.8)' }}>
            Upload receipts and track your spending
          </p>
        </div>

        {/* Sheet Connection Status */}
        {sheetConnections.length === 0 && (
          <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: 'var(--space-12)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                borderRadius: 'var(--radius-2xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
              }}>
                <FileSpreadsheet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-3)' }}>
                  Connect Google Sheets
                </h3>
                <p style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-6)', lineHeight: 'var(--leading-relaxed)' }}>
                  Connect a Google Sheet to automatically sync your receipt data. Choose from pre-built templates or connect an existing sheet.
                </p>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => router.push('/sheets/connect')}
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                    border: 'none'
                  }}
                >
                  <Plus className="w-6 h-6 mr-2" />
                  Connect Sheet
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {step === 'upload' && (
          <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
              Upload Receipt
            </h2>
            <UploadZone onUploadComplete={handleUploadComplete} />
          </div>
        )}

        {step === 'review' && receiptData && (
          <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ReceiptReview
              ocrData={receiptData.ocrData}
              imageUrl={receiptData.imageUrl}
              onSave={handleSaveReceipt}
              onCancel={handleStartNew}
            />
          </div>
        )}

        {step === 'success' && (
          <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-6)',
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
            }}>
              <ReceiptIcon className="w-10 h-10 text-white" />
            </div>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-4)' }}>
              Receipt Saved!
            </h2>
            <p style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-8)' }}>
              Your receipt has been saved to your library.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
              <Button
                size="large"
                onClick={handleStartNew}
                style={{
                  background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                  border: 'none'
                }}
              >
                <Plus className="w-6 h-6 mr-2" />
                Upload Another
              </Button>
              <Button
                size="large"
                variant="secondary"
                onClick={() => router.push('/library')}
                className="glass"
                style={{ color: 'white' }}
              >
                View Library
              </Button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {step === 'upload' && (
          <div className="grid grid-cols-3" style={{ gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
            <div className="glass-strong" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{
                  padding: 'var(--space-3)',
                  background: 'linear-gradient(135deg, var(--primary-purple), #9333ea)',
                  borderRadius: 'var(--radius-xl)'
                }}>
                  <ReceiptIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-1)' }}>This Month</p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>0</p>
                </div>
              </div>
            </div>

            <div className="glass-strong" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{
                  padding: 'var(--space-3)',
                  background: 'linear-gradient(135deg, var(--primary-pink), #ec4899)',
                  borderRadius: 'var(--radius-xl)'
                }}>
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-1)' }}>Sheets Connected</p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>{sheetConnections.length}</p>
                </div>
              </div>
            </div>

            <div className="glass-strong" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{
                  padding: 'var(--space-3)',
                  background: 'linear-gradient(135deg, var(--primary-cyan), #0891b2)',
                  borderRadius: 'var(--radius-xl)'
                }}>
                  <ReceiptIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-1)' }}>Total Receipts</p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>0</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Welcome Modal and Keyboard Shortcuts */}
      <WelcomeModal />
      <KeyboardShortcuts />
    </div>
  );
}
