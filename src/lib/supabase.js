import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lnmaipaskcxvhysnbeqc.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_vpNpa2MJNRtALVGPsfI3-w_-kCaAVYU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);