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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)' }}>
      <Navbar user={user} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'white', marginBottom: 'var(--space-2)' }}>
            Choose Your Template
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.8)' }}>
            Pick the template that fits your needs. You can always create more later.
          </p>
        </div>

        <div className="grid grid-cols-2" style={{ gap: 'var(--space-6)', maxWidth: '1000px', margin: '0 auto var(--space-8)' }}>
          {templates.map((template) => (
            <div
              key={template.type}
              className="glass-strong"
              style={{
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-2xl)',
                border: selectedTemplate === template.type ? '2px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                boxShadow: selectedTemplate === template.type ? '0 10px 30px rgba(168, 85, 247, 0.2)' : 'none'
              }}
              onClick={() => setSelectedTemplate(template.type)}
            >
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileSpreadsheet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'white' }}>
                      {template.name}
                    </h3>
                  </div>
                </div>
                {selectedTemplate === template.type && (
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-4)' }}>{template.description}</p>
              <div>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'white', marginBottom: 'var(--space-2)' }}>Includes:</p>
                <ul style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  {template.sheets.map((sheet) => (
                    <li key={sheet.name}>• {sheet.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Button
            onClick={handleCreateSheet}
            loading={loading}
            size="large"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
              border: 'none'
            }}
          >
            Create {templates.find(t => t.type === selectedTemplate)?.name} Sheet
          </Button>
          <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 'var(--space-4)' }}>
            Your new Google Sheet will be created and ready to use in seconds.
          </p>
        </div>
      </div>
    </div>
  );
}
