// Shop items — purchased with gold coins, completely separate from standard level-based XP rewards
export const SHOP_BANNERS = [
  { 
    id: "shop_banner_inferno",  
    name: "Inferno",       
    gradient: "from-rose-500 via-orange-600 to-yellow-500",   
    emoji: "🌺", 
    price: 150, 
    pattern: "cracks",    
    description: "Blazing hot energy radiating heat waves." 
  },
  { 
    id: "shop_banner_midnight", 
    name: "Midnight",      
    gradient: "from-slate-900 via-indigo-900 to-violet-900",  
    emoji: "🌙", 
    price: 200, 
    pattern: "stars",     
    description: "Silent, stealthy shadows under moonbeams." 
  },
  { 
    id: "shop_banner_venom",    
    name: "Venom",         
    gradient: "from-lime-500 via-green-600 to-emerald-800",   
    emoji: "🐍", 
    price: 250, 
    pattern: "zigzag",    
    description: "Highly poisonous swift strike aesthetics." 
  },
  { 
    id: "shop_banner_titan",    
    name: "Titan",         
    gradient: "from-stone-600 via-gray-700 to-zinc-900",      
    emoji: "🗿", 
    price: 300, 
    pattern: "crosshatch", 
    description: "Immovable rock fortress foundational plates." 
  },
  { 
    id: "shop_banner_prism",    
    name: "Prism",         
    gradient: "from-pink-400 via-violet-500 to-cyan-400",     
    emoji: "💎", 
    price: 400, 
    pattern: "diamonds",  
    description: "Pure multi-chromatic light crystal refractors." 
  },
  { 
    id: "shop_banner_cosmic",   
    name: "Cosmic",        
    gradient: "from-fuchsia-600 via-purple-700 to-indigo-900",
    emoji: "✨", 
    price: 500, 
    pattern: "aurora",   
    description: "Ethereal interstellar fields reaching beyond dimensions." 
  },
  { 
    id: "shop_banner_cyberpunk", 
    name: "Cyber Grid", 
    gradient: "from-slate-950 via-purple-900 to-cyan-800", 
    emoji: "💾", 
    price: 750, 
    pattern: "cyber_circuit", 
    description: "Intricate electronic matrices running over glowing neon data pathways." 
  },
  { 
    id: "shop_banner_royal", 
    name: "Imperial Crest", 
    gradient: "from-amber-950 via-amber-700 to-stone-900", 
    emoji: "🔱", 
    price: 1000, 
    pattern: "royal_damask", 
    description: "Highly detailed luxury baroque filigree tilework reserved for royalty." 
  },
  { 
    id: "shop_banner_glitch", 
    name: "Digital Overdrive", 
    gradient: "from-fuchsia-950 via-red-900 to-teal-950", 
    emoji: "👾", 
    price: 1500, 
    pattern: "matrix_glitch", 
    description: "Layered vector distortion slices with misaligned multi-pass monitoring streams." 
  },
  { 
    id: "shop_banner_celestial", 
    name: "Cosmic Nebula", 
    gradient: "from-indigo-950 via-violet-950 to-purple-900", 
    emoji: "🌌", 
    price: 2500, 
    pattern: "sacred_geometry", 
    description: "Concentric constellation rings and interlocking high-fidelity calculation paths." 
  },

  /* --- GOD TIER / LEGENDARY LUXURY COSMETICS --- */
  { 
    id: "shop_banner_exquisite_sovereign", 
    name: "Elysian Sovereign", 
    gradient: "from-yellow-600 via-amber-400 to-orange-500", 
    emoji: "👑", 
    price: 5000, 
    pattern: "exquisite_crowns", 
    description: "Exquisite celestial alignment geometries mapped around alternating sovereign royal crown configurations." 
  },
  { 
    id: "shop_banner_meme_nice", 
    name: "Absolute Nice", 
    gradient: "from-emerald-950 via-teal-500 to-fuchsia-600", 
    emoji: "", 
    price: 6767, 
    pattern: "meme_nice_67", 
    description: "The ultimate hyper-frequent 67-themed blueprint matrix configuration with central vector logo overdrive." 
  }
];

export const SHOP_TITLES = [
  // --- BASE / TOWNSPEOPLE TIER ---
  {
    id: "title_casual",
    label: "Casual",
    price: 150, // Changed from cost to price
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    description: "Just here for a good time and some light movement."
  },
  {
    id: "title_grinder",
    label: "Daily Grinder ⚔️",
    price: 350, // Changed from cost to price
    color: "text-zinc-300",
    bg: "bg-zinc-500/15",
    description: "Putting in consistent work day after day."
  },

  // --- RARE / HERO TIER ---
  {
    id: "title_beast",
    label: "Beast Mode 🦍",
    price: 750, // Changed from cost to price
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    description: "Unlocking structural power limits during training sessions."
  },
  {
    id: "title_overdrive",
    label: "Overdrive ⚡",
    price: 1200, // Changed from cost to price
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
    description: "Operating at maximum efficiency and lightning speed."
  },

  // --- EPIC / DEMI-GOD TIER ---
  {
    id: "title_immortal",
    label: "The Immortal 🛡️",
    price: 2500, // Changed from cost to price
    color: "text-purple-400",
    bg: "bg-purple-500/20",
    description: "Fatigue holds no power over your unstoppable momentum."
  },
  {
    id: "title_colossus",
    label: "Colossus ⛰️",
    price: 4000, // Changed from cost to price
    color: "text-rose-400",
    bg: "bg-rose-500/25",
    description: "An absolute powerhouse of pure, unyielding strength."
  },

  // --- MYTHIC / APEX TIER ---
  {
    id: "title_deity",
    label: "Fitness Deity 🌌",
    price: 7500, // Changed from cost to price
    color: "text-indigo-400",
    bg: "bg-indigo-500/25",
    description: "A legendary status spoken of only in gym lore."
  },
  {
    id: "title_goat",
    label: "G.O.A.T 👑🐐",
    price: 15000, // Changed from cost to price
    color: "text-amber-300 text-glow animate-pulse",
    bg: "bg-amber-400/25 border border-amber-400/40",
    description: "Greatest Of All Time. The absolute pinnacle of ultimate dedication."
  }
];