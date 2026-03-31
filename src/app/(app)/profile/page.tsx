"use client";

import { useEffect, useState } from "react";

import { TopBar } from "@/components/TopBar";

type FitnessGoal = "Lose fat" | "Build muscle" | "Stay active";
type Language = "English" | "Spanish";

const GOAL_KEY = "gymbuddy.goal.v1";
const REMINDERS_KEY = "gymbuddy.pref.reminders.v1";
const WEEKLY_KEY = "gymbuddy.pref.weekly.v1";
const LANG_KEY = "gymbuddy.pref.lang.v1";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={
        "relative h-7 w-12 rounded-full border transition-colors " +
        (checked
          ? "border-transparent bg-[color:var(--gb-accent)]"
          : "border-[var(--gb-border)] bg-[color:var(--gb-card)]")
      }
    >
      <span
        className={
          "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[color:var(--gb-bg)] shadow-sm transition-transform " +
          (checked ? "translate-x-6" : "translate-x-1")
        }
      />
    </button>
  );
}

export default function ProfilePage() {
  const [goal, setGoal] = useState<FitnessGoal>(() => {
    if (typeof window === "undefined") return "Stay active";
    const stored = window.localStorage.getItem(GOAL_KEY) as FitnessGoal | null;
    return stored ?? "Stay active";
  });

  const [reminders, setReminders] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(REMINDERS_KEY) !== "0";
  });

  const [weeklySummary, setWeeklySummary] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(WEEKLY_KEY) !== "0";
  });

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "English";
    const stored = window.localStorage.getItem(LANG_KEY) as Language | null;
    return stored === "Spanish" ? "Spanish" : "English";
  });

  useEffect(() => {
    window.localStorage.setItem(GOAL_KEY, goal);
  }, [goal]);

  useEffect(() => {
    window.localStorage.setItem(REMINDERS_KEY, reminders ? "1" : "0");
  }, [reminders]);

  useEffect(() => {
    window.localStorage.setItem(WEEKLY_KEY, weeklySummary ? "1" : "0");
  }, [weeklySummary]);

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, language);
  }, [language]);

  return (
    <div className="min-h-dvh bg-[color:var(--gb-bg)] text-[color:var(--gb-fg)]">
      <TopBar title="Profile" />

      <main className="px-4 pt-4 md:px-10 md:pt-10">
        <div className="mb-6 hidden md:block">
          <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-3 font-mono text-xs tracking-[0.25em] text-[color:var(--gb-muted)]">
            PROFILE
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              PROFILE
            </p>
            <p className="mt-2 text-base font-semibold">Fitness goal</p>

            <div className="mt-4 grid gap-3">
              {(["Lose fat", "Build muscle", "Stay active"] as FitnessGoal[]).map(
                (g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={
                      "flex items-center justify-between rounded-3xl border px-5 py-5 text-left text-sm font-medium transition-colors " +
                      (goal === g
                        ? "border-[color:var(--gb-accent)] bg-[color:var(--gb-card-strong)]"
                        : "border-[var(--gb-border)] bg-[color:var(--gb-bg)] hover:bg-[color:var(--gb-card-strong)]")
                    }
                  >
                    <span className="text-base">{g}</span>
                    <span
                      className={
                        "grid h-8 w-8 place-items-center rounded-2xl border text-xs " +
                        (goal === g
                          ? "border-[color:var(--gb-accent)] bg-[color:var(--gb-accent)] text-[color:var(--gb-accent-fg)]"
                          : "border-[var(--gb-border)] bg-[color:var(--gb-card)] text-[color:var(--gb-muted)]")
                      }
                    >
                      ✓
                    </span>
                  </button>
                )
              )}
            </div>
          </section>

          <section className="grid gap-4">
            <div className="rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
                PREFERENCES
              </p>
              <p className="mt-2 text-base font-semibold">Notifications</p>

              <div className="mt-4 grid gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Workout reminders</p>
                    <p className="mt-1 text-sm text-[color:var(--gb-muted)]">
                      Nudge me to train
                    </p>
                  </div>
                  <Toggle checked={reminders} onChange={setReminders} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Weekly summary</p>
                    <p className="mt-1 text-sm text-[color:var(--gb-muted)]">
                      Signal and streak recap
                    </p>
                  </div>
                  <Toggle checked={weeklySummary} onChange={setWeeklySummary} />
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur">
              <p className="text-base font-semibold">Language</p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="mt-3 w-full rounded-2xl border border-[var(--gb-border)] bg-[color:var(--gb-bg)] px-4 py-3 text-sm outline-none focus:border-[color:var(--gb-accent)]"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[var(--gb-border)] bg-[color:var(--gb-card)] p-6 backdrop-blur">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--gb-muted)]">
              ACCOUNT
            </p>
            <p className="mt-2 text-base font-semibold">Account & Security</p>

            <div className="mt-4 grid gap-3">
              <div>
                <p className="text-xs font-medium text-[color:var(--gb-muted)]">Email</p>
                <p className="mt-1 text-sm">user@email.com</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[color:var(--gb-muted)]">
                  Password
                </p>
                <p className="mt-1 text-sm">••••</p>
              </div>
            </div>

            <a
              href="/logout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[color:var(--gb-accent)] py-3 text-sm font-semibold text-[color:var(--gb-accent-fg)]"
            >
              Log out
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
