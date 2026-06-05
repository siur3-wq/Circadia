import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, Check, X, LogOut, Shield, Download, Copy, GraduationCap, RefreshCw, Megaphone, Radio } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AvatarDisplay from "@/components/game/AvatarDisplay";
import { clearAdminMode, ADMIN_CONFIG } from "../lib/adminProfile";
import { clearSelectedProfile } from "../lib/selectedProfile";
import { supabase } from "@/lib/supabase"; 

// ─── LOCAL GAME CONFIGURATION CONFIG MATRIX ──────────────────────────────────
import { CHALLENGES } from "@/components/game/ChallengeData"; 

const AVATAR_EMOJIS = ["😊","😎","🤩","🥳","😺","🦊","🐶","🐸","🦁","🐼","🐵","🦄","🐲","👻","🤖","👽"];

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// ─── Profile Form Component ──────────────────────────────────────────────────
function ProfileForm({ profile, onSave, onCancel }) {
  const [name, setName] = useState(profile?.display_name || "");
  const [emoji, setEmoji] = useState(profile?.avatar_emoji || "😊");

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="text-5xl">{emoji}</div>
      </div>
      <div className="grid grid-cols-8 gap-2">
        {AVATAR_EMOJIS.map(e => (
          <button key={e} onClick={() => setEmoji(e)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all ${
              emoji === e ? "bg-primary/20 border-2 border-primary scale-110" : "bg-muted hover:bg-muted/80"
            }`}>{e}</button>
        ))}
      </div>
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Student name..."
        className="rounded-xl h-11 font-bold" />
      <div className="flex gap-2">
        <Button onClick={() => onSave({ display_name: name.trim(), avatar_emoji: emoji })}
          disabled={!name.trim()}
          className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-xl h-11">
          <Check className="w-4 h-4 mr-2" /> {profile ? "Save" : "Create"}
        </Button>
        <Button variant="outline" onClick={onCancel} className="rounded-xl h-11">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Profiles Tab Component ──────────────────────────────────────────────────
function ProfilesTab({ profiles, isLoading, schools, allClasses }) {
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [assigningId, setAssigningId] = useState(null);

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const { data: existingProfiles, error: maxError } = await supabase
        .from("player_profiles")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);

      if (maxError) throw maxError;

      const nextId = existingProfiles && existingProfiles.length > 0 
        ? Number(existingProfiles[0].id) + 1 
        : 10;

      const { data: res, error = null } = await supabase
        .from("player_profiles")
        .insert([{
          id: nextId, 
          display_name: data.display_name,
          avatar_emoji: data.avatar_emoji || '😊',
          user_email: `student_${Date.now()}@circadia.local`,
          banner_id: "banner_default", 
          total_xp: 0, 
          coins: 0, 
          level: 1, 
          current_streak: 0, 
          longest_streak: 0,
          total_time_exercised: 0,
        }])
        .select();

      if (error) throw error;
      return res;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["allProfiles"] }); 
      setCreating(false); 
      toast.success("Profile created successfully! 🎉"); 
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Failed to create profile: ${err.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase.from("player_profiles").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["allProfiles"] }); setEditingId(null); setAssigningId(null); toast.success("Profile updated! ✨"); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("player_profiles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["allProfiles"] }); toast.success("Profile deleted."); },
  });

  const handleExportCSV = () => {
    const fields = ["display_name","avatar_emoji","level","total_xp","coins","current_streak","longest_streak","total_time_exercised","last_challenge_date","banner_id","equipped_title_id","school_id","class_id","user_email"];
    const header = fields.join(",");
    const rows = (profiles || []).map(p => fields.map(f => `"${(p[f] ?? "").toString().replace(/"/g, '""')}"`).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "student_profiles.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-foreground text-base">Student Profiles</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV} className="rounded-full font-bold gap-1.5">
            <Download className="w-3.5 h-3.5" /> CSV
          </Button>
          {!creating && (
            <Button onClick={() => setCreating(true)} size="sm" className="rounded-xl bg-primary text-primary-foreground font-bold">
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          )}
        </div>
      </div>

      {creating && (
        <Card className="border-2 border-primary/40 rounded-2xl">
          <CardContent className="p-4">
            <ProfileForm onSave={(data) => createMutation.mutate(data)} onCancel={() => setCreating(false)} />
          </CardContent>
        </Card>
      )}

      {isLoading && <div className="text-center py-8 text-3xl animate-bounce">⚡</div>}

      <div className="space-y-2">
        {!isLoading && (profiles || []).length === 0 && !creating && (
          <p className="text-center text-muted-foreground text-sm py-6">No profiles yet. Add one above!</p>
        )}
        {(profiles || []).map(profile => {
          const profileSchool = (schools || []).find(s => String(s.id) === String(profile.school_id));
          const profileClass = (allClasses || []).find(c => String(c.id) === String(profile.class_id));
          const schoolClasses = (allClasses || []).filter(c => String(c.school_id) === String(profile.school_id));

          return (
            <Card key={profile.id} className="border border-border rounded-2xl">
              <CardContent className="p-3">
                {editingId === profile.id ? (
                  <ProfileForm profile={profile}
                    onSave={(data) => updateMutation.mutate({ id: profile.id, data })}
                    onCancel={() => setEditingId(null)} />
                ) : assigningId === profile.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AvatarDisplay profile={profile} size="sm" />
                      <p className="font-black text-sm text-foreground">{profile.display_name}</p>
                    </div>
                    <Select
                      value={profile.school_id ? String(profile.school_id) : "none"}
                      onValueChange={(val) => updateMutation.mutate({ id: profile.id, data: { school_id: val === "none" ? null : val, class_id: null } })}
                    >
                      <SelectTrigger className="rounded-xl h-10 font-bold">
                        <SelectValue placeholder="Select school..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No school</SelectItem>
                        {(schools || []).map(s => <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {profile.school_id && (
                      <Select
                        value={profile.class_id ? String(profile.class_id) : "none"}
                        onValueChange={(val) => updateMutation.mutate({ id: profile.id, data: { class_id: val === "none" ? null : val } })}
                      >
                        <SelectTrigger className="rounded-xl h-10 font-bold">
                          <SelectValue placeholder="Select class..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No class</SelectItem>
                          {schoolClasses.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setAssigningId(null)} className="w-full rounded-xl">Done</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <AvatarDisplay profile={profile} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm text-foreground truncate">{profile.display_name}</p>
                      <div className="text-xs text-muted-foreground flex flex-wrap gap-x-2">
                        <span>⚡ {profile.total_xp || 0} XP</span>
                        <span>·</span>
                        <span>Lv.{profile.level || 1}</span>
                        <span>·</span>
                        <span className="text-primary font-bold">⏱️ {profile.total_time_exercised || 0}m</span>
                      </div>
                      {profileSchool && (
                        <p className="text-xs text-primary font-bold truncate mt-0.5">🏫 {profileSchool.name}{profileClass ? ` · ${profileClass.name}` : ""}</p>
                      )}
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => setAssigningId(profile.id)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Assign to school/class">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setEditingId(profile.id)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => { if (confirm(`Delete "${profile.display_name}"?`)) deleteMutation.mutate(profile.id); }}
                        className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Schools Tab Component ───────────────────────────────────────────────────
function SchoolsTab() {
  const queryClient = useQueryClient();
  const [schoolName, setSchoolName] = useState("");
  const [className, setClassName] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [renamingSchoolId, setRenamingSchoolId] = useState(null);
  const [renameSchoolValue, setRenameSchoolValue] = useState("");
  const [renamingClassId, setRenamingClassId] = useState(null);
  const [renameClassValue, setRenameClassValue] = useState("");

  const { data: schools } = useQuery({
    queryKey: ["allSchools"],
    queryFn: async () => {
      const { data, error } = await supabase.from("schools").select("*").order("name");
      if (error) throw error;
      return data || [];
    },
  });

  const { data: classes } = useQuery({
    queryKey: ["schoolClasses", selectedSchoolId],
    queryFn: async () => {
      if (!selectedSchoolId) return [];
      const { data, error } = await supabase.from("classes").select("*").eq("school_id", selectedSchoolId).order("name");
      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedSchoolId,
  });

  const createSchoolMutation = useMutation({
    mutationFn: async (targetName) => {
      const { data, error } = await supabase
        .from("schools")
        .insert([{ 
          id: crypto.randomUUID(), 
          name: targetName, 
          code: generateCode() 
        }])
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["allSchools"] }); 
      setSchoolName(""); 
      toast.success("School created successfully! 🏫"); 
    },
    onError: (err) => { toast.error(`Error saving school: ${err.message}`); }
  });

  const deleteSchoolMutation = useMutation({
    mutationFn: async (schoolId) => {
      const { data: schoolClasses, error: fetchClassesErr } = await supabase
        .from("classes")
        .select("id")
        .eq("school_id", schoolId);
      
      if (fetchClassesErr) throw fetchClassesErr;
      const classIds = (schoolClasses || []).map(c => c.id);

      const { error: profileSchoolErr } = await supabase
        .from("player_profiles")
        .update({ school_id: null, class_id: null })
        .eq("school_id", schoolId);
      
      if (profileSchoolErr) throw profileSchoolErr;

      if (classIds.length > 0) {
        const { error: profileClassErr } = await supabase
          .from("player_profiles")
          .update({ class_id: null })
          .in("class_id", classIds);
        
        if (profileClassErr) throw profileClassErr;

        const { error: classErr } = await supabase
          .from("classes")
          .delete()
          .in("id", classIds);
        
        if (classErr) throw classErr;
      }
      
      const { error: schoolErr } = await supabase
        .from("schools")
        .delete()
        .eq("id", schoolId);
        
      if (schoolErr) throw schoolErr;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["allSchools"] }); 
      queryClient.invalidateQueries({ queryKey: ["schoolClasses"] }); 
      queryClient.invalidateQueries({ queryKey: ["allClasses"] });
      queryClient.invalidateQueries({ queryKey: ["allProfiles"] });
      setSelectedSchoolId(null); 
      toast.success("School completely cleared!"); 
    },
    onError: (err) => { toast.error(`Delete failed: ${err.message}`); }
  });

  const renameSchoolMutation = useMutation({
    mutationFn: async ({ id, name }) => {
      const { error } = await supabase.from("schools").update({ name: name.trim() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["allSchools"] }); setRenamingSchoolId(null); toast.success("School renamed! ✏️"); },
  });

  const createClassMutation = useMutation({
    mutationFn: async (targetClassName) => {
      const { data, error } = await supabase
        .from("classes")
        .insert([{ 
          id: crypto.randomUUID(),
          name: targetClassName, 
          school_id: selectedSchoolId, 
          code: generateCode() 
        }])
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["schoolClasses"] }); 
      queryClient.invalidateQueries({ queryKey: ["allClasses"] });
      setClassName(""); 
      toast.success("Class created! 📚"); 
    },
    onError: (err) => { toast.error(`Failed creating class: ${err.message}`); }
  });

  const deleteClassMutation = useMutation({
    mutationFn: async (classId) => {
      const { error: profileErr } = await supabase
        .from("player_profiles")
        .update({ class_id: null })
        .eq("class_id", classId);
      if (profileErr) throw profileErr;

      const { error } = await supabase.from("classes").delete().eq("id", classId);
      if (error) throw error;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["schoolClasses"] }); 
      queryClient.invalidateQueries({ queryKey: ["allClasses"] });
      toast.success("Class deleted."); 
    },
  });

  const renameClassMutation = useMutation({
    mutationFn: async ({ id, name }) => {
      const { error } = await supabase.from("classes").update({ name: name.trim() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["schoolClasses"] }); setRenamingClassId(null); toast.success("Class renamed! ✏️"); },
  });

  const copyCode = (code) => { navigator.clipboard.writeText(code); toast.success("Code copied! 📋"); };

  return (
    <div className="space-y-4">
      <Card className="border-2 border-border rounded-2xl">
        <CardHeader className="pb-2"><CardTitle className="text-base font-black">Create a School</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Input value={schoolName} onChange={e => setSchoolName(e.target.value)} placeholder="School name..." className="rounded-xl h-11 font-bold" />
          <Button onClick={() => createSchoolMutation.mutate(schoolName.trim())} disabled={!schoolName.trim()}
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-xl h-11">
            <Plus className="w-4 h-4 mr-2" /> Create School
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {(schools || []).length === 0 && (
          <div className="text-center py-8 text-muted-foreground"><div className="text-3xl mb-2">🏫</div><p className="font-bold">No schools yet.</p></div>
        )}
        {(schools || []).map(school => {
          const isSelected = String(school.id) === String(selectedSchoolId);

          return (
            <Card key={school.id}
              className={`border-2 rounded-2xl cursor-pointer transition-all ${isSelected ? "border-primary shadow-lg" : "border-border hover:border-primary/40"}`}
              onClick={() => setSelectedSchoolId(isSelected ? null : school.id)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    {renamingSchoolId === school.id ? (
                      <div className="flex items-center gap-2 mb-1" onClick={e => e.stopPropagation()}>
                        <input autoFocus value={renameSchoolValue} onChange={e => setRenameSchoolValue(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter") renameSchoolMutation.mutate({ id: school.id, name: renameSchoolValue }); if (e.key === "Escape") setRenamingSchoolId(null); }}
                          className="bg-muted rounded-xl px-3 py-1 font-black text-base text-foreground outline-none border-2 border-primary w-40" />
                        <button onClick={e => { e.stopPropagation(); renameSchoolMutation.mutate({ id: school.id, name: renameSchoolValue }); }} className="p-1.5 rounded-lg bg-primary text-primary-foreground"><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={e => { e.stopPropagation(); setRenamingSchoolId(null); }} className="p-1.5 rounded-lg bg-muted text-muted-foreground"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-black text-foreground">{school.name || "Unnamed School"}</h3>
                        <button onClick={e => { e.stopPropagation(); setRenamingSchoolId(school.id); setRenameSchoolValue(school.name || ""); }} className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      <button onClick={e => { e.stopPropagation(); copyCode(school.code); }} className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg hover:bg-primary/20">
                        <Copy className="w-3 h-3" /> {school.code}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl">🏫</div>
                    <button onClick={e => { e.stopPropagation(); if (confirm(`Delete "${school.name || 'this school'}" and all its classes?`)) deleteSchoolMutation.mutate(school.id); }}
                      className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-border" onClick={e => e.stopPropagation()}>
                    <h4 className="font-bold text-sm mb-3">Classes</h4>
                    <div className="space-y-2 mb-3">
                      {(classes || []).length === 0 && <p className="text-xs text-muted-foreground italic">No classes yet.</p>}
                      {(classes || []).map(cls => (
                        <div key={cls.id} className="flex items-center justify-between bg-muted/50 rounded-xl p-3">
                          <div>
                            {renamingClassId === cls.id ? (
                              <div className="flex items-center gap-1.5 mb-1">
                                <input autoFocus value={renameClassValue} onChange={e => setRenameClassValue(e.target.value)}
                                  onKeyDown={e => { if (e.key === "Enter") renameClassMutation.mutate({ id: cls.id, name: renameClassValue }); if (e.key === "Escape") setRenamingClassId(null); }}
                                  className="bg-background rounded-lg px-2 py-0.5 font-bold text-sm text-foreground outline-none border-2 border-primary w-32" />
                                <button onClick={() => renameClassMutation.mutate({ id: cls.id, name: renameClassValue })} className="p-1 rounded-lg bg-primary text-primary-foreground"><Check className="w-3 h-3" /></button>
                                <button onClick={() => setRenamingClassId(null)} className="p-1 rounded-lg bg-muted text-muted-foreground"><X className="w-3 h-3" /></button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <p className="font-bold text-sm">{cls.name}</p>
                                <button onClick={() => { setRenamingClassId(cls.id); setRenameClassValue(cls.name); }} className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Pencil className="w-3 h-3" /></button>
                              </div>
                            )}
                            <button onClick={() => copyCode(cls.code)} className="flex items-center gap-1 text-xs text-primary mt-1">
                              <Copy className="w-3 h-3" /> {cls.code}
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => { if (confirm(`Delete class "${cls.name}"?`)) deleteClassMutation.mutate(cls.id); }}
                              className="p-1 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input value={className} onChange={e => setClassName(e.target.value)} placeholder="New class name..." className="rounded-xl h-10 font-bold flex-1" />
                      <Button onClick={() => createClassMutation.mutate(className.trim())} disabled={!className.trim()} className="rounded-xl h-10 bg-primary"><Plus className="w-4 h-4" /></Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Maintenance Tab Component ────────────────────────────────────────────────
function MaintenanceTab({ profiles }) {
  const queryClient = useQueryClient();
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState("");

  // In-memory live announcement inputs
  const [broadcastText, setBroadcastText] = useState("");
  const [isBroadcastActive, setIsBroadcastActive] = useState(false);

  // Sync state parameters from local storage memory on initial card initialization
  useEffect(() => {
    const saved = localStorage.getItem("circadia_admin_announcement");
    if (saved) {
      const parsed = JSON.parse(saved);
      setBroadcastText(parsed.message || "");
      setIsBroadcastActive(parsed.is_active || false);
    }
  }, []);

  const handlePublishAnnouncement = () => {
    const announcementPayload = { message: broadcastText.trim(), is_active: true };
    localStorage.setItem("circadia_admin_announcement", JSON.stringify(announcementPayload));
    setIsBroadcastActive(true);
    toast.success("Live gateway announcement updated! 📻");
  };

  const handleDeactivateAnnouncement = () => {
    const announcementPayload = { message: broadcastText, is_active: false };
    localStorage.setItem("circadia_admin_announcement", JSON.stringify(announcementPayload));
    setIsBroadcastActive(false);
    toast.success("Live broadcast deactivated.");
  };

  const handleRecalculateTimes = async () => {
    setSyncing(true);
    setStatus("Reading completions registry from challenge_completions table...");
    try {
      const { data: completions, error: compError } = await supabase
        .from("challenge_completions")
        .select("user_email, challenge_id"); 

      if (compError) throw compError;

      setStatus(`Processing data streams for ${(profiles || []).length} students...`);

      const emailSecondsMap = {};
      completions.forEach((c) => {
        if (!c.user_email) return; 
        
        const matchingChallenge = CHALLENGES.find((ch) => ch.id === c.challenge_id);
        const durationSeconds = matchingChallenge ? matchingChallenge.duration : 60; 
        
        emailSecondsMap[c.user_email] = (emailSecondsMap[c.user_email] || 0) + durationSeconds;
      });

      let updatedRecordsCount = 0;
      for (const profile of (profiles || [])) {
        if (!profile.user_email) continue;

        const calculatedSeconds = emailSecondsMap[profile.user_email] || 0;
        const correctMinutes = Math.round(calculatedSeconds / 60);

        if (profile.total_time_exercised !== correctMinutes) {
          const { error: updateError } = await supabase
            .from("player_profiles")
            .update({ total_time_exercised: correctMinutes })
            .eq("id", profile.id);

          if (updateError) {
            console.error(`Failed on profile #${profile.id}:`, updateError.message);
          } else {
            updatedRecordsCount++;
          }
        }
      }

      queryClient.invalidateQueries({ queryKey: ["allProfiles"] });
      setStatus(`🎉 Completed! Audited ledger and synchronized ${updatedRecordsCount} profiles.`);
      toast.success("All student workout metrics synced! ⏱️");
    } catch (err) {
      console.error(err);
      setStatus(`❌ Error executing sync matrix: ${err.message}`);
      toast.error("Batch sync engine crashed.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* IN-MEMORY LOCAL LIVE BROADCAST PANEL */}
      <Card className="border border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base font-black flex items-center gap-2">
            📢 Live Gateway Announcement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Broadcast text directions instantly into the students' roster gate screen. Completely calculated inside native browser memory layout logic.
          </p>
          <Input 
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            placeholder="Type live banner notification info here..."
            className="rounded-xl h-11 font-medium"
          />
          <div className="flex gap-2">
            <Button 
              size="sm"
              onClick={handlePublishAnnouncement}
              disabled={!broadcastText.trim()}
              className="flex-1 rounded-xl font-bold bg-primary text-primary-foreground gap-1.5"
            >
              <Radio className="w-3.5 h-3.5" /> Broadcast Live Text
            </Button>
            {isBroadcastActive && (
              <Button 
                size="sm"
                variant="outline"
                onClick={handleDeactivateAnnouncement}
                className="rounded-xl font-bold text-destructive hover:bg-destructive/10"
              >
                Turn Off
              </Button>
            )}
          </div>
          {isBroadcastActive && (
            <p className="text-[10px] text-green-500 font-bold flex items-center gap-1 justify-center animate-pulse mt-1">
              ● Announcement Stream Is Online & Active
            </p>
          )}
        </CardContent>
      </Card>

      {/* RECALCULATE DATABASE TIMES UTILITY */}
      <Card className="border border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base font-black flex items-center gap-2">
            ⚙️ Automated Core Utilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="font-bold text-sm text-foreground">Global Exercise Time Synchronization</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Scans logged metrics inside the <code>challenge_completions</code> table. 
              Cross-references durations from your template files and balances client tracking.
            </p>
          </div>

          <Button 
            onClick={handleRecalculateTimes} 
            disabled={syncing}
            className="w-full h-11 rounded-xl font-bold gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition-opacity text-white"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Processing Sync Matrix..." : "Recalculate & Sync All Exercise Times"}
          </Button>

          {status && (
            <div className="text-xs font-bold font-mono p-3 rounded-xl bg-muted border border-border text-foreground text-center">
              {status}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Dashboard Component ────────────────────────────────────────────────
const TABS = [
  { id: "profiles", label: "👤 Profiles" },
  { id: "schools", label: "🏫 Schools" },
  { id: "maintenance", label: "⚙️ Maintenance" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("profiles");

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["allProfiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("player_profiles").select("*").order("display_name");
      if (error) throw error;
      return data || [];
    },
  });

  const { data: schools } = useQuery({
    queryKey: ["allSchools"],
    queryFn: async () => {
      const { data, error } = await supabase.from("schools").select("*").order("name");
      if (error) return [];
      return data || [];
    },
  });

  const { data: allClasses } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("classes").select("*");
      if (error) return [];
      return data || [];
    },
  });

  const handleExit = () => {
    clearAdminMode();
    clearSelectedProfile();
    window.location.href = "/SelectProfile";
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-black text-lg text-foreground">Admin Dashboard</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleExit} className="rounded-full font-bold gap-1.5">
          <LogOut className="w-3.5 h-3.5" /> Exit
        </Button>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-4">
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
          <div className="text-4xl">{ADMIN_CONFIG.emoji}</div>
          <div>
            <p className="font-black text-foreground text-lg">{ADMIN_CONFIG.name}</p>
            <p className="text-muted-foreground text-sm">{profiles?.length || 0} student profiles</p>
          </div>
        </div>

        <div className="flex gap-1 bg-muted rounded-2xl p-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === t.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "profiles" && <ProfilesTab profiles={profiles} isLoading={isLoading} schools={schools} allClasses={allClasses} />}
        {activeTab === "schools" && <SchoolsTab />}
        {activeTab === "maintenance" && <MaintenanceTab profiles={profiles} />}
      </div>
    </div>
  );
}