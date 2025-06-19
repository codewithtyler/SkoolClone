// Supabase client configuration and initialization
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let _supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Supabase features will be disabled.');
  // Create a dummy client with no-op methods to prevent errors
  const dummy = new Proxy({}, {
    get: () => () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
  });
  _supabase = {
    auth: dummy,
    from: () => dummy,
    // Add other top-level methods as needed
  };
} else {
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Export supabase as type 'any' so consumers can handle both the real and dummy client without type errors.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: any = _supabase;