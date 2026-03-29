import { createClient } from '@supabase/supabase-js';

const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseClient = createClient(publicUrl, publicAnonKey);