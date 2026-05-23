import React from "react";
import { PlayerProfile, ChallengeCompletion } from "@/lib/db"; // Added completion ledger mapping
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AvatarDisplay from "../components/game/AvatarDisplay";
import XPBar from "../components/game/XPBar";
import ProfileBanner from "../components/game/ProfileBanner";
import PlayerTitle from "../components/game/PlayerTitle";
import AchievementBadges from "../components/game/AchievementBadges";
import StatsPanel from "../components/game/StatsPanel";
import { getSelectedProfileId } from "../lib/selectedProfile";

export default function Profile() {
  const profileId = getSelectedProfileId();

  // 1. Fetch User Profile Row Data Safely
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["myProfile", profileId],
    queryFn: async () => {
      if (!profileId) return null;
      
      const parsedId = isNaN(Number(profileId)) ? profileId : Number(profileId);
      const output = await PlayerProfile.filter({ id: parsedId });
      
      if (Array.isArray(output) && output.length > 0 && output[0] !== null) {
        return output[0];
      }
      
      const totalList = await PlayerProfile.list();
      if (Array.isArray(totalList) && totalList.length > 0) {
        return totalList[0];
      }
      return null;
    },
    enabled: !!profileId,
  });

  // 2. Fetch Completion Log History Linked by User Email
  const userEmail = profile?.user_email || profile?.email;
  const { data: completions = [], isLoading: isCompletionsLoading } = useQuery({
    queryKey: ["myCompletions", userEmail],
    queryFn: async () => {
      if (!userEmail) return [];
      // Pull historical records matching this user's profile account email identity
      const logs = await ChallengeCompletion.filter({ user_email: userEmail });
      return Array.isArray(logs) ? logs : [];
    },
    enabled: !!userEmail,
  });

  const isLoading = isProfileLoading || isCompletionsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🏃‍♂️</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-5xl mb-3">👋</div>
          <p className="font-black text-lg text-foreground mb-2">No profile selected</p>
          <a href="/SelectProfile" className="text-primary font-bold underline">
            Pick a profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-4">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <ProfileBanner bannerId={profile.banner_id} size="md" />
        </motion.div>

        <div className="flex items-center gap-4 bg-card border-2 border-border rounded-2xl p-4">
          <AvatarDisplay profile={profile} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-black text-lg text-foreground truncate">
              {profile.display_name}
            </p>
            <div className="flex items-center gap-2 mt-0.5 mb-1">
              <PlayerTitle profile={profile} />
            </div>
            <XPBar xp={profile.total_xp || 0} level={profile.level || 1} />
          </div>
        </div>

        <Tabs defaultValue="stats">
          <TabsList className="w-full grid grid-cols-2 bg-muted rounded-2xl p-1 h-auto">
            <TabsTrigger
              value="stats"
              className="rounded-xl py-2.5 text-xs font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              📊 Stats
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="rounded-xl py-2.5 text-xs font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              🏅 Awards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-4">
            {/* We now safely pass both the baseline profile and the loaded completion arrays */}
            <StatsPanel profile={profile} completions={completions} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <AchievementBadges profile={profile} completions={completions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}