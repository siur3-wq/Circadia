import { supabase } from './supabaseClient';

export const base44 = {
  entities: {
    ChallengeCompletion: {
      filter: async (matchConditions) => {
        console.log("Bridge fetching completions for:", matchConditions);
        
        const { data, error } = await supabase
          .from('challenge_completions') 
          .select('*')
          .match(matchConditions);

        if (error) {
          console.error("Supabase Error (completions):", error.message);
        }
        
        // Wrap the return in an object so throwIfError() can unpack it safely
        return { data: data || [], error: error };
      }
    },
    PlayerProfile: {
      filter: async (matchConditions) => {
        console.log("Bridge fetching profile for:", matchConditions);

        const { data, error } = await supabase
          .from('player_profiles')
          .select('*')
          .match(matchConditions);

        if (error) {
          console.error("Supabase Error (profiles):", error.message);
        }

        // Wrap the return in an object so throwIfError() can unpack it safely
        return { data: data || [], error: error };
      }
    }
  }
};