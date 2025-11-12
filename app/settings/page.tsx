'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { User, Bell, CreditCard, FileSpreadsheet, Tag } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    checkAuth();
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

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'sheets', name: 'Google Sheets', icon: FileSpreadsheet },
    { id: 'categories', name: 'Categories', icon: Tag },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

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

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-8)' }}>Settings</h1>

        <div className="grid grid-cols-4" style={{ gap: 'var(--space-6)' }}>
          {/* Sidebar */}
          <div>
            <div className="glass-strong" style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                        padding: 'var(--space-3) var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'left',
                        transition: 'all var(--transition-base)',
                        background: activeTab === tab.id ? 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))' : 'transparent',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span style={{ fontWeight: 'var(--font-medium)' }}>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div style={{ gridColumn: 'span 3' }}>
            {activeTab === 'profile' && (
              <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-6)' }}>Profile</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <Input
                    label="Email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                  />
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Your name"
                  />
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'white', marginBottom: 'var(--space-2)' }}>
                      Theme
                    </label>
                    <select style={{
                      width: '100%',
                      minHeight: '44px',
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: 'var(--text-base)'
                    }}>
                      <option value="system">System</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <Button style={{ background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))', border: 'none' }}>Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'sheets' && (
              <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                  <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white' }}>Google Sheets</h2>
                  <Button onClick={() => router.push('/sheets/connect')} style={{ background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))', border: 'none' }}>
                    Connect New Sheet
                  </Button>
                </div>
                <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-6)' }}>
                  Manage your connected Google Sheets. Each receipt can be saved to any of your connected sheets.
                </p>
                <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'rgba(255,255,255,0.6)' }}>
                  No sheets connected yet. Click "Connect New Sheet" to get started.
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                  <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white' }}>Categories</h2>
                  <Button style={{ background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))', border: 'none' }}>Add Category</Button>
                </div>
                <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-6)' }}>
                  Manage your expense categories and vendor mappings.
                </p>
                <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'rgba(255,255,255,0.6)' }}>
                  Using default categories. Add custom categories for your specific needs.
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-6)' }}>Notifications</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                      <p style={{ fontWeight: 'var(--font-medium)', color: 'white' }}>Email notifications</p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>Receive email updates about your receipts</p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ display: 'none' }} defaultChecked />
                      <div style={{
                        width: '44px',
                        height: '24px',
                        background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                        borderRadius: 'var(--radius-full)',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          width: '20px',
                          height: '20px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: 'all var(--transition-base)'
                        }}></div>
                      </div>
                    </label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                      <p style={{ fontWeight: 'var(--font-medium)', color: 'white' }}>Weekly summary</p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>Get a weekly email with your spending summary</p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ display: 'none' }} />
                      <div style={{
                        width: '44px',
                        height: '24px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: 'var(--radius-full)',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          left: '2px',
                          width: '20px',
                          height: '20px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: 'all var(--transition-base)'
                        }}></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="glass-strong" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)', color: 'white', marginBottom: 'var(--space-6)' }}>Billing</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                  <div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-2)' }}>Current Plan</p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-4)',
                      background: 'rgba(168, 85, 247, 0.1)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      borderRadius: 'var(--radius-lg)'
                    }}>
                      <div>
                        <p style={{ fontWeight: 'var(--font-semibold)', color: 'white' }}>Free Plan</p>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)' }}>50 receipts per month</p>
                      </div>
                      <Button variant="primary" onClick={() => router.push('/pricing')} style={{ background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))', border: 'none' }}>
                        Upgrade
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-2)' }}>Usage This Month</p>
                    <div style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                        <span style={{ color: 'rgba(255,255,255,0.8)' }}>Receipts</span>
                        <span style={{ fontWeight: 'var(--font-semibold)', color: 'white' }}>0 / 50</span>
                      </div>
                      <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', height: '8px' }}>
                        <div style={{
                          background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                          height: '8px',
                          borderRadius: 'var(--radius-full)',
                          width: '0%'
                        }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
