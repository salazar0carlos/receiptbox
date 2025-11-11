'use client';

import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import { Calendar, DollarSign, Store, Tag, Trash2, Edit2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { DEFAULT_CATEGORIES } from '@/types';

interface ReceiptDetailModalProps {
  receipt: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ReceiptDetailModal({
  receipt,
  isOpen,
  onClose,
  onUpdate,
}: ReceiptDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    vendor: receipt?.vendor || '',
    amount: receipt?.amount || '',
    date: receipt?.date ? format(new Date(receipt.date), 'yyyy-MM-dd') : '',
    category: receipt?.category || 'Other',
    tax_amount: receipt?.tax_amount || '',
    payment_method: receipt?.payment_method || '',
    notes: receipt?.notes || '',
  });

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this receipt? This cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/receipts/${receipt.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      toast.success('Receipt deleted');
      onUpdate();
      onClose();
    } catch (error) {
      toast.error('Failed to delete receipt');
    } finally {
      setDeleting(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/receipts/${receipt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount) || null,
          tax_amount: formData.tax_amount ? parseFloat(formData.tax_amount) : null,
          date: new Date(formData.date),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      toast.success('Receipt updated');
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      toast.error('Failed to update receipt');
    } finally {
      setSaving(false);
    }
  };

  if (!receipt) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Receipt' : 'Receipt Details'}
      size="large"
      footer={
        isEditing ? (
          <>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} loading={saving}>
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={handleDelete} loading={deleting}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </>
        )
      }
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Receipt Image */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Receipt Image</h3>
          <div className="relative group">
            <img
              src={receipt.image_url}
              alt="Receipt"
              className="w-full h-auto max-h-[600px] object-contain bg-gray-50 rounded-lg"
            />
            <a
              href={receipt.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="w-5 h-5 text-gray-600" />
            </a>
          </div>
        </div>

        {/* Receipt Data */}
        <div>
          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Vendor"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                icon={<Store className="w-5 h-5" />}
              />
              <Input
                label="Amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                icon={<DollarSign className="w-5 h-5" />}
              />
              <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                icon={<Calendar className="w-5 h-5" />}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Tax Amount"
                type="number"
                step="0.01"
                value={formData.tax_amount}
                onChange={(e) => setFormData({ ...formData, tax_amount: e.target.value })}
              />
              <Input
                label="Payment Method"
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Vendor</p>
                <p className="text-lg font-semibold text-gray-900">{receipt.vendor || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${receipt.amount?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="text-gray-900">
                    {receipt.date ? format(new Date(receipt.date), 'MMM d, yyyy') : 'No date'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                    {receipt.category || 'Uncategorized'}
                  </span>
                </div>
              </div>
              {receipt.tax_amount && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tax</p>
                  <p className="text-gray-900">${receipt.tax_amount.toFixed(2)}</p>
                </div>
              )}
              {receipt.payment_method && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="text-gray-900">{receipt.payment_method}</p>
                </div>
              )}
              {receipt.notes && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Notes</p>
                  <p className="text-gray-900">{receipt.notes}</p>
                </div>
              )}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Created {format(new Date(receipt.created_at), 'MMM d, yyyy h:mm a')}
                </p>
                {receipt.sheet_id && (
                  <p className="text-xs text-gray-500 mt-1">
                    ✓ Synced to Google Sheets
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
