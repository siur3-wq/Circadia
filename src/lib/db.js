/**
 * Supabase database layer - replaces base44.entities.*
 * Tables expected in Supabase:
 * player_profiles, challenge_completions, schools, classes
 */
import { supabase } from '@/api/supabaseClient';

// ── helpers ────────────────────────────────────────────────────────────────

function throwIfError({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

// ── PlayerProfile ──────────────────────────────────────────────────────────

export const PlayerProfile = {
  async list(orderBy = 'created_at', limit = 500) {
    const col = orderBy.replace(/^-/, '');
    const asc = !orderBy.startsWith('-');
    
    const { data, error } = await supabase
      .from('player_profiles')
      .select('*')
      .order(col, { ascending: asc })
      .limit(limit);
      
    console.log("📊 db.js -> PlayerProfile.list response:", data, error);
    if (error) throw new Error(error.message);
    return data || [];
  },

  async filter(filters = {}, orderBy = 'created_at', limit = 500) {
    console.log("🔍 db.js -> PlayerProfile.filter requested with parameters:", filters);
    
    let q = supabase.from('player_profiles').select('*');
    
    if (filters && typeof filters === 'object') {
      Object.entries(filters).forEach(([k, v]) => { 
        q = q.eq(k, v); 
      });
    }

    const col = orderBy.replace(/^-/, '');
    const asc = !orderBy.startsWith('-');
    q = q.order(col, { ascending: asc }).limit(limit);
    
    const { data, error } = await q;
    console.log("📊 db.js -> PlayerProfile.filter response data:", data, error);
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async create(data) {
    const { data: row, error } = await supabase
      .from('player_profiles')
      .insert([data])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  },

  async update(id, data) {
    const { data: row, error } = await supabase
      .from('player_profiles')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  },

  async delete(id) {
    const { error } = await supabase.from('player_profiles').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};

// ── ChallengeCompletion ────────────────────────────────────────────────────

export const ChallengeCompletion = {
  async list(orderBy = 'created_at', limit = 5000) {
    const col = orderBy.replace(/^-/, '');
    const asc = !orderBy.startsWith('-');
    const { data, error } = await supabase
      .from('challenge_completions')
      .select('*')
      .order(col, { ascending: asc })
      .limit(limit);
    if (error) throw new Error(error.message);
    return data || [];
  },

  async filter(filters = {}) {
    console.log("🔍 db.js -> ChallengeCompletion.filter requested with:", filters);
    let q = supabase.from('challenge_completions').select('*');
    
    if (filters && typeof filters === 'object') {
      Object.entries(filters).forEach(([k, v]) => { q = q.eq(k, v); });
    }
    
    const { data, error } = await q;
    console.log("📊 db.js -> ChallengeCompletion.filter response:", data);
    if (error) throw new Error(error.message);
    return data || [];
  },

  async create(data) {
    const { data: row, error } = await supabase
      .from('challenge_completions')
      .insert([data])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  },
};

// ── School ─────────────────────────────────────────────────────────────────

export const School = {
  async list(orderBy = 'name', limit = 200) {
    const col = orderBy.replace(/^-/, '');
    const asc = !orderBy.startsWith('-');
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order(col, { ascending: asc })
      .limit(limit);
    if (error) throw new Error(error.message);
    return data || [];
  },

  async create(data) {
    const { data: row, error } = await supabase
      .from('schools')
      .insert([data])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  },

  async update(id, data) {
    const { data: row, error } = await supabase
      .from('schools')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  },

  async delete(id) {
    const { error } = await supabase.from('schools').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};

// ── Class ──────────────────────────────────────────────────────────────────

export const Class = {
  async list(orderBy = 'name', limit = 200) {
    const col = orderBy.replace(/^-/, '');
    const asc = !orderBy.startsWith('-');
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order(col, { ascending: asc })
      .limit(limit);
    if (error) throw new Error(error.message);
    return data || [];
  },

  async filter(filters = {}) {
    let q = supabase.from('classes').select('*');
    if (filters && typeof filters === 'object') {
      Object.entries(filters).forEach(([k, v]) => { q = q.eq(k, v); });
    }
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    return data || [];
  },

  async create(data) {
    const { data: row, error } = await supabase
      .from('classes')
      .insert([data])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  },

  async update(id, data) {
    const { data: row, error } = await supabase
      .from('classes')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  },

  async delete(id) {
    const { error } = await supabase.from('classes').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};