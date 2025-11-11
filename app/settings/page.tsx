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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card variant="bordered" padding="small">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card variant="shadow" padding="large">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h2>
                <div className="space-y-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <select className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent">
                      <option value="system">System</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </Card>
            )}

            {activeTab === 'sheets' && (
              <Card variant="shadow" padding="large">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Google Sheets</h2>
                  <Button onClick={() => router.push('/sheets/connect')}>
                    Connect New Sheet
                  </Button>
                </div>
                <p className="text-gray-600 mb-6">
                  Manage your connected Google Sheets. Each receipt can be saved to any of your connected sheets.
                </p>
                <div className="text-center py-12 text-gray-500">
                  No sheets connected yet. Click "Connect New Sheet" to get started.
                </div>
              </Card>
            )}

            {activeTab === 'categories' && (
              <Card variant="shadow" padding="large">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
                  <Button>Add Category</Button>
                </div>
                <p className="text-gray-600 mb-6">
                  Manage your expense categories and vendor mappings.
                </p>
                <div className="text-center py-12 text-gray-500">
                  Using default categories. Add custom categories for your specific needs.
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card variant="shadow" padding="large">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Email notifications</p>
                      <p className="text-sm text-gray-600">Receive email updates about your receipts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Weekly summary</p>
                      <p className="text-sm text-gray-600">Get a weekly email with your spending summary</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card variant="shadow" padding="large">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Billing</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Current Plan</p>
                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">Free Plan</p>
                        <p className="text-sm text-gray-600">50 receipts per month</p>
                      </div>
                      <Button variant="primary" onClick={() => router.push('/pricing')}>
                        Upgrade
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Usage This Month</p>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Receipts</span>
                        <span className="font-semibold text-gray-900">0 / 50</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
