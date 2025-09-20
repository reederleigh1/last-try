"use client";
import { useState, type FormEvent } from "react";

export default function CreatePage(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true); setError(null);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/listings", { method:"POST", body: JSON.stringify(payload) });
    if(!res.ok){ setError("Failed to start checkout"); setLoading(false); return; }
    const { checkoutUrl } = await res.json();
    window.location.href = checkoutUrl;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Post an Ad — $10/month</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" className="w-full px-3 py-2 rounded-xl bg-card border border-brand/40" required />
        <textarea name="description" placeholder="Description" className="w-full px-3 py-2 rounded-xl bg-card border border-brand/40" required rows={6} />
        <input type="number" name="price" placeholder="Price" className="w-full px-3 py-2 rounded-xl bg-card border border-brand/40" required />
        <input name="city" placeholder="City (e.g., Oklahoma City)" className="w-full px-3 py-2 rounded-xl bg-card border border-brand/40" />
        <input name="thumbnail_url" placeholder="Image URL" className="w-full px-3 py-2 rounded-xl bg-card border border-brand/40" />
        <button disabled={loading} className="px-5 py-3 rounded-2xl bg-brand text-black hover:bg-accent transition">{loading? "Redirecting..." : "Proceed to Checkout"}</button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}



