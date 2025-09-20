import { getActiveListings } from "@/lib/db";
import ListingCard from "../../components/ListingCard";
import { sampleListings } from "@/data/sampleListings";

export const dynamic = "force-dynamic";

export default async function ListingsPage() {
  const listings = await getActiveListings(60);
  const directoryListings = listings && listings.length ? listings : sampleListings;

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-brand/20 bg-card/80 p-10 shadow-2xl">
        <h1 className="text-3xl font-bold">Oklahoma City classifieds directory</h1>
        <p className="mt-3 text-muted">
          Browse SEO-optimized listings for OKC services, rentals, pop-up events, fitness studios, and local experiences. Every ad is structured for Google Business Profile, near-me searches, and high-intent conversion phrases.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-brand/20 bg-slate-950/60 p-5 text-white">
            <h2 className="text-lg font-semibold">What you will find</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>- Ready-to-book services with transparent pricing and CTA tracking</li>
              <li>- Localized copy for Midtown, Plaza District, Bricktown, Edmond, and more</li>
              <li>- Events, rentals, and subscription offers updated in real time</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-brand/20 bg-slate-900/60 p-5 text-white">
            <h2 className="text-lg font-semibold">Trending search phrases</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>- &quot;oklahoma city cowork day pass&quot;</li>
              <li>- &quot;okc meal prep delivery&quot;</li>
              <li>- &quot;plaza district pop-up venue&quot;</li>
              <li>- &quot;bricktown event marketing&quot;</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        {directoryListings.map((item: any) => (
          <ListingCard key={item.slug || item.id} item={item} />
        ))}
      </div>
    </div>
  );
}


