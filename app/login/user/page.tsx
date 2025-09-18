"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function UserLoginPage(){
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    const displayName = String(form.get("name") || "").trim();

    setStatus(null);
    setError(null);

    if (!email || !password){
      setError("Email and password are required.");
      return;
    }

    if (mode === "signup" && password !== confirm){
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try{
      if (mode === "signin"){
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        setStatus("Signed in! Redirecting to your dashboard...");
        router.replace("/dashboard");
        router.refresh();
      }else{
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: displayName ? { data: { name: displayName } } : undefined
        });
        if (signUpError) throw signUpError;
        setStatus("Account created. Check your inbox to verify your email before signing in.");
        setMode("signin");
      }
    }catch(err: any){
      const message = err?.message || "Unexpected error. Try again.";
      setError(message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center space-y-8 py-16">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-brand">Member access</p>
        <h1 className="mt-3 text-3xl font-bold">Manage your OKC listing account</h1>
        <p className="mt-3 text-muted">
          Sign in to update active ads, or create a new account to launch your first listing.
        </p>
      </div>

      <div className="flex gap-2 rounded-2xl border border-brand/20 bg-card/70 p-1 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-xl px-4 py-3 transition ${mode === "signin" ? "bg-brand text-black" : "text-muted"}`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-xl px-4 py-3 transition ${mode === "signup" ? "bg-brand text-black" : "text-muted"}`}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-brand/20 bg-card p-8 shadow-xl">
        {mode === "signup" && (
          <label className="block text-sm font-semibold text-muted">
            Business / display name
            <input
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-xl border border-brand/30 bg-card/70 px-4 py-3 focus:border-brand focus:outline-none"
              placeholder="OKC Rentals Co."
            />
          </label>
        )}
        <label className="block text-sm font-semibold text-muted">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-brand/30 bg-card/70 px-4 py-3 focus:border-brand focus:outline-none"
            placeholder="you@example.com"
          />
        </label>
        <label className="block text-sm font-semibold text-muted">
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className="mt-1 w-full rounded-xl border border-brand/30 bg-card/70 px-4 py-3 focus:border-brand focus:outline-none"
            placeholder="********"
          />
        </label>
        {mode === "signup" && (
          <label className="block text-sm font-semibold text-muted">
            Confirm password
            <input
              name="confirm"
              type="password"
              required
              autoComplete="new-password"
              className="mt-1 w-full rounded-xl border border-brand/30 bg-card/70 px-4 py-3 focus:border-brand focus:outline-none"
              placeholder="********"
            />
          </label>
        )}
        <button
          type="submit"
          className="w-full rounded-xl bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-accent"
          disabled={loading}
        >
          {loading
            ? mode === "signin"
              ? "Checking access..."
              : "Creating account..."
            : mode === "signin"
              ? "Log in"
              : "Create account"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {status && <p className="text-sm text-muted">{status}</p>}
      </form>

      <div className="flex items-center justify-between text-sm text-muted">
        <Link href="/" className="underline underline-offset-4">Return home</Link>
        <Link href="/create" className="underline underline-offset-4">Skip to posting an ad</Link>
      </div>
    </div>
  );
}
