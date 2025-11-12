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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
        <Navbar user={user} />
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
          {view === 'grid' ? (
            <div className="grid grid-cols-3" style={{ gap: 'var(--space-6)' }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
      <Navbar user={user} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-2)' }}>Receipt Library</h1>
            <p style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.7)' }}>
              {filteredReceipts.length} {filteredReceipts.length === 1 ? 'receipt' : 'receipts'}
              {selectedReceipts.size > 0 && ` • ${selectedReceipts.size} selected`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" onClick={handleExport} loading={exporting} className="glass" style={{ color: 'white' }}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => router.push('/dashboard')} style={{ background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))', border: 'none' }}>
              Upload Receipt
            </Button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedReceipts.size > 0 && (
          <div className="glass-strong" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(168, 85, 247, 0.5)', marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <span style={{ color: 'white', fontWeight: 'var(--font-medium)' }}>
                {selectedReceipts.size} receipt(s) selected
              </span>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Button size="small" variant="ghost" onClick={() => setSelectedReceipts(new Set())} style={{ color: 'white' }}>
                  Clear
                </Button>
                <Button size="small" variant="secondary" onClick={handleBulkDelete} className="glass" style={{ color: 'white' }}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Filters and View Toggle */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <Input
              placeholder="Search receipts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {filteredReceipts.length > 0 && (
              <Button
                variant="ghost"
                onClick={selectAll}
                size="small"
                style={{ color: 'white' }}
              >
                <Check className="w-4 h-4 mr-2" />
                {selectedReceipts.size === filteredReceipts.length ? 'Deselect All' : 'Select All'}
              </Button>
            )}
            <Button
              variant={view === 'grid' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setView('grid')}
              style={view === 'grid' ? { background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))', border: 'none' } : { color: 'white' }}
              className={view !== 'grid' ? 'glass' : ''}
            >
              <Grid3x3 className="w-5 h-5" />
            </Button>
            <Button
              variant={view === 'list' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setView('list')}
              style={view === 'list' ? { background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))', border: 'none' } : { color: 'white' }}
              className={view !== 'list' ? 'glass' : ''}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Empty State */}
        {filteredReceipts.length === 0 && (
          <div className="glass-strong" style={{ padding: 'var(--space-12)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)'
            }}>
              <Search className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.5)' }} />
            </div>
            <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-2)' }}>
              {searchQuery ? 'No receipts found' : 'No receipts yet'}
            </h3>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-6)' }}>
              {searchQuery
                ? 'Try adjusting your search'
                : 'Upload your first receipt to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => router.push('/dashboard')} style={{ background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))', border: 'none' }}>
                Upload Receipt
              </Button>
            )}
          </div>
        )}

        {/* Grid View */}
        {view === 'grid' && filteredReceipts.length > 0 && (
          <div className="grid grid-cols-3" style={{ gap: 'var(--space-6)' }}>
            {filteredReceipts.map((receipt) => (
              <div
                key={receipt.id}
                className="glass-strong"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all var(--transition-base)'
                }}
              >
                {/* Selection Checkbox */}
                <div style={{ position: 'absolute', top: 'var(--space-2)', left: 'var(--space-2)', zIndex: 10 }}>
                  <input
                    type="checkbox"
                    checked={selectedReceipts.has(receipt.id)}
                    onChange={() => toggleSelectReceipt(receipt.id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary-purple)' }}
                  />
                </div>

                {/* Sync Status */}
                {receipt.sheet_id && (
                  <div style={{
                    position: 'absolute',
                    top: 'var(--space-2)',
                    right: 'var(--space-2)',
                    zIndex: 10,
                    background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                    color: 'white',
                    padding: 'var(--space-1) var(--space-2)',
                    borderRadius: 'var(--radius-base)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-medium)'
                  }}>
                    Synced
                  </div>
                )}

                <div onClick={() => setSelectedReceipt(receipt)}>
                  <div style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                    <img
                      src={receipt.image_url}
                      alt={receipt.vendor || 'Receipt'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'white' }}>
                        {receipt.vendor || 'Unknown Vendor'}
                      </h3>
                      <span className="gradient-text" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                        ${receipt.amount?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>
                      <span>
                        {receipt.date ? format(new Date(receipt.date), 'MMM d, yyyy') : 'No date'}
                      </span>
                      <span>
                        {receipt.category || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {view === 'list' && filteredReceipts.length > 0 && (
          <div className="glass-strong" style={{ borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%' }}>
                <thead style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <tr>
                    <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left' }}>
                      <input
                        type="checkbox"
                        checked={selectedReceipts.size === filteredReceipts.length}
                        onChange={selectAll}
                        style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary-purple)' }}
                      />
                    </th>
                    <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-medium)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Date</th>
                    <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-medium)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Vendor</th>
                    <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-medium)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Category</th>
                    <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-medium)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Amount</th>
                    <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'center', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-medium)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReceipts.map((receipt, index) => (
                    <tr
                      key={receipt.id}
                      style={{
                        cursor: 'pointer',
                        borderTop: index > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                      }}
                      onClick={() => setSelectedReceipt(receipt)}
                    >
                      <td style={{ padding: 'var(--space-4) var(--space-6)' }} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedReceipts.has(receipt.id)}
                          onChange={() => toggleSelectReceipt(receipt.id)}
                          style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary-purple)' }}
                        />
                      </td>
                      <td style={{ padding: 'var(--space-4) var(--space-6)', whiteSpace: 'nowrap', fontSize: 'var(--text-sm)', color: 'white' }}>
                        {receipt.date ? format(new Date(receipt.date), 'MMM d, yyyy') : 'No date'}
                      </td>
                      <td style={{ padding: 'var(--space-4) var(--space-6)', whiteSpace: 'nowrap', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'white' }}>
                        {receipt.vendor || 'Unknown Vendor'}
                      </td>
                      <td style={{ padding: 'var(--space-4) var(--space-6)', whiteSpace: 'nowrap', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.8)' }}>
                        {receipt.category || 'Uncategorized'}
                      </td>
                      <td style={{ padding: 'var(--space-4) var(--space-6)', whiteSpace: 'nowrap', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', textAlign: 'right' }}>
                        <span className="gradient-text">${receipt.amount?.toFixed(2) || '0.00'}</span>
                      </td>
                      <td style={{ padding: 'var(--space-4) var(--space-6)', whiteSpace: 'nowrap', textAlign: 'center' }}>
                        {receipt.sheet_id ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: 'var(--space-1) var(--space-2)',
                            background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                            color: 'white',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-medium)'
                          }}>
                            Synced
                          </span>
                        ) : (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: 'var(--space-1) var(--space-2)',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.7)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--text-xs)'
                          }}>
                            Not synced
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
