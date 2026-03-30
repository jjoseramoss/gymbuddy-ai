import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-6 py-16">
      <p className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
        GymBuddy AI
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
        Train smarter with an AI buddy that remembers your workouts.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
        Log workouts, visualize progress, and chat with your coach using your history.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
        >
          Sign up
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-950 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50"
        >
          Log in
        </Link>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {[
          {
            title: "Workouts",
            body: "Quick logging with exercises + sets.",
          },
          {
            title: "Dashboard",
            body: "Progress snapshots and trends.",
          },
          {
            title: "AI Buddy",
            body: "Ask questions using your workout history.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-zinc-200/70 bg-white p-5 dark:border-white/10 dark:bg-zinc-950"
          >
            <p className="text-sm font-semibold tracking-tight">{card.title}</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
