import React from "react";
import { BANNERS, getUnlockedBanners } from "./BannerData";
import { SHOP_BANNERS } from "./ShopData";
import { Lock } from "lucide-react";

export default function BannerPicker({ totalXP, selectedBannerId, ownedBanners = [], onSelect }) {
  const unlockedXP = new Set(getUnlockedBanners(totalXP).map(b => b.id));
  const ownedShop = new Set(ownedBanners.map(id => String(id)));

  const ownedShopItems = SHOP_BANNERS.filter(b => ownedShop.has(String(b.id)));

  return (
    <div className="space-y-4">
      {/* XP Banners */}
      <div>
        <p className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-2">XP Banners</p>
        <div className="grid grid-cols-3 gap-2">
          {BANNERS.map(banner => {
            const isUnlocked = unlockedXP.has(banner.id);
            const isSelected = selectedBannerId === banner.id;
            return (
              <button
                key={banner.id}
                onClick={() => isUnlocked && onSelect(banner.id)}
                disabled={!isUnlocked}
                className={`relative rounded-xl overflow-hidden h-16 transition-all ${
                  isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105" : ""
                } ${!isUnlocked ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${banner.gradient} flex flex-col items-center justify-center gap-0.5`}>
                  <span className="text-xl">{banner.emoji}</span>
                  <span className="text-white text-[9px] font-black leading-tight px-1 text-center">{banner.name}</span>
                </div>
                {!isUnlocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                    <Lock className="w-4 h-4 text-white/80" />
                    <span className="text-white/70 text-[9px] font-bold mt-0.5">{banner.unlockXP} XP</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shop Banners */}
      {ownedShopItems.length > 0 && (
        <div>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-2">🛒 Shop Banners</p>
          <div className="grid grid-cols-3 gap-2">
            {ownedShopItems.map(banner => {
              const isSelected = selectedBannerId === banner.id;
              return (
                <button
                  key={banner.id}
                  onClick={() => onSelect(banner.id)}
                  className={`relative rounded-xl overflow-hidden h-16 transition-all hover:scale-105 ${
                    isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105" : ""
                  }`}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${banner.gradient} flex flex-col items-center justify-center gap-0.5`}>
                    <span className="text-xl">{banner.emoji}</span>
                    <span className="text-white text-[9px] font-black leading-tight px-1 text-center">{banner.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}