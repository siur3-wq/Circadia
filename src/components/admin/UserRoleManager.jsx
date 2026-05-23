import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Users, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ROLES = [
  { value: "student", label: "Student", emoji: "🎓" },
  { value: "teacher", label: "Teacher", emoji: "👩‍🏫" },
  { value: "school_administrator", label: "School Admin", emoji: "🏫" },
  { value: "developer", label: "Developer", emoji: "💻" },
  { value: "admin", label: "Platform Admin", emoji: "👑" },
];

export default function UserRoleManager() {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => base44.entities.User.list(),
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }) => base44.entities.User.update(userId, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success("Role updated! ✅");
    },
  });

  if (isLoading) return null;

  return (
    <Card className="border-2 border-border rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-black flex items-center gap-2">
          <Users className="w-4 h-4" /> User Roles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {(users || []).map(u => {
          const currentRole = ROLES.find(r => r.value === (u.role || "student")) || ROLES[0];
          return (
            <div key={u.id} className="flex items-center justify-between bg-muted/50 rounded-xl px-3 py-2">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm truncate">{u.full_name || u.email}</p>
                <p className="text-xs text-muted-foreground truncate">{u.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-xl text-xs font-bold gap-1 shrink-0">
                    {currentRole.emoji} {currentRole.label}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {ROLES.map(role => (
                    <DropdownMenuItem
                      key={role.value}
                      onClick={() => updateRoleMutation.mutate({ userId: u.id, role: role.value })}
                      className={`font-bold text-sm ${u.role === role.value ? "text-primary" : ""}`}
                    >
                      {role.emoji} {role.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
        {(users || []).length === 0 && (
          <p className="text-xs text-muted-foreground italic text-center py-2">No users found.</p>
        )}
      </CardContent>
    </Card>
  );
}