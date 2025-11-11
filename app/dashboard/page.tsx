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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Upload receipts and track your spending</p>
        </div>

        {/* Sheet Connection Status */}
        {sheetConnections.length === 0 && (
          <Card variant="bordered" padding="medium" className="mb-8 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Connect Google Sheets
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect a Google Sheet to automatically sync your receipt data. Choose from pre-built templates or connect an existing sheet.
                </p>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => router.push('/sheets/connect')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Connect Sheet
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content */}
        {step === 'upload' && (
          <Card variant="shadow" padding="large">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Upload Receipt
            </h2>
            <UploadZone onUploadComplete={handleUploadComplete} />
          </Card>
        )}

        {step === 'review' && receiptData && (
          <Card variant="shadow" padding="large">
            <ReceiptReview
              ocrData={receiptData.ocrData}
              imageUrl={receiptData.imageUrl}
              onSave={handleSaveReceipt}
              onCancel={handleStartNew}
            />
          </Card>
        )}

        {step === 'success' && (
          <Card variant="shadow" padding="large" className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ReceiptIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Receipt Saved!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your receipt has been saved to your library.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleStartNew}>
                <Plus className="w-5 h-5 mr-2" />
                Upload Another
              </Button>
              <Button variant="secondary" onClick={() => router.push('/library')}>
                View Library
              </Button>
            </div>
          </Card>
        )}

        {/* Quick Stats */}
        {step === 'upload' && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card variant="bordered" padding="medium">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <ReceiptIcon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </Card>

            <Card variant="bordered" padding="medium">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sheets Connected</p>
                  <p className="text-2xl font-bold text-gray-900">{sheetConnections.length}</p>
                </div>
              </div>
            </Card>

            <Card variant="bordered" padding="medium">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <ReceiptIcon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Receipts</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Welcome Modal and Keyboard Shortcuts */}
      <WelcomeModal />
      <KeyboardShortcuts />
    </div>
  );
}
