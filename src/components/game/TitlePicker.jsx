import React from "react";
import { TITLES, getUnlockedTitles } from "./TitleData";
import { SHOP_TITLES } from "./ShopData";

export default function TitlePicker({ profile, onSelect }) {
  const unlocked = new Set(getUnlockedTitles(profile).map(t => t.id));
  const ownedShop = new Set(profile?.owned_titles || []);
  const equipped = profile?.equipped_title_id || "";

  // All available titles: earned + shop-owned
  const allAvailable = [
    ...TITLES.map(t => ({ ...t, isShop: false, isUnlocked: unlocked.has(t.id) })),
    ...SHOP_TITLES.map(t => ({ ...t, isShop: true, isUnlocked: ownedShop.has(t.id) })),
  ];

  return (
    <div>
      <p className="text-sm font-black text-foreground mb-3">Choose Your Title</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect("")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
            equipped === ""
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-muted text-muted-foreground"
          }`}
        >
          None
        </button>

        {allAvailable.map(title => {
          const isEquipped = equipped === title.id;
          return (
            <button
              key={title.id}
              onClick={() => title.isUnlocked && onSelect(title.id)}
              disabled={!title.isUnlocked}
              title={title.isUnlocked ? `Equip "${title.label}"` : title.isShop ? "🛒 Buy in Shop" : `🔒 ${title.hint}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 transition-all ${
                !title.isUnlocked
                  ? "border-border/30 bg-muted/30 text-muted-foreground/40 cursor-not-allowed"
                  : isEquipped
                  ? `border-primary ${title.bg} ${title.color} scale-105 shadow-md`
                  : `border-border ${title.bg} ${title.color} hover:scale-105`
              }`}
            >
              {title.isUnlocked ? title.label : title.isShop ? "🛒" : "🔒"}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground mt-2">Locked shop titles can be purchased in the Shop tab.</p>
    </div>
  );
}