import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

Deno.serve(async (req) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const body = await req.json();
    const { display_name, avatar_emoji } = body;

    if (!display_name) {
      return Response.json({ error: 'display_name is required' }, { status: 400 });
    }

    const { data: profile, error } = await supabase
      .from('player_profiles')
      .insert([{
        display_name,
        avatar_emoji: avatar_emoji || '😊',
        user_email: `student_${Date.now()}@circadia.local`,
        total_xp: 0,
        coins: 0,
        level: 1,
        current_streak: 0,
        longest_streak: 0,
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return Response.json({ profile });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});