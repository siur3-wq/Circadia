import { createClient } from '@supabase/supabase-js'

// Vite uses import.meta.env instead of process.env!
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// This guard ensures we don't crash with a white screen if something is missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase Keys! Check your .env.local file configuration.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)