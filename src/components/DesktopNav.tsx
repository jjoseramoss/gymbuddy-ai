"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Home, MessageCircle, User } from "lucide-react";

import { cn } from "@/lib/cn";

const links = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/workouts", label: "Workouts", Icon: Dumbbell },
  { href: "/coach", label: "Coach", Icon: MessageCircle },
  { href: "/profile", label: "Profile", Icon: User },
] as const;

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[var(--gb-border)] bg-[color:var(--gb-bg)]/70 backdrop-blur md:block">
      <div className="flex h-full flex-col p-5">
        <Link href="/home" className="font-mono text-sm tracking-[0.25em]">
          GYMBUDDY
        </Link>

        <nav className="mt-6 grid gap-1">
          {links.map((l) => {
            const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[color:var(--gb-card-strong)] text-[color:var(--gb-fg)]"
                    : "text-[color:var(--gb-muted)] hover:bg-[color:var(--gb-card)] hover:text-[color:var(--gb-fg)]"
                )}
              >
                <l.Icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <Link
            href="/workouts/new"
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[color:var(--gb-fg)] px-4 py-3 text-sm font-semibold text-[color:var(--gb-bg)]"
          >
            Log workout
          </Link>
        </div>
      </div>
    </aside>
  );
}
