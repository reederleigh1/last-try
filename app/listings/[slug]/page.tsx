import { getListingBySlug } from "@/src/lib/db";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = await getListingBySlug(params.slug);
  return {
    title: `${listing.title} | OKC Listings`,
    description: (listing.description || "").slice(0, 160),
    openGraph: {
      images: listing.thumbnail_url ? [{ url: listing.thumbnail_url }] : []
    }
  };
}

export default async function ListingView({ params }: Props){
  const listing = await getListingBySlug(params.slug);
  return (
    <article className="prose prose-invert max-w-none">
      <img src={listing.thumbnail_url} alt={listing.title} className="w-full h-80 object-cover rounded-2xl" />
      <h1 className="mt-6">{listing.title}</h1>
      <p className="text-brand text-xl font-bold">${listing.price}</p>
      <p className="mt-4">{listing.description}</p>
      <p className="mt-2 text-muted">Location: {listing.city || "OKC"}</p>
    </article>
  );
}
