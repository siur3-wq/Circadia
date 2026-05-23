import React from "react";
import { PlayerProfile } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ClipboardList, ArrowLeft } from "lucide-react";

export default function SelectClass() {
  const currentSchool = localStorage.getItem("filter_selected_school");

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["allProfilesForClasses"],
    queryFn: () => PlayerProfile.list(),
  });

  // Extract classes belonging exclusively to the targeted school
  const uniqueClasses = [...new Set(
    profiles
      .filter(p => p.school === currentSchool)
      .map(p => p.class || p.class_name)
      .filter(Boolean)
  )];

  const handleClassSelect = (className) => {
    localStorage.setItem("filter_selected_class", className);
    window.location.href = "/SelectStudent";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 pt-10">
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <button onClick={() => window.location.href = "/SelectSchool"} className="text-xs font-bold flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Schools
        </button>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Select Your Class</h2>
          <p className="text-sm text-muted-foreground">Showing classes inside: <span className="text-primary font-black">{currentSchool}</span></p>
        </div>

        {isLoading ? (
          <div className="text-center py-12 font-bold text-muted-foreground animate-pulse">Filtering rooms...</div>
        ) : uniqueClasses.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-2xl text-muted-foreground font-bold">No classrooms found linked to this location.</div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {uniqueClasses.map((cls, i) => (
              <motion.button
                key={cls}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handleClassSelect(cls)}
                className="w-full p-4 rounded-xl border-2 border-border bg-card hover:border-primary font-bold text-sm text-left flex items-center gap-3 transition-colors"
              >
                <ClipboardList className="w-4 h-4 text-primary" />
                <span>Class {cls}</span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}