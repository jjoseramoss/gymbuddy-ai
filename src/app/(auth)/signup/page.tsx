import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function signup(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    redirect("/signup?error=missing");
  }

  const cookieStore = await cookies();

  cookieStore.set("gymbuddy.session", "dev", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/home");
}

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const hasError = searchParams?.error === "missing";

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Sign up</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Create your account.
      </p>

      {hasError ? (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          Enter an email and password.
        </div>
      ) : null}

      <form action={signup} className="mt-6 space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-950"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-950"
          required
        />
        <button
          type="submit"
          className="w-full rounded-2xl bg-zinc-950 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
        >
          Sign up
        </button>
      </form>

      <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-zinc-950 dark:text-white">
          Log in
        </Link>
      </p>
    </main>
  );
}
