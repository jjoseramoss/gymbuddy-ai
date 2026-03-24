"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Home, MessageCircle, User } from "lucide-react";

import { cn } from "@/lib/cn";

const tabs = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/workouts", label: "Workouts", Icon: Dumbbell },
  { href: "/coach", label: "Coach", Icon: MessageCircle },
  { href: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-4 pb-[max(0px,env(safe-area-inset-bottom))]">
        {tabs.map(({ href, label, Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex w-full flex-col items-center justify-center gap-1 rounded-xl py-2 text-xs transition-colors",
                isActive
                  ? "text-zinc-950 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "stroke-[2.25]" : "stroke-[2]"
                )}
              />
              <span className={cn(isActive && "font-medium")}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
