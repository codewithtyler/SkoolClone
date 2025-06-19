// Authentication context for managing user state and authentication
import React, { createContext, useContext, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: unknown }>;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<{ error: unknown }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper to detect if supabase is a dummy client
const isSupabaseConfigured = () => {
  return Boolean(import.meta.env.VITE_SUPABASE_URL) && Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);
};

// Helper for fake token key
const FAKE_TOKEN_KEY = 'dev_fake_token';
const FAKE_USER_KEY = 'dev_fake_user';
const REMEMBER_ME_KEY = 'rememberMe';
const REMEMBER_EMAIL_KEY = 'rememberEmail';
const FAKE_TOKEN_EXPIRY_DAYS = 21;

function getFakeExpiryDate() {
  const now = new Date();
  now.setDate(now.getDate() + FAKE_TOKEN_EXPIRY_DAYS);
  return now.toISOString();
}

function isFakeTokenValid() {
  const token = localStorage.getItem(FAKE_TOKEN_KEY);
  if (!token) return false;
  try {
    const { expiry } = JSON.parse(token);
    return expiry && new Date(expiry) > new Date();
  } catch {
    return false;
  }
}

function getFakeUserFromStorage() {
  const user = localStorage.getItem(FAKE_USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

function setFakeUserAndToken(user: User, rememberMe: boolean) {
  const expiry = getFakeExpiryDate();
  localStorage.setItem(FAKE_TOKEN_KEY, JSON.stringify({ expiry }));
  localStorage.setItem(FAKE_USER_KEY, JSON.stringify(user));
  if (rememberMe) {
    localStorage.setItem(REMEMBER_ME_KEY, 'true');
    localStorage.setItem(REMEMBER_EMAIL_KEY, user.email);
  } else {
    localStorage.removeItem(REMEMBER_ME_KEY);
    localStorage.removeItem(REMEMBER_EMAIL_KEY);
  }
}

function clearFakeUserAndToken() {
  localStorage.removeItem(FAKE_TOKEN_KEY);
  localStorage.removeItem(FAKE_USER_KEY);
  localStorage.removeItem(REMEMBER_ME_KEY);
  localStorage.removeItem(REMEMBER_EMAIL_KEY);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const supabaseAny = supabase;

  // On mount, check for valid fake token
  React.useEffect(() => {
    if (!isSupabaseConfigured()) {
      if (isFakeTokenValid()) {
        const fakeUser = getFakeUserFromStorage();
        setUser(fakeUser);
      } else {
        clearFakeUserAndToken();
        setUser(null);
      }
      setLoading(false);
      return;
    }
    supabaseAny.auth.getSession().then((result: unknown) => {
      if (
        typeof result === 'object' &&
        result !== null &&
        'data' in result &&
        typeof (result as Record<string, unknown>).data === 'object' &&
        (result as Record<string, unknown>).data !== null
      ) {
        const data = (result as Record<string, unknown>).data as Record<string, unknown>;
        if ('session' in data) {
          const session = data.session as { user?: SupabaseUser } | null;
          setSupabaseUser(session?.user ?? null);
          if (session?.user) {
            fetchUserProfile(session.user.id);
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    type AuthChangeHandler = (event: string, session: { user?: SupabaseUser } | null) => Promise<void>;
    const handler: AuthChangeHandler = async (_event, session) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    const { data: { subscription } = { subscription: undefined } } =
      supabaseAny.auth.onAuthStateChange(handler) || { data: { subscription: undefined } };

    return () => subscription && subscription.unsubscribe && subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data, error } = await supabaseAny
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Modified signIn to support fake login
  const signIn = async (email: string, password: string, rememberMe?: boolean) => {
    if (!isSupabaseConfigured()) {
      // Only allow dev/test logins
      const devRoles = [
        { email: 'admin@example.com', role: 'admin' },
        { email: 'teacher@example.com', role: 'educator' },
        { email: 'student@example.com', role: 'student' },
      ];
      const found = devRoles.find(r => r.email === email);
      if (!found || password !== 'password123') {
        return { error: { message: 'Invalid credentials' } };
      }
      // Create fake user
      const fakeUser: User = {
        id: found.role + '-dev',
        email,
        username: found.role,
        full_name: found.role.charAt(0).toUpperCase() + found.role.slice(1) + ' User',
        avatar_url: '',
        role: found.role as 'admin' | 'educator' | 'student',
        level: 1,
        points: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setFakeUserAndToken(fakeUser, !!rememberMe);
      setUser(fakeUser);
      return { error: undefined };
    }
    const { error } = await supabaseAny.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, username: string, fullName: string) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: 'Supabase is not configured.' } };
    }
    const { data, error } = await supabaseAny.auth.signUp({ email, password });

    if (!error && data.user) {
      // Create user profile
      const { error: profileError } = await supabaseAny
        .from('users')
        .insert([{
          id: data.user.id,
          email,
          username,
          full_name: fullName,
          role: 'student',
          level: 1,
          points: 0
        }]);

      return { error: profileError };
    }

    return { error };
  };

  // Modified signOut to clear fake token
  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      clearFakeUserAndToken();
      setUser(null);
      return;
    }
    await supabaseAny.auth.signOut();
  };

  const value = {
    user,
    supabaseUser,
    loading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
