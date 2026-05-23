import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Trophy, User, Zap, BookOpen, ShoppingBag, RefreshCw } from "lucide-react";
import { clearSelectedProfile } from "./lib/selectedProfile";

const NAV_ITEMS = [
  { name: "Home", icon: Home, page: "Home" },
  { name: "Ranks", icon: Trophy, page: "Leaderboard" },
  { name: "Shop", icon: ShoppingBag, page: "Shop" },
  { name: "Library", icon: BookOpen, page: "ExerciseLibrary" },
  { name: "Me", icon: User, page: "Profile" },
];

export default function Layout({ children, currentPageName }) {
  const isSelectProfile = currentPageName === "SelectProfile";

  const handleSwitch = () => {
    clearSelectedProfile();
    window.location.href = "/SelectProfile";
  };

  if (isSelectProfile) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between max-w-lg mx-auto w-full">
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-black text-lg text-foreground tracking-tight">Circadia</span>
        </div>
        <button
          onClick={handleSwitch}
          className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full transition-all"
        >
          <RefreshCw className="w-3 h-3" /> Switch
        </button>
      </header>

      <main className="max-w-lg mx-auto w-full">{children}</main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-2">
          {NAV_ITEMS.map(item => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? "text-primary bg-primary/15"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                <span className="text-[10px] font-bold">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}