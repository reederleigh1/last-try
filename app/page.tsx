import Link from "next/link";
import { getActiveListings } from "@/lib/db";
import ListingCard from "../components/ListingCard";

export const dynamic = "force-dynamic";

const stats = [
  { label: "Listings this week", value: "48" },
  { label: "Average approval", value: "< 2 hrs" },
  { label: "Active subscribers", value: "1.2k" }
];

const features = [
  {
    title: "Instant Publishing",
    description:
      "Launch new classifieds in minutes with streamlined workflows and rich media support."
  },
  {
    title: "Realtime Insights",
    description:
      "Monitor impressions, leads, and renewals from a unified dashboard calibrated for OKC businesses."
  },
  {
    title: "Secure Billing",
    description:
      "Stripe-powered subscriptions keep payments automated, transparent, and cancelable anytime."
  }
];

export default async function Home() {
  const listings = await getActiveListings(12);

  return (
    <div className="space-y-24 pb-16">
      <section className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-white shadow-2xl md:px-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand/40 via-transparent to-transparent opacity-60" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand">Future of OKC classifieds</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            The hyper-modern marketplace for Oklahoma City entrepreneurs
          </h1>
          <p className="mt-6 text-lg text-slate-200 md:text-xl">
            Showcase services, rentals, or products with cinematic visuals, frictionless subscriptions, and real-time analytics. Build trust with a platform that feels like the future of local commerce.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/listings"
              className="rounded-2xl bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-lg transition hover:bg-white"
            >
              Explore Listings
            </Link>
            <Link
              href="/create"
              className="rounded-2xl border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10"
            >
              Post an Ad
            </Link>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-200">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-3xl border border-brand/10 bg-card/80 p-8 shadow-xl backdrop-blur transition hover:border-brand/40"
          >
            <h3 className="text-xl font-semibold text-brand">{feature.title}</h3>
            <p className="mt-3 text-sm text-muted">{feature.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-brand/20 bg-card p-10 shadow-2xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold">Choose your control center</h2>
            <p className="text-muted">
              Advertisers and platform operators have dedicated portals. Pick the experience that fits you and plug into the OKC Listings ecosystem in seconds.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-brand/20 bg-slate-950/70 p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold">Member access</h3>
              <p className="mt-3 text-sm text-slate-300">
                Manage active ads, billing, and performance metrics across your storefront.
              </p>
              <Link
                href="/login/user"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-black transition hover:bg-accent"
              >
                User Login
              </Link>
            </div>
            <div className="rounded-2xl border border-brand/20 bg-slate-900/60 p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold">Admin command</h3>
              <p className="mt-3 text-sm text-slate-300">
                Approve listings, monitor subscriptions, and orchestrate the marketplace from one console.
              </p>
              <Link
                href="/login/admin"
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Latest active listings</h2>
            <p className="text-sm text-muted">
              Curated ads from Oklahoma City businesses, makers, and service providers.
            </p>
          </div>
          <Link
            href="/listings"
            className="rounded-xl border border-brand/30 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/10"
          >
            View all
          </Link>
        </div>
        {listings && listings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {listings.map((item: any) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-brand/30 bg-card/60 p-12 text-center text-muted">
            No active listings yet. Be the first to launch a futuristic OKC ad.
          </div>
        )}
      </section>
    </div>
  );
}
