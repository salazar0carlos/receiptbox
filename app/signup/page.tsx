'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Mail, Lock, User, Receipt } from 'lucide-react';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Signup failed');
        return;
      }

      toast.success('Account created! Welcome to ReceiptBox');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)'
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-8)',
          textDecoration: 'none'
        }}>
          <div style={{
            padding: 'var(--space-3)',
            background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
            borderRadius: 'var(--radius-xl)'
          }}>
            <Receipt size={32} color="white" />
          </div>
          <span style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-bold)',
            color: 'white'
          }}>
            ReceiptBox
          </span>
        </Link>

        {/* Card */}
        <div className="glass-strong" style={{
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-8)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <h1 style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-bold)',
              color: 'white',
              marginBottom: 'var(--space-2)'
            }}>
              Start free
            </h1>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'rgba(255,255,255,0.7)'
            }}>
              Track receipts. Zero manual entry.
            </p>
          </div>

          {/* Google Signup */}
          <Button
            variant="secondary"
            className="glass"
            style={{
              width: '100%',
              marginBottom: 'var(--space-6)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            onClick={handleGoogleSignup}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                width: '100%',
                borderTop: '1px solid rgba(255,255,255,0.2)'
              }} />
            </div>
            <div style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 'var(--text-sm)'
            }}>
              <span style={{
                padding: '0 var(--space-4)',
                background: 'rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.6)'
              }}>
                OR
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)'
          }}>
            <Input
              type="text"
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="w-5 h-5" />}
              required
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }}
            />

            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              required
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }}
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-5 h-5" />}
              helperText="Minimum 8 characters"
              required
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }}
            />

            <Button
              type="submit"
              loading={loading}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-pink))',
                border: 'none',
                marginTop: 'var(--space-2)'
              }}
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p style={{
            textAlign: 'center',
            fontSize: 'var(--text-sm)',
            color: 'rgba(255,255,255,0.7)',
            marginTop: 'var(--space-6)'
          }}>
            Already have an account?{' '}
            <Link href="/login" style={{
              color: 'white',
              fontWeight: 'var(--font-semibold)',
              textDecoration: 'none'
            }}>
              Log in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          fontSize: 'var(--text-sm)',
          color: 'rgba(255,255,255,0.6)',
          marginTop: 'var(--space-8)'
        }}>
          Free plan includes 50 receipts/month. No credit card required.
        </p>
      </div>
    </div>
  );
}
