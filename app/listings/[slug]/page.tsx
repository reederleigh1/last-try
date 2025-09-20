import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getListingBySlug } from "@/lib/db";
import { getSampleListingBySlug } from "@/data/sampleListings";

type Props = { params: { slug: string } };

async function resolveListing(slug: string) {
  try {
    const result = await getListingBySlug(slug);
    return result;
  } catch (error) {
    return getSampleListingBySlug(slug) || null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = await resolveListing(params.slug);
  if (!listing) {
    return {
      title: "Listing not found | OKC Listings",
      description: "This Oklahoma City listing could not be located."
    };
  }

  const description = listing.description
    ? listing.description.slice(0, 160)
    : "Discover Oklahoma City services and offers optimized for local search visibility.";

  return {
    title: `${listing.title} | OKC Listings SEO directory`,
    description,
    openGraph: {
      title: `${listing.title} | OKC Listings SEO directory`,
      description,
      images: [
        {
          url:
            listing.thumbnail_url ||
            "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
        }
      ]
    },
    alternates: {
      canonical: `https://okclistings1.com/listings/${params.slug}`
    }
  };
}

export default async function ListingView({ params }: Props) {
  const listing = await resolveListing(params.slug);

  if (!listing) {
    return (
      <section className="rounded-3xl border border-brand/20 bg-card/80 p-10 text-center">
        <h1 className="text-2xl font-semibold text-brand">Listing not found</h1>
        <p className="mt-3 text-muted">
          This Oklahoma City listing may have expired. Browse the directory for live offers.
        </p>
        <Link href="/listings" className="mt-6 inline-flex rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-black">
          View all listings
        </Link>
      </section>
    );
  }

  const cityLabel = listing.city || "Oklahoma City, OK";
  const priceLabel =
    typeof listing.price === "number"
      ? `$${listing.price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
      : "$10 monthly subscription";

  return (
    <article className="space-y-10">
      <header className="rounded-3xl border border-brand/20 bg-card/80 p-10 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">{cityLabel}</p>
        <h1 className="mt-4 text-3xl font-bold text-brand">{listing.title}</h1>
        <p className="mt-3 text-sm text-muted">
          High-converting listing optimized for Oklahoma City searches, Google Business Profile visibility, and Stripe-powered recurring billing.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-white">
          <span className="rounded-xl bg-brand/20 px-4 py-2">{priceLabel}</span>
          <span className="rounded-xl bg-brand/10 px-4 py-2">Lead generation ready</span>
          <span className="rounded-xl bg-brand/10 px-4 py-2">Schema enabled</span>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <section className="space-y-6">
          <Image
            src={
              listing.thumbnail_url ||
              "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
            }
            alt={listing.title}
            width={1200}
            height={800}
            className="h-80 w-full rounded-3xl object-cover"
            sizes="(max-width: 1024px) 100vw, 640px"
          />
          <div className="space-y-4 text-muted">
            <p>{listing.description}</p>
            <p>
              Optimized for keywords such as <strong>Oklahoma City {listing.title.toLowerCase()}</strong>,
              near-me searches, and seasonal intent phrases. Add testimonials, location photos, and lead magnets to continue improving rankings.
            </p>
          </div>
          <div className="rounded-3xl border border-brand/20 bg-slate-950/60 p-6 text-white">
            <h2 className="text-lg font-semibold text-brand">Suggested next steps</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>Publish a Google Business Profile update linking to this listing.</li>
              <li>Share on local Facebook groups, Nextdoor, and newsletters for referral traffic.</li>
              <li>Track leads through the dashboard and adjust pricing or offers to improve conversion rate.</li>
            </ul>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-brand/20 bg-card/80 p-6 text-white shadow-xl">
            <h2 className="text-lg font-semibold">Need more visibility?</h2>
            <p className="mt-2 text-sm text-slate-200">
              Request a custom SEO audit, listing enhancements, and backlink campaigns targeting Oklahoma City audiences.
            </p>
            <Link
              href="/login/admin"
              className="mt-4 inline-flex rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-black transition hover:bg-accent"
            >
              Request an audit
            </Link>
          </div>
          <div className="rounded-3xl border border-brand/20 bg-card/60 p-6">
            <h2 className="text-base font-semibold text-brand">Explore more OKC listings</h2>
            <p className="mt-2 text-xs text-muted">
              Continue building authority across Oklahoma City by cross-promoting your offerings.
            </p>
            <Link
              href="/listings"
              className="mt-4 inline-flex rounded-xl border border-brand/40 px-4 py-2 text-xs font-semibold text-brand transition hover:border-brand hover:bg-brand/10"
            >
              View directory
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
