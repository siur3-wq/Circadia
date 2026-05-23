import React, { useState, useEffect } from "react";

const FACTS = [
  "💧 Drinking water before exercise helps your muscles work better!",
  "🏃 Just 20 minutes of movement a day boosts your brain power!",
  "😴 Sleep helps your muscles grow stronger after exercise!",
  "🌟 Exercise releases chemicals that make you feel happy!",
  "🦴 Jumping and running makes your bones stronger!",
  "🧠 Physical activity improves memory and focus at school!",
  "❤️ Your heart is a muscle — exercise makes it stronger!",
  "🥦 Eating veggies gives your muscles the fuel they need!",
  "🌈 Kids who exercise regularly have more energy every day!",
  "🐢 Even slow movement counts — any exercise is great!",
  "🤸 Stretching helps prevent injuries and keeps you flexible!",
  "🌞 Exercising outside gives you vitamin D from the sun!",
  "🎮 Active breaks between study sessions help you concentrate better!",
  "🦵 Strong leg muscles help you run faster and jump higher!",
  "🫁 Deep breathing during exercise trains your lungs!",
  "🏋️ You don't need equipment — your bodyweight is enough to get strong!",
  "🐣 Everyone starts as a beginner — keep going and you'll improve!",
  "🧩 Team sports improve teamwork and social skills!",
  "⚡ Exercise can reduce stress and help you feel calmer!",
  "🍎 A healthy snack after exercise helps your body recover faster!",
];

export default function FunFact({ className = "" }) {
  const [fact, setFact] = useState(() => FACTS[Math.floor(Math.random() * FACTS.length)]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setFact(FACTS[Math.floor(Math.random() * FACTS.length)]);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-primary/10 border border-primary/20 rounded-2xl px-5 py-4 max-w-xs text-center transition-opacity duration-400 ${fade ? "opacity-100" : "opacity-0"} ${className}`}>
      <p className="text-xs font-bold text-primary/80 uppercase tracking-widest mb-1">Fun Fact</p>
      <p className="text-sm font-bold text-foreground leading-snug">{fact}</p>
    </div>
  );
}