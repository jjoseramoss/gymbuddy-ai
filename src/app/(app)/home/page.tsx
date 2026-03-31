"use client";

import Link from "next/link";
import { useMemo } from "react";

import { TopBar } from "@/components/TopBar";
import type { Workout } from "@/lib/types";
import { useWorkouts } from "@/lib/useWorkouts";

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function computeStreak(workouts: Workout[]) {
  const days = new Set<string>();
  for (const w of workouts) {
    const dt = new Date(w.completedAt);
    if (Number.isNaN(dt.getTime())) continue;
    days.add(dateKey(dt));
  }

  let streak = 0;
  let cursor = startOfDay(new Date());
  while (days.has(dateKey(cursor))) {
    streak += 1;
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function computeWeeklySignal(workouts: Workout[]) {
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setDate(now.getDate() - 6);
  cutoff.setHours(0, 0, 0, 0);

  const buckets = Array.from({ length: 7 }, () => 0);
  for (const w of workouts) {
    const dt = new Date(w.completedAt);
    if (Number.isNaN(dt.getTime())) continue;
    if (dt < cutoff) continue;

    const dayIndex = Math.min(
      6,
      Math.max(0, Math.floor((startOfDay(dt).getTime() - cutoff.getTime()) / 86_400_000))
    );

    let volume = 0;
    for (const ex of w.exercises) {
      for (const s of ex.sets) {
        if (typeof s.reps !== "number") continue;
        if (typeof s.weightLb !== "number") continue;
        volume += s.reps * s.weightLb;
      }
    }
    buckets[dayIndex] += volume;
  }

  return buckets;
}

export default function HomePage() {
  const workouts = useWorkouts() as Workout[];

  const streak = useMemo(() => computeStreak(workouts), [workouts]);
  const weekly = useMemo(() => computeWeeklySignal(workouts), [workouts]);
  const weeklyTotal = useMemo(
    () => weekly.reduce((acc, v) => acc + v, 0),
    [weekly]
  );

  const todayTargetHours = 1.5;

  return (
    <div className="min-h-dvh bg-[color:var(--gb-bg)] text-[color:var(--gb-fg)]">
      <TopBar title="GymBuddy" />

      <main className="px-4 pt-5 md:px-12 md:pt-12">
        <div className="hidden items-start justify-between md:flex">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-[color:var(--gb-muted)]">
              TRACK · TRAIN · TRIUMPH
            </p>
            <h1 className="mt-2 font-mono text-4xl tracking-tight">Dashboard</h1>
          </div>
          <Link
            href="/workouts/new"
            className="gb-btn rounded-2xl bg-[color:var(--gb-bg)] px-6 py-3 text-sm font-semibold text-[color:var(--gb-fg)] shadow-sm ring-1 ring-[var(--gb-border)] hover:bg-[color:var(--gb-card)]"
          >
            Log workout
          </Link>
        </div>

        <section className="grid gap-4 md:grid-cols-[2fr_1fr_1fr] md:gap-6">
          <div className="gb-card rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur md:p-8">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              TODAY’S TARGET
            </p>
            <p className="mt-4 font-mono text-4xl leading-none">
              {todayTargetHours.toFixed(1)}
            </p>
            <p className="mt-2 text-sm text-[color:var(--gb-muted)]">hours trained</p>
            <div className="mt-4 h-3 w-full rounded-full bg-[color:var(--gb-border)]">
              <div className="h-3 w-[55%] rounded-full bg-[color:var(--gb-accent)]" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/workouts/new"
                className="gb-btn rounded-2xl bg-[color:var(--gb-accent)] px-4 py-2 text-sm font-semibold text-[color:var(--gb-accent-fg)]"
              >
                Start session
              </Link>
              <Link
                href="/coach"
                className="gb-btn rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-bg)] px-4 py-2 text-sm font-semibold"
              >
                Ask AI Buddy
              </Link>
            </div>
          </div>

          <div className="gb-card rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur md:p-8">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              STREAK
            </p>
            <p className="mt-4 font-mono text-4xl leading-none">{streak}</p>
            <p className="mt-2 text-sm text-[color:var(--gb-muted)]">days in a row</p>
          </div>

          <div className="gb-card rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur md:p-8">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              WORKOUTS
            </p>
            <p className="mt-4 font-mono text-4xl leading-none">{workouts.length}</p>
            <p className="mt-2 text-sm text-[color:var(--gb-muted)]">total logged</p>
          </div>
        </section>

        <section className="gb-card mt-6 rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
                WEEKLY SIGNAL
              </p>
              <p className="mt-2 font-mono text-3xl">
                {Math.round(weeklyTotal).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-[color:var(--gb-muted)]">volume score</p>
            </div>
            <div className="flex h-16 items-end gap-2">
              {weekly.map((v, idx) => {
                const max = Math.max(...weekly, 1);
                const h = Math.round((v / max) * 100);
                return (
                  <div
                    key={idx}
                    className={
                      "w-5 rounded-xl " +
                      (idx === weekly.length - 1
                        ? "bg-[color:var(--gb-accent)]"
                        : "bg-[color:var(--gb-border)]")
                    }
                    style={{ height: `${Math.max(10, Math.round((h / 100) * 64))}px` }}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-4 md:gap-6">
          <Link
            href="/workouts"
            className="gb-card rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur md:p-8"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              WORKOUTS
            </p>
            <p className="mt-2 text-lg font-semibold">View logs</p>
            <p className="mt-1 text-sm text-[color:var(--gb-muted)]">
              Recent sessions and stats
            </p>
          </Link>
          <Link
            href="/profile"
            className="gb-card rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur md:p-8"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              PROFILE
            </p>
            <p className="mt-2 text-lg font-semibold">Settings</p>
            <p className="mt-1 text-sm text-[color:var(--gb-muted)]">
              Goals and preferences
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
