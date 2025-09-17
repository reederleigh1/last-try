import { NextResponse } from "next/server";
import supabaseAdmin from "@/src/lib/supabaseAdmin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

export async function POST(req: Request){
  const body = await req.json();

  // Create pending listing
  const slug = String(body.title || "").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  const { data: listing, error } = await supabaseAdmin.from("listings").insert({
    title: body.title,
    description: body.description,
    price: Number(body.price || 0),
    city: body.city || "Oklahoma City",
    thumbnail_url: body.thumbnail_url || "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
    slug,
    status: "pending"
  }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Create Stripe checkout session: $10/month
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: { name: "OKC Listings – Classified Ad" },
        recurring: { interval: "month" },
        unit_amount: 1000
      },
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
    metadata: { listingId: listing.id.toString() }
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
