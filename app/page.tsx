import Link from "next/link";
import { getActiveListings } from "@/lib/db";
import ListingCard from "../components/ListingCard";

export default async function Home(){
  const listings = await getActiveListings(12);
  return (
    <section>
      <div className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">OKC Classifieds</h1>
        <p className="mt-3 text-lg text-muted">Post any ad for <span className="text-brand font-semibold">$10/month</span>. Cancel anytime.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/create" className="px-5 py-3 rounded-2xl bg-brand text-black hover:bg-accent transition">Post an Ad</Link>
          <Link href="/listings" className="px-5 py-3 rounded-2xl border border-brand hover:bg-card transition">Browse Listings</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {listings?.map((item:any)=>(<ListingCard key={item.id} item={item}/>))}
      </div>
    </section>
  );
}


