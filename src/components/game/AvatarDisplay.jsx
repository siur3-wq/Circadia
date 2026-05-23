import React from "react";
import { ACCESSORIES } from "./ChallengeData";

// Avatar is built as stacked layers inside a circular frame
const EFFECT_STYLES = {
  acc_fire:      "bg-gradient-to-br from-orange-400 via-red-400 to-yellow-300",
  acc_rainbow:   "bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400",
  acc_lightning: "bg-gradient-to-br from-yellow-300 via-cyan-300 to-blue-400",
};

const BADGE_POSITIONS = {
  sm:  "bottom-0 right-0 text-xs w-4 h-4",
  md:  "bottom-0 right-0 text-sm w-5 h-5",
  lg:  "-bottom-1 -right-1 text-base w-7 h-7",
  xl:  "-bottom-1 -right-1 text-xl w-9 h-9",
};

const SIZE = {
  sm: { outer: "w-10 h-10", face: "text-lg",   hat: "text-base -top-3",   faceAcc: "text-xs",  feet: "text-xs -bottom-2",  back: "text-base -right-3" },
  md: { outer: "w-16 h-16", face: "text-3xl",  hat: "text-xl  -top-4",   faceAcc: "text-sm",  feet: "text-sm -bottom-3",  back: "text-xl  -right-4" },
  lg: { outer: "w-24 h-24", face: "text-5xl",  hat: "text-3xl -top-6",   faceAcc: "text-xl",  feet: "text-xl -bottom-4",  back: "text-3xl -right-6" },
  xl: { outer: "w-32 h-32", face: "text-6xl",  hat: "text-4xl -top-7",   faceAcc: "text-2xl", feet: "text-2xl -bottom-5", back: "text-4xl -right-7" },
};

export default function AvatarDisplay({ profile, size = "md" }) {
  const s = SIZE[size] || SIZE.md;

  const equipped = (profile?.equipped_accessories || [])
    .map(id => ACCESSORIES.find(a => a.id === id))
    .filter(Boolean);

  const headAcc   = equipped.find(a => a.category === "head");
  const faceAcc   = equipped.find(a => a.category === "face");
  const backAcc   = equipped.find(a => a.category === "back");
  const badgeAcc  = equipped.find(a => a.category === "badge");
  const effectAcc = equipped.find(a => a.category === "effect");
  const feetAcc   = equipped.find(a => a.category === "feet");

  const effectStyle = effectAcc ? EFFECT_STYLES[effectAcc.id] : null;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ margin: "12px" }}>
      {/* Outer glow / effect ring */}
      {effectAcc && (
        <div className={`absolute inset-0 rounded-full ${effectStyle} opacity-60 animate-pulse`}
          style={{ margin: "-5px" }} />
      )}

      {/* Back accessory (cape / wings) – sits behind avatar */}
      {backAcc && (
        <span className={`absolute ${s.back} top-1/2 -translate-y-1/2 z-0 select-none pointer-events-none`}
          style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))" }}>
          {backAcc.emoji}
        </span>
      )}

      {/* Main circle */}
      <div className={`${s.outer} rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 flex items-center justify-center relative z-10 overflow-visible`}>
        {/* Face emoji */}
        <span className={`${s.face} select-none`}>{profile?.avatar_emoji || "😊"}</span>

        {/* Face accessory overlay (sunglasses / mask) */}
        {faceAcc && (
          <span className={`absolute inset-0 flex items-center justify-center ${s.faceAcc} pointer-events-none`}
            style={{ paddingTop: "30%" }}>
            {faceAcc.emoji}
          </span>
        )}
      </div>

      {/* Hat – floats above */}
      {headAcc && (
        <span className={`absolute left-1/2 -translate-x-1/2 ${s.hat} z-20 select-none pointer-events-none`}
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}>
          {headAcc.emoji}
        </span>
      )}

      {/* Feet accessory – below circle */}
      {feetAcc && (
        <span className={`absolute left-1/2 -translate-x-1/2 ${s.feet} z-20 select-none pointer-events-none`}
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>
          {feetAcc.emoji}
        </span>
      )}

      {/* Badge – bottom-right corner */}
      {badgeAcc && (
        <span className={`absolute ${BADGE_POSITIONS[size]} z-20 flex items-center justify-center bg-card rounded-full border border-border select-none pointer-events-none`}>
          {badgeAcc.emoji}
        </span>
      )}
    </div>
  );
}