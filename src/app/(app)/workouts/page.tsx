"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { TopBar } from "@/components/TopBar";
import { loadWorkouts } from "@/lib/storage";
import type { Workout } from "@/lib/types";

export default function WorkoutsPage() {
  const [workouts] = useState<Workout[]>(() => loadWorkouts());

  const total = workouts.length;
  const last7 = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() - 7);

    return workouts.filter((w) => new Date(w.completedAt) >= cutoff).length;
  }, [workouts]);

  return (
    <div className="min-h-dvh">
      <TopBar
        title="Workouts"
        right={
          <Link
            href="/workouts/new"
            className="rounded-xl bg-zinc-950 px-3 py-2 text-xs font-medium text-white dark:bg-white dark:text-zinc-950"
          >
            New
          </Link>
        }
      />

      <main className="px-4 pt-4 md:px-6 md:pt-8">
        <div className="mb-4 hidden items-center justify-between md:flex">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Workouts</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Your recent training logs.
            </p>
          </div>
          <Link
            href="/workouts/new"
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
          >
            New workout
          </Link>
        </div>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-zinc-950">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Total
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {total}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-zinc-950">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Last 7 days
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {last7}
            </p>
          </div>
        </section>

        <section className="mt-4 space-y-3">
          {workouts.length === 0 ? (
            <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 text-center text-sm text-zinc-500 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-400">
              No workouts yet. Tap “New” to log your first one.
            </div>
          ) : (
            workouts.map((w) => (
              <div
                key={w.id}
                className="rounded-3xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold tracking-tight">
                      {w.title}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(w.completedAt).toLocaleDateString()} · {w.exercises.length} exercise{w.exercises.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                {w.notes ? (
                  <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
                    {w.notes}
                  </p>
                ) : null}

                <div className="mt-3 grid gap-2">
                  {w.exercises.slice(0, 3).map((ex, idx) => (
                    <div
                      key={`${w.id}-${idx}`}
                      className="rounded-2xl bg-zinc-50 px-3 py-2 text-xs text-zinc-700 dark:bg-white/5 dark:text-zinc-200"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{ex.name}</span>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          {ex.sets.length} set{ex.sets.length === 1 ? "" : "s"}
                        </span>
                      </div>

                      <div className="mt-2 grid gap-1">
                        {(() => {
                          const maxWeight = ex.sets.reduce<number | null>((acc, s) => {
                            if (typeof s.weightLb !== "number") return acc;
                            if (acc === null) return s.weightLb;
                            return Math.max(acc, s.weightLb);
                          }, null);

                          return ex.sets.slice(0, 3).map((s, setIndex) => {
                            const isMax =
                              typeof s.weightLb === "number" &&
                              maxWeight !== null &&
                              s.weightLb === maxWeight;

                            return (
                              <div
                                key={`${w.id}-${idx}-set-${setIndex}`}
                                className="flex items-center justify-between"
                              >
                                <span className="text-zinc-500 dark:text-zinc-400">
                                  Set {setIndex + 1}
                                </span>
                                <span
                                  className={
                                    isMax
                                      ? "font-semibold text-emerald-700 dark:text-emerald-400"
                                      : "text-zinc-600 dark:text-zinc-300"
                                  }
                                >
                                  {(s.reps ?? "?") + " reps"}
                                  {typeof s.weightLb === "number" ? ` @ ${s.weightLb}lb` : ""}
                                </span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
