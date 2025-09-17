import Link from "next/link";

export default function ListingCard({ item }:{ item: any }){
  return (
    <article className="bg-card rounded-2xl p-4 border border-brand/40 hover:border-brand transition">
      <img src={item.thumbnail_url} alt={item.title} className="w-full h-48 object-cover rounded-xl" />
      <h3 className="mt-3 text-lg font-semibold text-brand">{item.title}</h3>
      <p className="text-muted">${item.price}</p>
      <Link href={`/listings/${item.slug}`} className="mt-3 inline-block px-4 py-2 rounded-xl bg-brand text-black hover:bg-accent transition">
        View
      </Link>
    </article>
  );
}
