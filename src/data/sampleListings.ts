export interface SampleListing {
  slug: string;
  title: string;
  price: number;
  city: string;
  description: string;
  thumbnail_url: string;
}

export const sampleListings: SampleListing[] = [
  {
    slug: "okc-organic-meal-prep",
    title: "OKC Organic Meal Prep & Delivery",
    price: 129,
    city: "Oklahoma City, OK",
    description:
      "Weekly farm-to-table meals delivered across OKC. SEO-rich service area copy and nutrition keywords included in every listing.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "midtown-cowork-office",
    title: "Midtown Cowork & Podcast Studio Rentals",
    price: 249,
    city: "Oklahoma City, OK",
    description:
      "Book flexible cowork suites, podcast studios, and conference rooms with high-intent local search phrases baked in for conversions.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "plaza-district-events",
    title: "Plaza District Pop-Up & Event Marketing",
    price: 99,
    city: "Oklahoma City, OK",
    description:
      "Promote art walks, food truck rallies, and brand activations with Plaza District SEO keywords and Google Events schema guidance.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1518609571773-39b7d303a86f?q=80&w=1200&auto=format&fit=crop"
  }
];

export function getSampleListingBySlug(slug: string) {
  return sampleListings.find((item) => item.slug === slug);
}
