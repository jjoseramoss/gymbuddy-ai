import Link from "next/link";

export default function Page() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#101015] text-[#F1F0E1]">
      <div className="pointer-events-none absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/landing.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#101015]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(80,99,133,0.50),transparent_55%),radial-gradient(circle_at_78%_70%,rgba(241,240,225,0.07),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
        <header className="gb-animate flex items-center justify-between [animation:gb-fade-up_700ms_ease-out_both]">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[#F1F0E1] text-[#101015]">
              <span className="font-mono text-xs font-semibold tracking-widest">GB</span>
            </div>
            <div className="leading-tight">
              <p className="font-mono text-xs tracking-[0.25em] text-[#F1F0E1]/70">
                GYMBUDDY
              </p>
              <p className="text-sm font-medium text-[#F1F0E1]">Consistency OS</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-2xl border border-[#F1F0E1]/15 bg-transparent px-4 py-2 text-sm font-medium text-[#F1F0E1]/90 hover:border-[#F1F0E1]/25"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-2xl bg-[#F1F0E1] px-4 py-2 text-sm font-semibold text-[#101015] hover:bg-[#F1F0E1]/90"
            >
              Sign up
            </Link>
          </div>
        </header>

        <section className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="gb-animate inline-flex items-center gap-2 rounded-2xl border border-[#F1F0E1]/10 bg-[#F1F0E1]/[0.04] px-4 py-2 [animation:gb-fade-up_800ms_ease-out_both] [animation-delay:120ms]">
              <span className="h-2 w-2 rounded-full bg-[#506385]" />
              <span className="font-mono text-xs tracking-[0.22em] text-[#F1F0E1]/70">
                TRACK · TRAIN · TRIUMPH
              </span>
            </div>

            <h1 className="gb-animate mt-6 font-mono text-4xl leading-[1.05] tracking-tight md:text-6xl [animation:gb-fade-up_900ms_ease-out_both] [animation-delay:200ms]">
              Consistency is the goal.
              <span className="block text-[#F1F0E1]/70">Progress is the result.</span>
            </h1>

            <p className="gb-animate mt-5 max-w-xl text-base leading-relaxed text-[#F1F0E1]/70 [animation:gb-fade-up_900ms_ease-out_both] [animation-delay:280ms]">
              GymBuddy is a high-performance training log designed for clarity. Log
              every set, visualize your gains, and build a routine that sticks — even
              on the days you’d rather stay home.
            </p>

            <div className="gb-animate mt-7 flex flex-wrap gap-3 [animation:gb-fade-up_900ms_ease-out_both] [animation-delay:360ms]">
              <Link
                href="/signup"
                className="rounded-2xl bg-[#506385] px-5 py-3 text-sm font-semibold text-[#F1F0E1] hover:bg-[#506385]/90"
              >
                Get started
              </Link>
              <Link
                href="/login"
                className="rounded-2xl border border-[#F1F0E1]/15 bg-transparent px-5 py-3 text-sm font-semibold text-[#F1F0E1]/90 hover:border-[#F1F0E1]/25"
              >
                Continue
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Workout logging",
                  value: "BUILT FOR SPEED",
                  delay: "[animation-delay:440ms]",
                },
                {
                  label: "Progress",
                  value: "VISUALIZED",
                  delay: "[animation-delay:520ms]",
                },
                {
                  label: "AI buddy",
                  value: "POWERED BY DATA",
                  delay: "[animation-delay:600ms]",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={
                    "gb-animate rounded-3xl border border-[#F1F0E1]/10 bg-[#F1F0E1]/[0.04] px-5 py-4 [animation:gb-fade-up_900ms_ease-out_both] " +
                    stat.delay
                  }
                >
                  <p className="font-mono text-[10px] tracking-[0.25em] text-[#F1F0E1]/55">
                    {stat.label.toUpperCase()}
                  </p>
                  <p className="mt-2 font-mono text-base tracking-tight md:text-lg">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="gb-animate rounded-3xl border border-[#F1F0E1]/10 bg-[#506385] p-5 text-[#F1F0E1] [animation:gb-fade-up_900ms_ease-out_both] [animation-delay:320ms]">
                <p className="font-mono text-[10px] tracking-[0.25em] text-[#F1F0E1]/75">
                  TODAY’S TARGET
                </p>
                <p className="mt-4 font-mono text-4xl leading-none">1.8</p>
                <p className="mt-2 text-sm text-[#F1F0E1]/80">hours trained</p>
              </div>

              <div className="gb-animate rounded-3xl border border-[#F1F0E1]/10 bg-[#F1F0E1]/[0.04] p-5 [animation:gb-fade-up_900ms_ease-out_both] [animation-delay:400ms]">
                <p className="font-mono text-[10px] tracking-[0.25em] text-[#F1F0E1]/55">
                  STREAK
                </p>
                <p className="mt-4 font-mono text-4xl leading-none">8</p>
                <p className="mt-2 text-sm text-[#F1F0E1]/70">days in a row</p>
              </div>
            </div>

            <div className="gb-animate rounded-3xl border border-[#F1F0E1]/10 bg-[#F1F0E1]/[0.04] p-5 [animation:gb-fade-up_900ms_ease-out_both] [animation-delay:480ms]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-[#F1F0E1]/55">
                    WEEKLY SIGNAL
                  </p>
                  <p className="mt-2 font-mono text-3xl">1,592</p>
                  <p className="mt-1 text-sm text-[#F1F0E1]/70">total volume</p>
                </div>
                <div className="flex h-16 items-end gap-2">
                  {[8, 12, 7, 18, 13, 10].map((h, idx) => (
                    <div
                      key={idx}
                      className={
                        "w-5 rounded-xl " +
                        (idx === 3 ? "bg-[#506385]" : "bg-[#F1F0E1]/15")
                      }
                      style={{ height: `${h * 3}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="gb-animate rounded-3xl border border-[#F1F0E1]/10 bg-[#F1F0E1]/[0.04] p-5 [animation:gb-fade-up_900ms_ease-out_both] [animation-delay:560ms]">
                <p className="font-mono text-[10px] tracking-[0.25em] text-[#F1F0E1]/55">
                  LAST WORKOUT
                </p>
                <p className="mt-3 font-mono text-lg">Push session</p>
                <div className="mt-3 space-y-2">
                  {[
                    { name: "Bench", meta: "4x6" },
                    { name: "Incline", meta: "3x10" },
                    { name: "Triceps", meta: "3x12" },
                  ].map((row) => (
                    <div
                      key={row.name}
                      className="flex items-center justify-between rounded-2xl bg-[#101015]/30 px-3 py-2 text-xs"
                    >
                      <span className="text-[#F1F0E1]/80">{row.name}</span>
                      <span className="font-mono text-[#F1F0E1]/55">{row.meta}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gb-animate rounded-3xl border border-[#F1F0E1]/10 bg-[#F1F0E1]/[0.04] p-5 [animation:gb-fade-up_900ms_ease-out_both] [animation-delay:640ms]">
                <p className="font-mono text-[10px] tracking-[0.25em] text-[#F1F0E1]/55">
                  AI BUDDY
                </p>
                <div className="mt-3 space-y-2">
                  <div className="ml-auto rounded-2xl bg-[#506385]/40 px-3 py-2 text-xs text-[#F1F0E1]/85">
                    How do I progress bench next week?
                  </div>
                  <div className="rounded-2xl bg-[#101015]/30 px-3 py-2 text-xs text-[#F1F0E1]/75">
                    Add 5lb if you hit every set with control.
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-[#F1F0E1]/45">
                  WORKOUT-AWARE CHAT
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="gb-animate mt-10 flex flex-col gap-2 border-t border-[#F1F0E1]/10 pt-6 text-xs text-[#F1F0E1]/45 md:mt-14 md:flex-row md:items-center md:justify-between [animation:gb-fade-in_900ms_ease-out_both] [animation-delay:720ms]">
          <p className="font-mono tracking-[0.12em]">BUILT FOR CONSISTENCY</p>
          <p>Clarity first. Consistency always.</p>
        </footer>
      </div>
    </main>
  );
}
