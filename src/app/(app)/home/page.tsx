import Link from "next/link";

import { TopBar } from "@/components/TopBar";

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <TopBar title="GymBuddy" />

      <main className="px-4 pt-5 md:px-6 md:pt-8">
        <div className="hidden items-end justify-between md:flex">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Quick overview and shortcuts.
            </p>
          </div>
        </div>

        <section className="rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-700 p-5 text-white">
          <p className="text-xs font-medium text-white/70">Today</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Ready to train smarter?
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Log a workout, then get quick coaching.
          </p>
          <div className="mt-4 flex gap-2">
            <Link
              href="/workouts/new"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-medium text-zinc-950"
            >
              Log workout
            </Link>
            <Link
              href="/coach"
              className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20"
            >
              Ask coach
            </Link>
          </div>
        </section>

        <section className="mt-5">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Quick actions
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link
              href="/workouts"
              className="rounded-2xl border border-zinc-200/70 bg-white p-4 text-sm font-medium text-zinc-950 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50"
            >
              View workouts
              <p className="mt-1 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                Your recent logs
              </p>
            </Link>
            <Link
              href="/profile"
              className="rounded-2xl border border-zinc-200/70 bg-white p-4 text-sm font-medium text-zinc-950 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50"
            >
              Profile
              <p className="mt-1 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                Goals & settings
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-zinc-200/70 bg-white p-5 dark:border-white/10 dark:bg-zinc-950">
          <h3 className="text-sm font-semibold">MVP status</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            This is frontend-only (mock storage). Next step: wire Supabase + auth.
          </p>
        </section>
      </main>
    </div>
  );
}
