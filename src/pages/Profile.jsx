import React, { useState, useEffect } from "react";
import { PlayerProfile, ChallengeCompletion } from "@/lib/db";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AvatarDisplay from "../components/game/AvatarDisplay";
import XPBar from "../components/game/XPBar";
import ProfileBanner from "../components/game/ProfileBanner";
import StatsPanel from "../components/game/StatsPanel";
import { TITLES, getActiveTitles } from "../components/game/TitleData";
import { getSelectedProfileId } from "../lib/selectedProfile";

export default function Profile() {
  const profileId = getSelectedProfileId();
  const queryClient = useQueryClient();

  // 1. Fetch User Profile Data
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["myProfile", profileId],
    queryFn: async () => {
      if (!profileId) return null;
      const parsedId = isNaN(Number(profileId)) ? profileId : Number(profileId);
      const output = await PlayerProfile.filter({ id: parsedId });
      if (Array.isArray(output) && output.length > 0 && output[0] !== null) return output[0];
      const totalList = await PlayerProfile.list();
      return totalList.length > 0 ? totalList[0] : null;
    },
    enabled: !!profileId,
  });

  // 2. Fetch Completion Log History
  const userEmail = profile?.user_email || profile?.email;
  const { data: completions = [], isLoading: isCompletionsLoading } = useQuery({
    queryKey: ["myCompletions", userEmail],
    queryFn: async () => {
      if (!userEmail) return [];
      const logs = await ChallengeCompletion.filter({ user_email: userEmail });
      return Array.isArray(logs) ? logs : [];
    },
    enabled: !!userEmail,
  });

  // 3. Local State Override System
  const [localEquipped, setLocalEquipped] = useState([]);

  useEffect(() => {
    if (profile) {
      const storageKey = `equipped_titles_${profile.id || "default"}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        try {
          setLocalEquipped(JSON.parse(saved));
        } catch (e) {
          setLocalEquipped([]);
        }
      } else {
        // Fallback to parsing the clean, valid database singular string column
        const dbString = profile.equipped_title_id;
        if (typeof dbString === "string" && dbString) {
          const splitTitles = dbString.split(",").map(s => s.trim()).filter(Boolean);
          setLocalEquipped(splitTitles);
        } else {
          setLocalEquipped([]);
        }
      }
    }
  }, [profile]);

  // 4. Update Mutation pointing EXCLUSIVELY to your real database column
  const updateTitlesMutation = useMutation({
    mutationFn: async (updatedIdsArray) => {
      if (!profile?.id) return;

      // Force UI retention across local storage
      const storageKey = `equipped_titles_${profile.id}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedIdsArray));

      // Serialize into a flat string format to safely fit inside equipped_title_id
      const flatStringPayload = updatedIdsArray.join(",");
      
      // We ONLY write to the verified column to get rid of the Supabase 400 bad request errors
      return await PlayerProfile.update(profile.id, {
        equipped_title_id: flatStringPayload
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile", profileId] });
    },
  });

  const isLoading = isProfileLoading || isCompletionsLoading;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">跑</div>
      </div>
    );
  }

  if (!profile) return null;

  // Map local state list into header badge ribbon components
  const safeProfile = { ...profile, equipped_title_ids: localEquipped };
  const currentEquippedTitles = getActiveTitles(safeProfile);

  const handleToggleTitle = (titleId) => {
    const isEquipped = localEquipped.includes(titleId);
    const updatedList = isEquipped
      ? localEquipped.filter((id) => id !== titleId)
      : [...localEquipped, titleId];
      
    // Set state immediately to avoid layout flickers
    setLocalEquipped(updatedList);
    updateTitlesMutation.mutate(updatedList);
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-4">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <ProfileBanner bannerId={profile.banner_id} size="md" />
        </motion.div>

        <div className="flex items-center gap-4 bg-card border-2 border-border rounded-2xl p-4">
          <AvatarDisplay profile={profile} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-black text-lg text-foreground truncate">{profile.display_name}</p>
            
            <div className="flex flex-wrap gap-1 mt-1 mb-2">
              {currentEquippedTitles.length > 0 ? (
                currentEquippedTitles.map((t) => (
                  <span key={t.id} className={`text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm ${t.bg} ${t.color}`}>
                    {t.label}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground italic">No titles active</span>
              )}
            </div>
            
            <XPBar xp={profile.total_xp || 0} level={profile.level || 1} />
          </div>
        </div>

        <Tabs defaultValue="stats">
          <TabsList className="w-full grid grid-cols-2 bg-muted rounded-2xl p-1 h-auto">
            <TabsTrigger value="stats" className="rounded-xl py-2.5 text-xs font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm">
              📊 Stats
            </TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-xl py-2.5 text-xs font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm">
              🏅 Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-4">
            <StatsPanel profile={profile} completions={completions} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <div className="bg-card border-2 border-border rounded-2xl p-4 space-y-3">
              <div>
                <h3 className="font-black text-sm text-foreground">Fitness Achievements</h3>
                <p className="text-xs text-muted-foreground">Tap an unlocked card to toggle equip visibility status.</p>
              </div>
              
              {/* UNIFIED INTERACTIVE SCROLLBAR BLENDING CONTAINER 
                Added Webkit, MS, and Firefox arbitrary inline variants to blend out the native scroll bar line 
                while perfectly supporting vertical touch drags and trackpad scrolls inside the achievement view panel.
              */}
              <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {TITLES.map((title) => {
                  const isUnlocked = title.condition(profile);
                  const isEquipped = localEquipped.includes(title.id);

                  return (
                    <button
                      key={title.id}
                      disabled={!isUnlocked}
                      type="button"
                      onClick={() => handleToggleTitle(title.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1.5 relative select-none ${
                        isEquipped
                          ? "bg-accent/20 border-primary ring-1 ring-primary/20 shadow-md"
                          : isUnlocked
                          ? "bg-zinc-800/30 border-zinc-700/60 hover:bg-zinc-800/60 active:scale-[0.99]"
                          : "bg-zinc-950/40 border-zinc-900/60 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`font-black text-xs px-2 py-0.5 rounded ${title.bg} ${title.color}`}>
                          {title.label}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          {isEquipped && (
                            <span className="text-[10px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                              Active
                            </span>
                          )}
                          <span className={isUnlocked ? "text-emerald-500" : "text-muted-foreground"}>
                            {isUnlocked ? "✅ Unlocked" : "🔒 Locked"}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Target Requirement: {title.hint}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}