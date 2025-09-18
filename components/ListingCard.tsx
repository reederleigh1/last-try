import Link from "next/link";

type ListingCardItem = {
  id?: string | number;
  slug?: string | null;
  title: string;
  price?: number | null;
  thumbnail_url?: string | null;
  city?: string | null;
  description?: string | null;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

interface ListingCardProps {
  item: ListingCardItem;
}

export default function ListingCard({ item }: ListingCardProps) {
  const targetSlug = item.slug || item.id;
  const priceLabel =
    typeof item.price === "number"
      ? currency.format(item.price)
      : "$10 monthly";
  const cityLabel = item.city?.trim() || "Oklahoma City, OK";
  const summary = item.description
    ? `${item.description.slice(0, 96)}${item.description.length > 96 ? "…" : ""}`
    : "SEO-optimized Oklahoma City listing for local services, rentals, and events.";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand/30 bg-card/80 shadow-xl transition hover:border-brand/60">
      <img
        src={
          item.thumbnail_url ||
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
        }
        alt={item.title}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{cityLabel}</p>
          <h3 className="mt-2 text-lg font-semibold text-brand">{item.title}</h3>
          <p className="text-sm text-muted">{summary}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-semibold text-white">{priceLabel}</span>
          <Link
            href={typeof targetSlug === "string" ? `/listings/${targetSlug}` : "/listings"}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-black transition hover:bg-accent"
          >
            View listing
          </Link>
        </div>
      </div>
    </article>
  );
}
