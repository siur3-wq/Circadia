import React from "react";
import { motion } from "framer-motion";

// Zap — the FitQuest lightning-bolt fox mascot, drawn with inline SVG
export default function Mascot({ size = 80, mood = "happy", animate = true, className = "" }) {
  const moods = {
    happy:   { eyeL: "M18,26 Q20,22 22,26", eyeR: "M30,26 Q32,22 34,26", mouth: "M22,34 Q26,39 30,34" },
    excited: { eyeL: "M17,25 Q20,20 23,25", eyeR: "M29,25 Q32,20 35,25", mouth: "M20,34 Q26,41 32,34" },
    thinking:{ eyeL: "M18,27 Q20,24 22,27", eyeR: "M30,25 Q32,22 34,25", mouth: "M22,35 Q26,37 30,35" },
    celebrate:{ eyeL: "M17,24 Q20,19 23,24", eyeR: "M29,24 Q32,19 35,24", mouth: "M19,33 Q26,42 33,33" },
  };
  const m = moods[mood] || moods.happy;

  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={animate ? { y: [0, -6, 0] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {/* Glow */}
        <ellipse cx="26" cy="56" rx="14" ry="4" fill="#7c3aed" opacity="0.35" />

        {/* Body */}
        <ellipse cx="26" cy="42" rx="13" ry="12" fill="#1e1b4b" />

        {/* Lightning bolt chest emblem */}
        <polygon points="27,33 23,41 26,41 25,49 30,40 27,40" fill="#a855f7" opacity="0.9" />

        {/* Head */}
        <circle cx="26" cy="26" r="16" fill="#1e1b4b" />

        {/* Ear left */}
        <polygon points="10,16 8,4 18,12" fill="#1e1b4b" />
        <polygon points="11,15 9,6 17,12" fill="#7c3aed" />

        {/* Ear right */}
        <polygon points="42,16 44,4 34,12" fill="#1e1b4b" />
        <polygon points="41,15 43,6 35,12" fill="#7c3aed" />

        {/* Face base glow */}
        <circle cx="26" cy="26" r="13" fill="#2e2569" />

        {/* Eye whites */}
        <ellipse cx="20" cy="26" rx="4.5" ry="5" fill="white" />
        <ellipse cx="32" cy="26" rx="4.5" ry="5" fill="white" />

        {/* Pupils */}
        <circle cx="20" cy="27" r="2.5" fill="#1e1b4b" />
        <circle cx="32" cy="27" r="2.5" fill="#1e1b4b" />

        {/* Eye shine */}
        <circle cx="21" cy="26" r="1" fill="white" />
        <circle cx="33" cy="26" r="1" fill="white" />

        {/* Nose */}
        <ellipse cx="26" cy="31" rx="2" ry="1.2" fill="#a855f7" />

        {/* Mouth */}
        <path d={m.mouth} stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Cheek blush */}
        <ellipse cx="16" cy="30" rx="3" ry="2" fill="#c084fc" opacity="0.3" />
        <ellipse cx="36" cy="30" rx="3" ry="2" fill="#c084fc" opacity="0.3" />

        {/* Arms */}
        <ellipse cx="13" cy="43" rx="4" ry="7" fill="#1e1b4b" transform="rotate(-20 13 43)" />
        <ellipse cx="39" cy="43" rx="4" ry="7" fill="#1e1b4b" transform="rotate(20 39 43)" />

        {/* Tail */}
        <path d="M37,50 Q48,48 46,42 Q44,36 38,38" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="46" cy="42" r="3" fill="#c084fc" />

        {/* Sparkle left ear */}
        <circle cx="9" cy="5" r="1.5" fill="#f0abfc" opacity="0.8" />
        <circle cx="43" cy="5" r="1.5" fill="#f0abfc" opacity="0.8" />
      </svg>
    </motion.div>
  );
}