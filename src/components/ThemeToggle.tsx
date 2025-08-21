"use client";
import {useEffect, useState} from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light"|"dark">("light");
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light"|"dark"|null;
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }
  return (
    <button onClick={toggle} className="rounded-xl border px-3 py-1 text-sm">
      {theme === "dark" ? "🌙" : "☀️"} Theme
    </button>
  );
}
