import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  const cookieStore = await cookies();

  cookieStore.set("gymbuddy.session", "dev", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/home");
}

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const hasError = searchParams?.error === "missing";

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#101015] text-[#F1F0E1]">
      <div className="pointer-events-none absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-45"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/landing.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#101015]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.28),transparent_55%),radial-gradient(circle_at_80%_65%,rgba(241,240,225,0.06),transparent_60%)]" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-16">
        <p className="font-mono text-xs tracking-[0.25em] text-[#F1F0E1]/60">
          TRACK · TRAIN · TRIUMPH
        </p>
        <h1 className="mt-4 font-mono text-4xl tracking-tight">Log in</h1>
        <p className="mt-3 text-sm text-[#F1F0E1]/65">Welcome back.</p>

        {hasError ? (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-[#F1F0E1]/70 backdrop-blur">
            Enter an email and password.
          </div>
        ) : null}

        <form
          action={login}
          className="mt-6 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
        >
          <div className="grid gap-2">
            <label className="font-mono text-[10px] tracking-[0.25em] text-[#F1F0E1]/55">
              EMAIL
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-2xl border border-white/10 bg-[#101015]/40 px-4 py-3 text-sm text-[#F1F0E1] outline-none focus:border-emerald-400"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="font-mono text-[10px] tracking-[0.25em] text-[#F1F0E1]/55">
              PASSWORD
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-[#101015]/40 px-4 py-3 text-sm text-[#F1F0E1] outline-none focus:border-emerald-400"
              required
            />
          </div>

          <button
            type="submit"
            className="gb-btn w-full rounded-2xl bg-emerald-400 py-3 text-sm font-semibold text-black"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-sm text-[#F1F0E1]/65">
          New here?{" "}
          <Link href="/signup" className="font-medium text-[#F1F0E1]">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
