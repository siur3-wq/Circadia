import React, { useState, useEffect } from "react";
import { PlayerProfile } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { setSelectedProfileId } from "@/lib/selectedProfile";
import { setAdminMode, ADMIN_CONFIG } from "@/lib/adminProfile";
import { Zap, Shield, X, School, ClipboardList, ArrowLeft, Megaphone } from "lucide-react";
import AvatarDisplay from "../components/game/AvatarDisplay";
import { getBannerById } from "../components/game/BannerUtils";
import BannerPattern from "../components/game/BannerPattern";
import PlayerTitle from "../components/game/PlayerTitle";
import { supabase } from "@/lib/supabase"; 

export default function SelectProfile() {
  // Navigation View steps: "ROLE" -> "SCHOOL" -> "CLASS" -> "STUDENT"
  const [viewStep, setViewStep] = useState("ROLE");
  const [selectedSchool, setSelectedSchool] = useState(null); // Full selected school object
  const [selectedClass, setSelectedClass] = useState(null);   // Full selected class object

  const [selected, setSelected] = useState(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  // Dynamic code-driven client-side live text storage state hooks
  const [liveAnnouncement, setLiveAnnouncement] = useState(null);

  useEffect(() => {
    const parseLiveAnnouncement = () => {
      const dataStore = localStorage.getItem("circadia_admin_announcement");
      if (dataStore) {
        const payload = JSON.parse(dataStore);
        if (payload.is_active && payload.message) {
          setLiveAnnouncement(payload.message);
          return;
        }
      }
      setLiveAnnouncement(null);
    };

    // Run layout audit check instantly on component construction mounts
    parseLiveAnnouncement();

    // Setup memory interval ticker loop to catch multi-tab dashboard broadcasts instantly
    const threadInterval = setInterval(parseLiveAnnouncement, 2000);
    return () => clearInterval(threadInterval);
  }, []);

  // 1. Fetch all student profiles from player_profiles table
  const { data: profiles, isLoading: profilesLoading } = useQuery({
    queryKey: ["allProfiles"],
    queryFn: () => PlayerProfile.list(),
  });

  // 2. Fetch all schools from schools table
  const { data: databaseSchools = [], isLoading: schoolsLoading } = useQuery({
    queryKey: ["databaseSchoolsList"],
    queryFn: async () => {
      const { data, error } = await supabase.from("schools").select("*");
      if (error) throw error;
      return data || [];
    }
  });

  // 3. NEW QUERY: Fetch all classes from your dedicated classes table
  const { data: databaseClasses = [], isLoading: classesLoading } = useQuery({
    queryKey: ["databaseClassesList"],
    queryFn: async () => {
      const { data, error } = await supabase.from("classes").select("*");
      if (error) throw error;
      return data || [];
    }
  });

  const safeProfiles = profiles || [];
  const isLoading = profilesLoading || schoolsLoading || classesLoading;

  // --- RELATIONSHIP FILTERING LOGIC ---

  // Filter classes belonging to the chosen school (matches via school_id relation)
  const filteredClasses = databaseClasses.filter((cls) => {
    if (!selectedSchool) return false;
    return (
      String(cls.school_id) === String(selectedSchool.id) ||
      String(cls.school_code) === String(selectedSchool.code)
    );
  });

  // Filter students matching the selected school and class constraints
  const studentsInClass = safeProfiles.filter((p) => {
    if (!selectedSchool || !selectedClass) return false;

    // Check school alignment
    const matchesSchool =
      String(p.school_id) === String(selectedSchool.id) ||
      p.school === selectedSchool.name ||
      p.school_code === selectedSchool.code;

    // Check class alignment (can match class_id, class name, or class code relations)
    const matchesClass =
      String(p.class_id) === String(selectedClass.id) ||
      String(p.class) === String(selectedClass.name) ||
      String(p.class_name) === String(selectedClass.name) ||
      String(p.class) === String(selectedClass.id);

    // Exclude admins from the student roster list view
    return matchesSchool && matchesClass && !p.is_admin && p.role !== "admin";
  });

  // --- ACTIONS ---
  const handleSelect = (profile) => {
    setSelected(profile.id);
    setSelectedProfileId(profile.id);
    window.location.href = "/Home";
  };

  const handleAdminPinSubmit = () => {
    if (pin === ADMIN_CONFIG.pin) {
      setAdminMode();
      window.location.href = "/AdminDashboard";
    } else {
      setPinError(true);
      setPin("");
      setTimeout(() => setPinError(false), 1500);
    }
  };

  const handleBack = () => {
    if (viewStep === "STUDENT") setViewStep("CLASS");
    else if (viewStep === "CLASS") setViewStep("SCHOOL");
    else if (viewStep === "SCHOOL") setViewStep("ROLE");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 pt-10 pb-10">
      
      {/* NATIVE IN-MEMORY REACTION BUBBLE COMPONENT */}
      {liveAnnouncement && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 flex items-center gap-3.5 shadow-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 shadow-md">
            <Megaphone className="w-4 h-4 text-white animate-bounce" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase text-amber-600 tracking-wider">Live Announcement</p>
            <p className="text-sm font-bold text-foreground leading-snug truncate">{liveAnnouncement}</p>
          </div>
        </motion.div>
      )}

      {/* Header Layout */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-7 h-7 text-primary" />
          <span className="font-black text-3xl text-foreground tracking-tight">Circadia</span>
        </div>
        <p className="text-muted-foreground font-bold text-sm">
          {viewStep === "ROLE" && "Who are you? Pick your gateway access portal!"}
          {viewStep === "SCHOOL" && "Select your school institutional database:"}
          {viewStep === "CLASS" && `Select your classroom folder in ${selectedSchool?.name || ""}:`}
          {viewStep === "STUDENT" && `Find your name inside Class Room ${selectedClass?.name || ""}:`}
        </p>
      </motion.div>

      {/* Navigation Back Button */}
      {viewStep !== "ROLE" && (
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 rounded-xl bg-muted border border-border text-xs font-black flex items-center gap-1 hover:bg-muted/80 text-foreground transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Go Back
        </button>
      )}

      {isLoading && <div className="text-4xl animate-bounce mt-16">⚡</div>}

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: PORTAL ROUTING DASHBOARD */}
          {viewStep === "ROLE" && !isLoading && (
            <motion.div key="step-role" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-4 w-full">
              <button
                onClick={() => setViewStep("SCHOOL")}
                className="relative rounded-2xl overflow-hidden border-2 border-border bg-card hover:border-primary transition-all text-left group"
              >
                <div className="relative h-20 bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                  <School className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-3">
                  <p className="font-black text-foreground text-sm">Student Roster</p>
                  <span className="text-[11px] text-muted-foreground font-medium mt-1 block">Find your class list</span>
                </div>
              </button>

              <button
                onClick={() => { setShowPinModal(true); setPin(""); setPinError(false); }}
                className="relative rounded-2xl overflow-hidden border-2 border-dashed border-primary/40 bg-card hover:border-primary transition-all text-left"
              >
                <div className="relative h-20 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                  <div className="text-4xl">{ADMIN_CONFIG.emoji}</div>
                </div>
                <div className="p-3">
                  <p className="font-black text-foreground text-sm">{ADMIN_CONFIG.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Shield className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary font-bold">PIN protected</span>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {/* STEP 2: RENDER SCHOOLS FROM DATABASE */}
          {viewStep === "SCHOOL" && !isLoading && (
            <motion.div key="step-school" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
              {databaseSchools.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-6 font-bold border border-dashed rounded-xl">
                  No schools found in database table.
                </p>
              ) : (
                databaseSchools.map((school) => (
                  <button
                    key={school.id || school.code}
                    onClick={() => { 
                      setSelectedSchool(school); 
                      setViewStep("CLASS"); 
                    }}
                    className="w-full p-4 rounded-xl border-2 border-border bg-card hover:border-primary font-bold text-sm text-left flex items-center gap-3 transition-colors"
                  >
                    <School className="w-4 h-4 text-primary" />
                    <span>{school.name}</span>
                  </button>
                ))
              )}
            </motion.div>
          )}

          {/* STEP 3: RENDER CLASSES FROM SEPARATE TABLE */}
          {viewStep === "CLASS" && !isLoading && (
            <motion.div key="step-class" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
              {filteredClasses.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-6 font-bold border border-dashed rounded-xl">
                  No classes linked to this school in database.
                </p>
              ) : (
                filteredClasses.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => { 
                      setSelectedClass(cls); 
                      setViewStep("STUDENT"); 
                    }}
                    className="w-full p-4 rounded-xl border-2 border-border bg-card hover:border-primary font-bold text-sm text-left flex items-center gap-3 transition-colors"
                  >
                    <ClipboardList className="w-4 h-4 text-primary" />
                    <span>{cls.name ? `Class ${cls.name}` : `Class ID: ${cls.id}`}</span>
                  </button>
                ))
              )}
            </motion.div>
          )}

          {/* STEP 4: RENDER STUDENT PROFILE ROSTER */}
          {viewStep === "STUDENT" && !isLoading && (
            <motion.div key="step-student" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-4 w-full">
              {studentsInClass.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-muted-foreground font-bold">
                  No profiles linked to this classroom cell.
                </div>
              ) : (
                studentsInClass.map((profile, i) => {
                  const banner = getBannerById(profile.banner_id);
                  return (
                    <button
                      key={profile.id}
                      onClick={() => handleSelect(profile)}
                      className={`relative rounded-2xl overflow-hidden border-2 transition-all text-left ${
                        selected === profile.id
                          ? "border-primary shadow-lg shadow-primary/20 scale-105"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className={`relative h-20 bg-gradient-to-br ${banner.gradient} flex items-center justify-center`}>
                        <BannerPattern pattern={banner.pattern} opacity={0.15} />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative z-10">
                          <AvatarDisplay profile={profile} size="md" />
                        </div>
                      </div>
                      <div className="bg-card p-3">
                        <p className="font-black text-foreground text-sm truncate">{profile.display_name}</p>
                        <div className="mt-0.5">
                          <PlayerTitle profile={profile} />
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-xp font-bold">⚡ {profile.total_xp || 0} XP</span>
                          <span className="text-xs text-muted-foreground">· Lv.{profile.level || 1}</span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Admin Verification PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-3xl p-6 w-full max-w-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{ADMIN_CONFIG.emoji}</span>
                  <span className="font-black text-foreground">{ADMIN_CONFIG.name}</span>
                </div>
                <button onClick={() => setShowPinModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground font-bold">Enter PIN to continue</p>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdminPinSubmit()}
                placeholder="••••"
                autoFocus
                className={`w-full bg-muted border-2 rounded-xl px-4 py-3 text-center text-xl font-black tracking-widest text-foreground outline-none transition-colors ${
                  pinError ? "border-destructive animate-pulse" : "border-border focus:border-primary"
                }`}
              />
              {pinError && <p className="text-destructive text-xs font-bold text-center">Wrong PIN. Try again.</p>}
              <button
                onClick={handleAdminPinSubmit}
                className="w-full bg-primary text-primary-foreground font-black rounded-xl py-3 hover:bg-primary/90 transition-colors"
              >
                Enter
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}