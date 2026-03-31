"use client";

import Link from "next/link";
import { useMemo } from "react";

import { TopBar } from "@/components/TopBar";
import type { Workout } from "@/lib/types";
import { useWorkouts } from "@/lib/useWorkouts";

export default function WorkoutsPage() {
  const workouts = useWorkouts() as Workout[];

  const total = workouts.length;
  const last7 = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() - 7);

    return workouts.filter((w) => new Date(w.completedAt) >= cutoff).length;
  }, [workouts]);

  return (
    <div className="min-h-dvh bg-[color:var(--gb-bg)] text-[color:var(--gb-fg)]">
      <TopBar
        title="Workouts"
        right={
          <Link
            href="/workouts/new"
            className="rounded-xl bg-[color:var(--gb-fg)] px-3 py-2 text-xs font-medium text-[color:var(--gb-bg)]"
          >
            New
          </Link>
        }
      />

      <main className="px-4 pt-4 md:px-6 md:pt-8">
        <div className="mb-4 hidden items-center justify-between md:flex">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-[color:var(--gb-muted)]">
              WORKOUT LOGGING
            </p>
            <h1 className="mt-2 font-mono text-3xl tracking-tight">Workouts</h1>
          </div>
          <Link
            href="/workouts/new"
            className="rounded-2xl bg-[color:var(--gb-accent)] px-5 py-3 text-sm font-semibold text-[color:var(--gb-accent-fg)]"
          >
            New workout
          </Link>
        </div>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-5 backdrop-blur">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              Total
            </p>
            <p className="mt-3 font-mono text-4xl leading-none">{total}</p>
          </div>
          <div className="rounded-3xl border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-5 backdrop-blur">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              Last 7 days
            </p>
            <p className="mt-3 font-mono text-4xl leading-none">{last7}</p>
          </div>
        </section>

        <section className="mt-4 space-y-3">
          {workouts.length === 0 ? (
            <div className="rounded-3xl border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 text-center text-sm text-[color:var(--gb-muted)] backdrop-blur">
              No workouts yet. Tap “New” to log your first one.
            </div>
          ) : (
            workouts.map((w) => (
              <div
                key={w.id}
                className="rounded-3xl border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-5 backdrop-blur"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-semibold tracking-tight">{w.title}</p>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-[color:var(--gb-muted)]">
                      {new Date(w.completedAt).toLocaleDateString()} · {w.exercises.length} exercise{w.exercises.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                {w.notes ? (
                  <p className="mt-3 text-sm text-[color:var(--gb-muted)]">
                    {w.notes}
                  </p>
                ) : null}

                <div className="mt-3 grid gap-2">
                  {w.exercises.slice(0, 3).map((ex, idx) => (
                    <div
                      key={`${w.id}-${idx}`}
                      className="rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-card-strong)] px-3 py-2 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-[color:var(--gb-fg)]">
                          {ex.name}
                        </span>
                        <span className="text-[color:var(--gb-muted)]">
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
                                      ? "font-semibold text-[color:var(--gb-fg)]"
                                      : "text-[color:var(--gb-muted)]"
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
