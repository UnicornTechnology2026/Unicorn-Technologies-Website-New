'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2, Lock, Mail, ArrowLeft, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Bootstrap state
  const [showBootstrap, setShowBootstrap] = useState(false);
  const [bsEmail, setBsEmail] = useState('');
  const [bsPassword, setBsPassword] = useState('');
  const [bsName, setBsName] = useState('');
  const [bsLoading, setBsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Welcome back!');
      router.push('/admin');
    }
  };

  const handleBootstrap = async (e: React.FormEvent) => {
    e.preventDefault();
    setBsLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const res = await fetch(`${supabaseUrl}/functions/v1/admin-bootstrap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email: bsEmail, password: bsPassword, full_name: bsName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Bootstrap failed');
      toast.success('Admin account created. You can now log in.');
      setShowBootstrap(false);
      setEmail(bsEmail);
      setBsEmail('');
      setBsPassword('');
      setBsName('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create admin');
    } finally {
      setBsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your site</p>
        </div>

        {!showBootstrap ? (
          <form onSubmit={handleLogin} className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@unicorntechnologies.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <button
              type="button"
              onClick={() => setShowBootstrap(true)}
              className="w-full text-center text-xs text-muted-foreground hover:text-primary"
            >
              First time setup? Create admin account
            </button>

            <a
              href="/"
              className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to website
            </a>
          </form>
        ) : (
          <form onSubmit={handleBootstrap} className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <UserPlus className="h-4 w-4" />
              Create Admin Account
            </div>
            <p className="text-xs text-muted-foreground">
              This creates the first admin account. Once created, this option will be locked.
            </p>
            <div className="space-y-2">
              <Label htmlFor="bs-name">Full Name</Label>
              <Input
                id="bs-name"
                placeholder="Admin Name"
                value={bsName}
                onChange={(e) => setBsName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bs-email">Email</Label>
              <Input
                id="bs-email"
                type="email"
                placeholder="admin@unicorntechnologies.com"
                value={bsEmail}
                onChange={(e) => setBsEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bs-password">Password</Label>
              <Input
                id="bs-password"
                type="password"
                placeholder="Minimum 6 characters"
                value={bsPassword}
                onChange={(e) => setBsPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={bsLoading}>
              {bsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Admin Account'
              )}
            </Button>
            <button
              type="button"
              onClick={() => setShowBootstrap(false)}
              className="w-full text-center text-xs text-muted-foreground hover:text-primary"
            >
              Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
