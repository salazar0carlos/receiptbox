'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import { SkeletonPage } from '@/components/Skeleton';
import { Receipt, FileSpreadsheet, DollarSign, TrendingUp, Users } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchAnalytics();
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

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SkeletonPage />
        </div>
      </div>
    );
  }

  const categoryData = analytics?.spending?.byCategory || {};
  const topCategories = Object.entries(categoryData)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Your usage overview and insights</p>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card variant="bordered" padding="medium">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Receipts</p>
                <p className="text-3xl font-bold text-gray-900">
                  {analytics?.receipts?.total || 0}
                </p>
                <p className="text-sm text-emerald-600 mt-1">
                  +{analytics?.receipts?.last30Days || 0} this month
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Receipt className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card variant="bordered" padding="medium">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Spending</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${analytics?.spending?.total?.toFixed(2) || '0.00'}
                </p>
                <p className="text-sm text-gray-500 mt-1">All time</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card variant="bordered" padding="medium">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sheets Connected</p>
                <p className="text-3xl font-bold text-gray-900">
                  {analytics?.sheets?.connected || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">Active connections</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card variant="bordered" padding="medium">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                <p className="text-3xl font-bold text-gray-900 capitalize">
                  {analytics?.subscription?.plan || 'Free'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {analytics?.subscription?.status || 'Active'}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Categories */}
          <Card variant="shadow" padding="large">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Top Spending Categories
            </h2>
            {topCategories.length > 0 ? (
              <div className="space-y-4">
                {topCategories.map(([category, amount]: any) => {
                  const percentage = (amount / analytics.spending.total) * 100;
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {category}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          ${amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {percentage.toFixed(1)}% of total
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No spending data yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Upload receipts to see analytics
                </p>
              </div>
            )}
          </Card>

          {/* Recent Activity */}
          <Card variant="shadow" padding="large">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Usage Statistics
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Receipts (Last 30 Days)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics?.receipts?.last30Days || 0}
                  </p>
                </div>
                <Receipt className="w-10 h-10 text-emerald-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Average per Receipt</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${(analytics?.spending?.total / (analytics?.receipts?.total || 1)).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-10 h-10 text-blue-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Categories Used</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.keys(categoryData).length}
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card variant="bordered" padding="large" className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-all"
            >
              <Receipt className="w-8 h-8 text-emerald-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Upload Receipt</h3>
              <p className="text-sm text-gray-600">Add a new receipt</p>
            </button>

            <button
              onClick={() => router.push('/library')}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-all"
            >
              <FileSpreadsheet className="w-8 h-8 text-emerald-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">View Library</h3>
              <p className="text-sm text-gray-600">Browse all receipts</p>
            </button>

            <button
              onClick={() => router.push('/settings')}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-all"
            >
              <Users className="w-8 h-8 text-emerald-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Settings</h3>
              <p className="text-sm text-gray-600">Manage your account</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
