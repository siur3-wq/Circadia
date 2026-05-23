import React, { useState } from "react";
import { PlayerProfile } from "@/lib/db";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ShoppingBag, Lock, Check } from "lucide-react";
import { SHOP_BANNERS, SHOP_TITLES } from "../components/game/ShopData";
import BannerPattern from "../components/game/BannerPattern";
import { getSelectedProfileId } from "../lib/selectedProfile";

function CoinBadge({ coins }) {
  return (
    <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-full shadow-inner">
      <span className="text-lg">🪙</span>
      <span className="font-black text-amber-400 text-sm tracking-tight">{coins} Gold</span>
    </div>
  );
}

function BannerCard({ item, owned, selected, onBuy, onEquip, coins }) {
  const canAfford = coins >= item.price;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${
        selected ? "border-primary bg-primary/5" : owned ? "border-green-500/40" : "border-border"
      }`}
    >
      <div className={`relative h-24 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
        <BannerPattern pattern={item.pattern} opacity={0.15} />
        <div className="absolute inset-0 bg-black/20" />
        <span className="relative z-10 text-3xl filter drop-shadow-md">{item.emoji}</span>
        {selected && (
          <div className="absolute top-2 right-2 bg-primary rounded-full p-1 shadow-md">
            <Check className="w-3 h-3 text-white stroke-[4]" />
          </div>
        )}
      </div>

      <div className="p-3 bg-card space-y-1">
        <p className="font-black text-sm text-foreground tracking-tight">{item.name}</p>
        <p className="text-[10px] text-muted-foreground leading-snug min-h-[30px]">{item.description}</p>
        {owned ? (
          <button
            onClick={onEquip}
            className={`w-full py-1.5 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95 ${
              selected
                ? "bg-primary/20 text-primary border-2 border-primary/40 cursor-default"
                : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
            }`}
          >
            {selected ? "Equipped ✓" : "Wear Banner"}
          </button>
        ) : (
          <button
            onClick={onBuy}
            disabled={!canAfford}
            className={`w-full py-1.5 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all shadow-sm active:scale-95 ${
              canAfford
                ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40"
                : "bg-muted/50 text-muted-foreground/40 cursor-not-allowed border border-border/30"
            }`}
          >
            <span>🪙 {item.price}</span>
            {!canAfford && <Lock className="w-3 h-3 ml-0.5 opacity-60" />}
          </button>
        )}
      </div>
    </motion.div>
  );
}

function TitleCard({ item, owned, equipped, onBuy, onEquip, coins }) {
  const canAfford = coins >= item.price;
  const displayName = item.label || item.name || "Epic Title";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className={`rounded-2xl border-2 p-4 transition-all shadow-sm ${
        equipped ? "border-primary bg-primary/5" : owned ? "border-green-500/30 bg-card" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className={`px-3 py-1 rounded-xl text-xs font-black shadow-sm tracking-wide ${item.bg || "bg-primary"} ${item.color || "text-white"}`}>
          {displayName}
        </span>
        {equipped && (
          <span className="text-[10px] font-black text-primary uppercase tracking-wider ml-auto flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-md">
            <Check className="w-3 h-3 stroke-[4]" /> Active
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
      
      {owned ? (
        <button
          onClick={onEquip}
          className={`w-full py-2 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95 ${
            equipped
              ? "bg-primary/20 text-primary border-2 border-primary/40 cursor-default"
              : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
          }`}
        >
          {equipped ? "Equipped ✓" : "Activate Title"}
        </button>
      ) : (
        <button
          onClick={onBuy}
          disabled={!canAfford}
          className={`w-full py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all shadow-sm active:scale-95 ${
            canAfford
              ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40"
              : "bg-muted/50 text-muted-foreground/40 cursor-not-allowed border border-border/30"
          }`}
        >
          <span>🪙 {item.price} Gold</span>
          {!canAfford && <Lock className="w-3 h-3 ml-0.5 opacity-60" />}
        </button>
      )}
    </motion.div>
  );
}

export default function Shop() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("banners");

  const rawProfileId = getSelectedProfileId();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["myProfile", rawProfileId],
    queryFn: async () => {
      if (!rawProfileId) return null;
      const parsedId = isNaN(Number(rawProfileId)) ? rawProfileId : Number(rawProfileId);
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
    enabled: !!rawProfileId,
  });

  const coins = profile ? Number(profile.coins || 0) : 0;

  // Safely normalizes text array lists returned from Supabase
  const safeGetOwnedSet = (fieldData) => {
    if (!fieldData) return new Set();
    if (Array.isArray(fieldData)) return new Set(fieldData.map(id => String(id)));
    try {
      const parsed = JSON.parse(fieldData);
      return new Set(Array.isArray(parsed) ? parsed.map(id => String(id)) : []);
    } catch (e) {
      return new Set([String(fieldData)]);
    }
  };

  const ownedBanners = safeGetOwnedSet(profile?.owned_banners);
  const ownedTitles = safeGetOwnedSet(profile?.owned_titles);
  
  const equippedBanner = profile?.banner_id ? String(profile.banner_id) : "banner_default";
  const equippedTitle = profile?.equipped_title_id ? String(profile.equipped_title_id) : "";

  // Always treats current selections as unlocked items
  if (equippedBanner && equippedBanner !== "banner_default") ownedBanners.add(equippedBanner);
  if (equippedTitle) ownedTitles.add(equippedTitle);

  const buyMutation = useMutation({
    mutationFn: async ({ type, item }) => {
      if (!profile || !profile.id) throw new Error("No valid database hero record discovered!");
      if (coins < item.price) throw new Error("You don't have enough gold coins!");

      const cleanPayload = {
        coins: Number(coins - item.price)
      };

      if (type === "banner") {
        const currentList = Array.isArray(profile.owned_banners) ? profile.owned_banners : [];
        cleanPayload.owned_banners = [...new Set([...currentList, String(item.id)])];
        cleanPayload.banner_id = String(item.id);
      } else {
        const currentList = Array.isArray(profile.owned_titles) ? profile.owned_titles : [];
        cleanPayload.owned_titles = [...new Set([...currentList, String(item.id)])];
        cleanPayload.equipped_title_id = String(item.id);
      }

      const databaseId = isNaN(Number(profile.id)) ? profile.id : Number(profile.id);
      await PlayerProfile.update(databaseId, cleanPayload);
      return { type, item };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      const finalName = data.item.name || data.item.label || "Cosmetic Item";
      toast.success(`Purchased "${finalName}"! 🎉`);
    },
    onError: (err) => {
      console.error("Purchase error detail:", err);
      toast.error(err.message || "Shop purchase failed.");
    },
  });

  const equipMutation = useMutation({
    mutationFn: async ({ type, id }) => {
      if (!profile || !profile.id) throw new Error("No active profile loaded!");
      
      const cleanPayload = type === "banner" 
        ? { banner_id: String(id) } 
        : { equipped_title_id: String(id) };

      const databaseId = isNaN(Number(profile.id)) ? profile.id : Number(profile.id);
      await PlayerProfile.update(databaseId, cleanPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      toast.success("Gear Equipped Successfully! ✨");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to swap gear pieces.");
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-4xl animate-bounce">🛒</div>
        <p className="text-xs font-black text-muted-foreground mt-2 tracking-widest uppercase">Opening Shop...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center bg-background">
        <div className="bg-card border-2 border-border p-8 rounded-3xl max-w-sm shadow-md space-y-4">
          <div className="text-5xl">🎒</div>
          <h2 className="font-black text-lg text-foreground tracking-tight">Active Profile Needed</h2>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Please make sure you have generated or switched to an active adventurer profile before loading the inventory store ledger!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">Avatar Loot Shop</h1>
          </div>
          <CoinBadge coins={coins} />
        </div>

        <div className="flex gap-2 bg-muted rounded-2xl p-1 border border-border/40">
          {[
            { id: "banners", label: "🖼️ Card Banners" },
            { id: "titles", label: "🏷️ Title Badges" }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all active:scale-[0.99] ${
                tab === t.id 
                  ? "bg-card text-foreground shadow-sm border border-border/50" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="pt-1">
          {tab === "banners" && (
            <div className="grid grid-cols-2 gap-3">
              {SHOP_BANNERS.map(item => (
                <BannerCard
                  key={String(item.id)}
                  item={item}
                  owned={ownedBanners.has(String(item.id))}
                  selected={equippedBanner === String(item.id)}
                  coins={coins}
                  onBuy={() => buyMutation.mutate({ type: "banner", item })}
                  onEquip={() => equipMutation.mutate({ type: "banner", id: item.id })}
                />
              ))}
            </div>
          )}

          {tab === "titles" && (
            <div className="grid grid-cols-1 gap-3">
              {SHOP_TITLES.map(item => (
                <TitleCard
                  key={String(item.id)}
                  item={item}
                  owned={ownedTitles.has(String(item.id))}
                  equipped={equippedTitle === String(item.id)}
                  coins={coins}
                  onBuy={() => buyMutation.mutate({ type: "title", item })}
                  onEquip={() => equipMutation.mutate({ type: "title", id: item.id })}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}