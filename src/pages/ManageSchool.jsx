// This page has been replaced by the Admin Dashboard (PIN-protected).
// Redirecting any direct access away.
import { useEffect } from "react";

export default function ManageSchool() {
  useEffect(() => {
    window.location.href = "/SelectProfile";
  }, []);
  return null;
}