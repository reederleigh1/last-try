import { NextResponse } from "next/server";
import { requireSupabaseAdmin } from "@/lib/supabaseAdmin";
import Stripe from "stripe";
import { z } from "zod";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY missing");
if (!NEXT_PUBLIC_SITE_URL) throw new Error("NEXT_PUBLIC_SITE_URL missing");

const stripe = new Stripe(STRIPE_SECRET_KEY);

const createListingSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.coerce.number().nonnegative("Price must be 0 or greater"),
  thumbnail_url: z.preprocess(value => {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed.length === 0 ? undefined : trimmed;
  }, z.string().url().optional())
});

export async function POST(req: Request) {
  const supabaseAdmin = requireSupabaseAdmin();

  const body = await req.json();
  const parseResult = createListingSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Invalid payload",
        details: parseResult.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const { title, description, price, thumbnail_url } = parseResult.data;

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data: listing, error } = await supabaseAdmin
    .from("listings")
    .insert({
      title,
      description,
      price,
      thumbnail_url:
        thumbnail_url ||
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
      slug,
      status: "pending"
    })
    .select("*")
    .single();

  if (error) {
    const status = error.code === "23505" ? 409 : 400;
    const message =
      error.code === "23505"
        ? "A listing with this title already exists. Please choose a different title."
        : error.message;
    return NextResponse.json({ error: message }, { status });
  }

  if (!listing) {
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "OKC Listings - Classified Ad" },
            recurring: { interval: "month" },
            unit_amount: 1000
          },
          quantity: 1
        }
      ],
      success_url: `${NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
      cancel_url: `${NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
      metadata: { listingId: String(listing.id) }
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("[stripe] Failed to create checkout session", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 502 });
  }
}
