import React, { createContext, useContext } from 'react';
import { useAdminAuth } from '../auth/useAdminAuth';
import type { User, Session } from '@supabase/supabase-js';

interface AdminContextValue {
  user: any;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const auth = useAdminAuth();
  return <AdminContext.Provider value={auth}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
