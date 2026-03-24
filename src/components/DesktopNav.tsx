"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

const links = [
  { href: "/home", label: "Home" },
  { href: "/workouts", label: "Workouts" },
  { href: "/coach", label: "Coach" },
  { href: "/profile", label: "Profile" },
] as const;

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 hidden border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/70 md:block">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/home" className="font-semibold tracking-tight">
          GymBuddy
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((l) => {
            const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/workouts/new"
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
          >
            Log workout
          </Link>
        </div>
      </div>
    </header>
  );
}
