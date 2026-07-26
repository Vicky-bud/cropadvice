import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zmcbohkeamxrmcwbnyay.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_xe6nd1yK8BLoPpvh7Y5AqQ_p9_YEDG7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
