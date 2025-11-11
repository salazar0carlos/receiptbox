'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { getAllTemplates } from '@/lib/sheet-templates';
import { FileSpreadsheet, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function SheetsSetupPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('business');
  const [loading, setLoading] = useState(false);
  const templates = getAllTemplates();

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
    }
  };

  const handleCreateSheet = async () => {
    setLoading(true);

    try {
      // This would use the stored OAuth tokens
      // For now, simplified version
      const response = await fetch('/api/sheets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateType: selectedTemplate,
          accessToken: 'stored_token', // Would come from OAuth flow
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create sheet');
      }

      toast.success('Google Sheet created successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Sheet creation error:', error);
      toast.error('Failed to create sheet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600">
            Pick the template that fits your needs. You can always create more later.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
          {templates.map((template) => (
            <Card
              key={template.type}
              variant={selectedTemplate === template.type ? 'shadow' : 'bordered'}
              padding="large"
              className={`cursor-pointer transition-all ${
                selectedTemplate === template.type
                  ? 'border-2 border-emerald-600'
                  : 'hover:border-emerald-300'
              }`}
              onClick={() => setSelectedTemplate(template.type)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {template.name}
                    </h3>
                  </div>
                </div>
                {selectedTemplate === template.type && (
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Includes:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {template.sheets.map((sheet) => (
                    <li key={sheet.name}>• {sheet.name}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <Button
            onClick={handleCreateSheet}
            loading={loading}
            size="large"
            className="w-full"
          >
            Create {templates.find(t => t.type === selectedTemplate)?.name} Sheet
          </Button>
          <p className="text-sm text-gray-500 text-center mt-4">
            Your new Google Sheet will be created and ready to use in seconds.
          </p>
        </div>
      </div>
    </div>
  );
}
