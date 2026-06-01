import React from "react";
import { TITLES } from "./TitleData";

export default function TitlePicker({ profile, onUpdateTitles }) {
  if (!profile) return null;

  const currentEquipped = profile.equipped_title_ids || [];

  const categories = [
    { name: "🏆 Milestones & Progression", ids: ["title_newcomer", "title_superstar", "title_shredded", "title_legend"] },
    { name: "🔥 Streak & Consistency", ids: ["title_on_fire", "title_week_warrior", "title_unstoppable", "title_gym_rat", "title_eternal", "title_streak_master"] },
    { name: "🏋️‍♂️ Strength & Power", ids: ["title_iron_addict", "title_barbell_boss", "title_heavy_lifter", "title_plate_masher", "title_powerlifter"] },
    { name: "🏃‍♂️ Cardio & Endurance", ids: ["title_pavement_pounder", "title_cardio_king", "title_marathoner", "title_endurance_god"] },
    { name: "⚡ HIIT & Conditioning", ids: ["title_hiit_engine", "title_metcon", "title_oxygen_thief"] },
  ];

  const handleToggleTitle = (titleId) => {
    let updatedList;
    if (currentEquipped.includes(titleId)) {
      updatedList = currentEquipped.filter(id => id !== titleId);
    } else {
      updatedList = [...currentEquipped, titleId];
    }
    onUpdateTitles(updatedList);
  };

  return (
    <div className="bg-card border-2 border-border rounded-2xl p-4 w-full space-y-4">
      <div>
        <h3 className="font-black text-sm text-foreground">Equip Your Achievements</h3>
        <p className="text-xs text-muted-foreground">Select multiple unlocked badges to showcase simultaneously.</p>
      </div>

      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-1.5">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground px-1">
              {cat.name}
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {cat.ids.map((id) => {
                const title = TITLES.find((t) => t.id === id);
                if (!title) return null;

                const isUnlocked = title.condition(profile);
                const isEquipped = currentEquipped.includes(title.id);

                return (
                  <button
                    key={title.id}
                    disabled={!isUnlocked}
                    type="button"
                    onClick={() => handleToggleTitle(title.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                      isEquipped
                        ? "bg-accent/40 border-primary"
                        : isUnlocked
                        ? "bg-zinc-800/30 border-zinc-700/50 hover:bg-zinc-800/60"
                        : "bg-zinc-950/20 border-zinc-900/40 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 w-full">
                      <div className="flex items-center justify-between w-full">
                        <span className={`font-bold px-1.5 py-0.5 rounded text-xs ${title.bg} ${title.color}`}>
                          {title.label}
                        </span>
                        {isEquipped && (
                          <span className="text-[10px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                            Equipped
                          </span>
                        )}
                      </div>
                      {/* Requirements display remains completely persistent here */}
                      <span className="text-[11px] text-muted-foreground pl-0.5 mt-1">
                        📋 Requirement: {title.hint}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}