'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import AdminSidebar from '@/components/admin/sidebar';
import { Loader2, Sparkles } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, admin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace('/admin/login');
    }
    if (!loading && user && isLoginPage && admin) {
      router.replace('/admin');
    }
  }, [user, admin, loading, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary/20">
      <AdminSidebar />
      <div className="flex-1 overflow-auto lg:ml-64">
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3 lg:hidden">
          <div className="flex items-center gap-2 font-bold">
            <Sparkles className="h-5 w-5 text-primary" />
            Admin
          </div>
        </div>
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
