'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Input from './Input';
import Button from './Button';
import Card from './Card';
import { DEFAULT_CATEGORIES } from '@/types';
import { Calendar, DollarSign, Store, Tag, CreditCard, FileText } from 'lucide-react';

interface ReceiptReviewProps {
  ocrData: any;
  imageUrl: string;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function ReceiptReview({
  ocrData,
  imageUrl,
  onSave,
  onCancel,
}: ReceiptReviewProps) {
  const [formData, setFormData] = useState({
    vendor: ocrData.vendor || '',
    amount: ocrData.amount || '',
    date: ocrData.date ? format(new Date(ocrData.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    category: ocrData.category || 'Other',
    tax_amount: ocrData.tax_amount || '',
    payment_method: ocrData.payment_method || '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      date: new Date(formData.date),
      amount: parseFloat(formData.amount) || null,
      tax_amount: formData.tax_amount ? parseFloat(formData.tax_amount) : null,
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Receipt Image */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Receipt Image</h3>
        <Card variant="bordered" padding="none">
          <img
            src={imageUrl}
            alt="Receipt"
            className="w-full h-auto max-h-[600px] object-contain"
          />
        </Card>
      </div>

      {/* Edit Form */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Review & Edit</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Vendor/Store"
            value={formData.vendor}
            onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
            icon={<Store className="w-5 h-5" />}
            required
          />

          <Input
            label="Amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            icon={<DollarSign className="w-5 h-5" />}
            required
          />

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            icon={<Calendar className="w-5 h-5" />}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full min-h-[44px] px-4 py-3 pl-10 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                required
              >
                {DEFAULT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Tax Amount (optional)"
            type="number"
            step="0.01"
            value={formData.tax_amount}
            onChange={(e) => setFormData({ ...formData, tax_amount: e.target.value })}
            icon={<DollarSign className="w-5 h-5" />}
          />

          <Input
            label="Payment Method (optional)"
            value={formData.payment_method}
            onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
            icon={<CreditCard className="w-5 h-5" />}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Save Receipt
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>

        {/* Confidence */}
        {ocrData.confidence && (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-emerald-800">
              <strong>AI Confidence:</strong> {Math.round(ocrData.confidence * 100)}%
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              Review the extracted data and make any necessary corrections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
