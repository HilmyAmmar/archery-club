import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  console.error("Waduh! Service Role Key gak kebaca. Cek .env lu.");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);