"use client";

import { useEffect, useState } from "react";

import { TopBar } from "@/components/TopBar";

type FitnessGoal = "Lose fat" | "Build muscle" | "Stay active";

const GOAL_KEY = "gymbuddy.goal.v1";

export default function ProfilePage() {
  const [goal, setGoal] = useState<FitnessGoal>(() => {
    if (typeof window === "undefined") return "Stay active";
    const stored = window.localStorage.getItem(GOAL_KEY) as FitnessGoal | null;
    return stored ?? "Stay active";
  });

  useEffect(() => {
    window.localStorage.setItem(GOAL_KEY, goal);
  }, [goal]);

  return (
    <div className="min-h-dvh">
      <TopBar title="Profile" />

      <main className="px-4 pt-4 md:px-6 md:pt-8">
        <div className="mb-4 hidden md:block">
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Goals & settings.
          </p>
        </div>

        <section className="rounded-3xl border border-zinc-200/70 bg-white p-5 dark:border-white/10 dark:bg-zinc-950">
          <p className="text-sm font-semibold tracking-tight">Fitness goal</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Used later to personalize coaching.
          </p>

          <div className="mt-4 grid gap-2">
            {(["Lose fat", "Build muscle", "Stay active"] as FitnessGoal[]).map(
              (g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={
                    "rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors " +
                    (goal === g
                      ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                      : "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5")
                  }
                >
                  {g}
                </button>
              )
            )}
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-zinc-200/70 bg-white p-5 dark:border-white/10 dark:bg-zinc-950">
          <p className="text-sm font-semibold tracking-tight">Account</p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Auth isn’t wired yet. This MVP uses local storage.
          </p>

          <a
            href="/logout"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-900 dark:border-white/10 dark:bg-black dark:text-zinc-50"
          >
            Log out
          </a>
        </section>
      </main>
    </div>
  );
}
