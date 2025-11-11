'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ReceiptDetailModal from '@/components/ReceiptDetailModal';
import SkeletonCard, { SkeletonTable } from '@/components/Skeleton';
import { Search, Grid3x3, List, Download, Trash2, Check } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function LibraryPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipts, setSelectedReceipts] = useState<Set<string>>(new Set());
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchReceipts();
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

  const fetchReceipts = async () => {
    try {
      const response = await fetch('/api/receipts');
      if (response.ok) {
        const data = await response.json();
        setReceipts(data.receipts || []);
      }
    } catch (error) {
      console.error('Failed to fetch receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReceipts = receipts.filter((receipt) => {
    const query = searchQuery.toLowerCase();
    return (
      receipt.vendor?.toLowerCase().includes(query) ||
      receipt.category?.toLowerCase().includes(query) ||
      receipt.amount?.toString().includes(query)
    );
  });

  const toggleSelectReceipt = (id: string) => {
    const newSelected = new Set(selectedReceipts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedReceipts(newSelected);
  };

  const selectAll = () => {
    if (selectedReceipts.size === filteredReceipts.length) {
      setSelectedReceipts(new Set());
    } else {
      setSelectedReceipts(new Set(filteredReceipts.map(r => r.id)));
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await fetch('/api/receipts/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format: 'csv' }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipts-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Receipts exported successfully');
    } catch (error) {
      toast.error('Failed to export receipts');
    } finally {
      setExporting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedReceipts.size === 0) return;

    if (!confirm(`Delete ${selectedReceipts.size} receipt(s)? This cannot be undone.`)) {
      return;
    }

    try {
      const promises = Array.from(selectedReceipts).map(id =>
        fetch(`/api/receipts/${id}`, { method: 'DELETE' })
      );

      await Promise.all(promises);
      toast.success(`${selectedReceipts.size} receipt(s) deleted`);
      setSelectedReceipts(new Set());
      fetchReceipts();
    } catch (error) {
      toast.error('Failed to delete receipts');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {view === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <SkeletonTable />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Receipt Library</h1>
            <p className="text-gray-600">
              {filteredReceipts.length} {filteredReceipts.length === 1 ? 'receipt' : 'receipts'}
              {selectedReceipts.size > 0 && ` • ${selectedReceipts.size} selected`}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleExport} loading={exporting}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => router.push('/dashboard')}>
              Upload Receipt
            </Button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedReceipts.size > 0 && (
          <Card variant="bordered" padding="medium" className="mb-6 bg-emerald-50 border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-emerald-900 font-medium">
                {selectedReceipts.size} receipt(s) selected
              </span>
              <div className="flex gap-2">
                <Button size="small" variant="ghost" onClick={() => setSelectedReceipts(new Set())}>
                  Clear
                </Button>
                <Button size="small" variant="secondary" onClick={handleBulkDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search receipts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2">
            {filteredReceipts.length > 0 && (
              <Button
                variant="ghost"
                onClick={selectAll}
                size="small"
              >
                <Check className="w-4 h-4 mr-2" />
                {selectedReceipts.size === filteredReceipts.length ? 'Deselect All' : 'Select All'}
              </Button>
            )}
            <Button
              variant={view === 'grid' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setView('grid')}
            >
              <Grid3x3 className="w-5 h-5" />
            </Button>
            <Button
              variant={view === 'list' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setView('list')}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Empty State */}
        {filteredReceipts.length === 0 && (
          <Card variant="bordered" padding="large" className="text-center">
            <div className="py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery ? 'No receipts found' : 'No receipts yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? 'Try adjusting your search'
                  : 'Upload your first receipt to get started'}
              </p>
              {!searchQuery && (
                <Button onClick={() => router.push('/dashboard')}>
                  Upload Receipt
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Grid View */}
        {view === 'grid' && filteredReceipts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReceipts.map((receipt) => (
              <Card
                key={receipt.id}
                variant="bordered"
                padding="none"
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
              >
                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedReceipts.has(receipt.id)}
                    onChange={() => toggleSelectReceipt(receipt.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </div>

                {/* Sync Status */}
                {receipt.sheet_id && (
                  <div className="absolute top-2 right-2 z-10 bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Synced
                  </div>
                )}

                <div onClick={() => setSelectedReceipt(receipt)}>
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={receipt.image_url}
                      alt={receipt.vendor || 'Receipt'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {receipt.vendor || 'Unknown Vendor'}
                      </h3>
                      <span className="text-lg font-bold text-emerald-600">
                        ${receipt.amount?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        {receipt.date ? format(new Date(receipt.date), 'MMM d, yyyy') : 'No date'}
                      </span>
                      <span className="flex items-center gap-1">
                        {receipt.category || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {view === 'list' && filteredReceipts.length > 0 && (
          <Card variant="bordered" padding="none">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedReceipts.size === filteredReceipts.length}
                        onChange={selectAll}
                        className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReceipts.map((receipt) => (
                    <tr
                      key={receipt.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedReceipt(receipt)}
                    >
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedReceipts.has(receipt.id)}
                          onChange={() => toggleSelectReceipt(receipt.id)}
                          className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {receipt.date ? format(new Date(receipt.date), 'MMM d, yyyy') : 'No date'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {receipt.vendor || 'Unknown Vendor'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {receipt.category || 'Uncategorized'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right text-emerald-600">
                        ${receipt.amount?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {receipt.sheet_id ? (
                          <span className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                            Synced
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            Not synced
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Receipt Detail Modal */}
      {selectedReceipt && (
        <ReceiptDetailModal
          receipt={selectedReceipt}
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          onUpdate={() => {
            fetchReceipts();
            setSelectedReceipt(null);
          }}
        />
      )}
    </div>
  );
}
