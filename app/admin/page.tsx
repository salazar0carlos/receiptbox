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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
        <Navbar user={user} />
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
      <Navbar user={user} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-2)' }}>Analytics Dashboard</h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.7)' }}>Your usage overview and insights</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <div className="glass-strong" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-1)' }}>Total Receipts</p>
                <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>
                  {analytics?.receipts?.total || 0}
                </p>
                <p className="gradient-text" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                  +{analytics?.receipts?.last30Days || 0} this month
                </p>
              </div>
              <div style={{ padding: 'var(--space-3)', background: 'linear-gradient(135deg, var(--primary-purple), #9333ea)', borderRadius: 'var(--radius-lg)' }}>
                <Receipt className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="glass-strong" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-1)' }}>Total Spending</p>
                <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>
                  ${analytics?.spending?.total?.toFixed(2) || '0.00'}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.6)', marginTop: 'var(--space-1)' }}>All time</p>
              </div>
              <div style={{ padding: 'var(--space-3)', background: 'linear-gradient(135deg, var(--primary-pink), #ec4899)', borderRadius: 'var(--radius-lg)' }}>
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="glass-strong" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-1)' }}>Sheets Connected</p>
                <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>
                  {analytics?.sheets?.connected || 0}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.6)', marginTop: 'var(--space-1)' }}>Active connections</p>
              </div>
              <div style={{ padding: 'var(--space-3)', background: 'linear-gradient(135deg, var(--primary-cyan), #0891b2)', borderRadius: 'var(--radius-lg)' }}>
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="glass-strong" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-1)' }}>Current Plan</p>
                <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'white', textTransform: 'capitalize' }}>
                  {analytics?.subscription?.plan || 'Free'}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.6)', marginTop: 'var(--space-1)' }}>
                  {analytics?.subscription?.status || 'Active'}
                </p>
              </div>
              <div style={{ padding: 'var(--space-3)', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 'var(--radius-lg)' }}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2" style={{ gap: 'var(--space-6)' }}>
          {/* Top Categories */}
          <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-6)' }}>
              Top Spending Categories
            </h2>
            {topCategories.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {topCategories.map(([category, amount]: any) => {
                  const percentage = (amount / analytics.spending.total) * 100;
                  return (
                    <div key={category}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'rgba(255,255,255,0.9)' }}>
                          {category}
                        </span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'white' }}>
                          ${amount.toFixed(2)}
                        </span>
                      </div>
                      <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', height: '8px' }}>
                        <div
                          style={{
                            background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                            height: '8px',
                            borderRadius: 'var(--radius-full)',
                            transition: 'all var(--transition-base)',
                            width: `${percentage}%`
                          }}
                        />
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)', marginTop: 'var(--space-1)' }}>
                        {percentage.toFixed(1)}% of total
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>No spending data yet</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)', marginTop: 'var(--space-2)' }}>
                  Upload receipts to see analytics
                </p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-6)' }}>
              Usage Statistics
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'rgba(168, 85, 247, 0.1)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>Receipts (Last 30 Days)</p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>
                    {analytics?.receipts?.last30Days || 0}
                  </p>
                </div>
                <Receipt className="w-10 h-10" style={{ color: 'var(--primary-purple)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'rgba(236, 72, 153, 0.1)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>Average per Receipt</p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>
                    ${(analytics?.spending?.total / (analytics?.receipts?.total || 1)).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-10 h-10" style={{ color: 'var(--primary-pink)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'rgba(6, 182, 212, 0.1)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>Categories Used</p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>
                    {Object.keys(categoryData).length}
                  </p>
                </div>
                <TrendingUp className="w-10 h-10" style={{ color: 'var(--primary-cyan)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)', marginTop: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-4)' }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-3" style={{ gap: 'var(--space-4)' }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                padding: 'var(--space-4)',
                textAlign: 'left',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-lg)',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                color: 'white'
              }}
            >
              <Receipt className="w-8 h-8" style={{ color: 'var(--primary-purple)', marginBottom: 'var(--space-2)' }} />
              <h3 style={{ fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-1)' }}>Upload Receipt</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>Add a new receipt</p>
            </button>

            <button
              onClick={() => router.push('/library')}
              style={{
                padding: 'var(--space-4)',
                textAlign: 'left',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-lg)',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                color: 'white'
              }}
            >
              <FileSpreadsheet className="w-8 h-8" style={{ color: 'var(--primary-pink)', marginBottom: 'var(--space-2)' }} />
              <h3 style={{ fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-1)' }}>View Library</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>Browse all receipts</p>
            </button>

            <button
              onClick={() => router.push('/settings')}
              style={{
                padding: 'var(--space-4)',
                textAlign: 'left',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-lg)',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                color: 'white'
              }}
            >
              <Users className="w-8 h-8" style={{ color: 'var(--primary-cyan)', marginBottom: 'var(--space-2)' }} />
              <h3 style={{ fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-1)' }}>Settings</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>Manage your account</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
