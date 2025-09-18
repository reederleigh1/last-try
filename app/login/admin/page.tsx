"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

const ADMIN_ROLE_VALUE = "admin";

export default function AdminLoginPage(){
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("login") || "").trim();
    const password = String(form.get("password") || "");

    setStatus(null);
    setError(null);

    if (!email || !password){
      setError("Admin email and passphrase are required.");
      return;
    }

    setLoading(true);

    try{
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const role = userData.user?.user_metadata?.role;
      if (role !== ADMIN_ROLE_VALUE){
        await supabase.auth.signOut();
        throw new Error("This account is not authorized for admin access.");
      }

      setStatus("Admin verified. Redirecting to the dashboard...");
      router.replace("/dashboard");
      router.refresh();
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
        <p className="text-xs uppercase tracking-[0.4em] text-brand">Admin command</p>
        <h1 className="mt-3 text-3xl font-bold">Authenticate to orchestrate the marketplace</h1>
        <p className="mt-3 text-muted">
          Only authorized platform operators can approve listings, manage subscribers, or trigger refunds.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-brand/20 bg-card p-8 shadow-xl">
        <label className="block text-sm font-semibold text-muted">
          Admin email
          <input
            name="login"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-brand/30 bg-card/70 px-4 py-3 focus:border-brand focus:outline-none"
            placeholder="admin@okclistings1.com"
          />
        </label>
        <label className="block text-sm font-semibold text-muted">
          Passphrase
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full rounded-xl border border-brand/30 bg-card/70 px-4 py-3 focus:border-brand focus:outline-none"
            placeholder="********"
          />
        </label>
        <label className="block text-sm font-semibold text-muted">
          One-time key
          <input
            name="otp"
            type="text"
            className="mt-1 w-full rounded-xl border border-brand/30 bg-card/70 px-4 py-3 focus:border-brand focus:outline-none"
            placeholder="Optional security code"
            disabled
          />
          <span className="mt-1 block text-xs text-muted">
            Coming soon: wire this input to your TOTP or magic-link workflow.
          </span>
        </label>
        <button
          type="submit"
          className="w-full rounded-xl border border-brand/40 bg-slate-950 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-brand hover:bg-slate-900"
          disabled={loading}
        >
          {loading ? "Validating..." : "Enter command center"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {status && <p className="text-sm text-muted">{status}</p>}
      </form>
      <div className="flex items-center justify-between text-sm text-muted">
        <Link href="/" className="underline underline-offset-4">Return home</Link>
        <Link href="/dashboard" className="underline underline-offset-4">Go to dashboard</Link>
      </div>
    </div>
  );
}
