'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase/client';
import type { Admin } from './types';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  admin: Admin | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshAdmin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  admin: null,
  loading: true,
  signIn: async () => ({ error: 'Not initialized' }),
  signOut: async () => {},
  refreshAdmin: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdmin = useCallback(async (uid: string) => {
    const { data } = await supabase
      .from('admins')
      .select('id, email, full_name, role')
      .eq('id', uid)
      .maybeSingle();
    if (data) setAdmin(data as Admin);
    else setAdmin(null);
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchAdmin(s.user.id).finally(() => mounted && setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchAdmin(s.user.id);
      } else {
        setAdmin(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [fetchAdmin]);

  const refreshAdmin = useCallback(async () => {
    if (user) await fetchAdmin(user.id);
  }, [user, fetchAdmin]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, admin, loading, signIn, signOut, refreshAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
