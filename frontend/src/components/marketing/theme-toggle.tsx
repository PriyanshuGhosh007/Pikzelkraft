"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-[rgb(var(--hover-subtle))]",
        className
      )}
    >
      <span className="relative block h-[22px] w-[22px] overflow-hidden" aria-hidden>
        <Sun
          size={22}
          className={cn(
            "absolute inset-0 transition-all duration-300 ease-out",
            isDark ? "translate-y-0 rotate-0 opacity-100" : "translate-y-8 rotate-90 opacity-0"
          )}
        />
        <Moon
          size={22}
          className={cn(
            "absolute inset-0 transition-all duration-300 ease-out",
            isDark ? "-translate-y-8 -rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
          )}
        />
      </span>
    </button>
  );
}
