"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) {
    return (
      <button 
        aria-label="Theme" 
        className="opacity-0 pointer-events-none rounded-xl border px-3 py-2 text-sm"
      >
        Theme
      </button>
    );
  }
  
  const isDark = resolvedTheme === "dark";
  
  return (
    <button
      aria-label="Theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-hover)] transition"
    >
      {isDark ? "🌙 Theme" : "☀️ Theme"}
    </button>
  );
}
