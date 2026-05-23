import React from "react";
import { PlayerProfile } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { School, ArrowLeft } from "lucide-react";

export default function SelectSchool() {
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["allProfilesForSchools"],
    queryFn: () => PlayerProfile.list(),
  });

  // Pull out entirely unique list of schools from profiles
  const uniqueSchools = [...new Set(profiles.map(p => p.school).filter(Boolean))];

  const handleSchoolSelect = (schoolName) => {
    localStorage.setItem("filter_selected_school", schoolName);
    window.location.href = "/SelectClass";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 pt-10">
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <button onClick={() => window.location.href = "/SelectProfile"} className="text-xs font-bold flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Select Your School</h2>
          <p className="text-sm text-muted-foreground">Select an active campus database to browse:</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12 font-bold text-muted-foreground animate-pulse">Loading schools from Supabase...</div>
        ) : uniqueSchools.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-2xl text-muted-foreground font-bold">No school items found in profiles database.</div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {uniqueSchools.map((school, i) => (
              <motion.button
                key={school}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handleSchoolSelect(school)}
                className="w-full p-4 rounded-xl border-2 border-border bg-card hover:border-primary font-bold text-sm text-left flex items-center gap-3 transition-colors"
              >
                <School className="w-4 h-4 text-primary" />
                <span>{school}</span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}