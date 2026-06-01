import React from "react";

import { PlayerProfile } from "@/lib/db";

import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";

import { setSelectedProfileId } from "@/lib/selectedProfile";

import { ArrowLeft } from "lucide-react";

import AvatarDisplay from "../components/game/AvatarDisplay";

import { getBannerById } from "../components/game/BannerUtils";

import BannerPattern from "../components/game/BannerPattern";

import PlayerTitle from "../components/game/PlayerTitle";



export default function SelectStudent() {

  const currentSchool = localStorage.getItem("filter_selected_school");

  const currentClass = localStorage.getItem("filter_selected_class");



  const { data: profiles = [], isLoading } = useQuery({

    queryKey: ["allProfilesForFinalRoster"],

    queryFn: () => PlayerProfile.list(),

  });



  // Keep student entries that match both filter requirements

  const finalRoster = profiles.filter(p => {

    const matchesSchool = p.school === currentSchool;

    const matchesClass = p.class === currentClass || p.class_name === currentClass;

    // Exclude database administrators from student selection listings

    return matchesSchool && matchesClass && !p.is_admin && p.role !== "admin";

  });



  const handleSelect = (profile) => {

    setSelectedProfileId(profile.id);

   

    // Cleanup navigation filters out of memory cache completely

    localStorage.removeItem("filter_selected_school");

    localStorage.removeItem("filter_selected_class");

   

    window.location.href = "/Home";

  };



  return (

    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 pt-10 pb-10">

      <div className="w-full max-w-md flex items-center justify-between mb-6">

        <button onClick={() => window.location.href = "/SelectClass"} className="text-xs font-bold flex items-center gap-1 text-muted-foreground hover:text-foreground">

          <ArrowLeft className="w-4 h-4" /> Back to Classes

        </button>

      </div>



      <div className="w-full max-w-md space-y-4 mb-6">

        <div>

          <h2 className="text-2xl font-black text-foreground tracking-tight">Pick Your Profile</h2>

          <p className="text-sm text-muted-foreground">Class {currentClass} • {currentSchool}</p>

        </div>

      </div>



      {isLoading && (

        <div className="text-4xl animate-bounce mt-16 text-primary">⚡</div>

      )}



      {!isLoading && finalRoster.length === 0 && (

        <div className="text-center mt-10 space-y-3">

          <div className="text-5xl">🏃‍♂️</div>

          <p className="font-black text-foreground text-lg">No student profiles built here!</p>

        </div>

      )}



      {/* Your exact original card layout grid pattern */}

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">

        {finalRoster.map((profile, i) => {

          const banner = getBannerById(profile.banner_id);

          return (

            <motion.button

              key={profile.id}

              initial={{ scale: 0.9, opacity: 0 }}

              animate={{ scale: 1, opacity: 1 }}

              transition={{ delay: i * 0.05 }}

              onClick={() => handleSelect(profile)}

              className="relative rounded-2xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all text-left"

            >

              {/* Original Banner Background */}

              <div className={`relative h-20 bg-gradient-to-br ${banner.gradient} flex items-center justify-center`}>

                <BannerPattern pattern={banner.pattern} opacity={0.15} />

                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10">

                  <AvatarDisplay profile={profile} size="md" />

                </div>

              </div>

             

              {/* Original Metadata Text Block Info layout */}

              <div className="bg-card p-3">

                <p className="font-black text-foreground text-sm truncate">{profile.display_name}</p>

                <div className="mt-0.5">

                  <PlayerTitle profile={profile} />

                </div>

                <div className="flex items-center gap-1 mt-1">

                  <span className="text-xs text-xp font-bold">⚡ {profile.total_xp || 0} XP</span>

                  <span className="text-xs text-muted-foreground">· Lv.{profile.level || 1}</span>

                </div>

              </div>

            </motion.button>

          );

        })}

      </div>

    </div>

  );

} 

