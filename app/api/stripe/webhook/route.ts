import { headers } from "next/headers";
import Stripe from "stripe";
import { requireSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-27.basil" });

export async function POST(req: Request) {
  const sig = (await headers()).get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const listingId = session.metadata?.listingId;
    if (listingId) {
      const supabaseAdmin = requireSupabaseAdmin();
      await supabaseAdmin.from("listings").update({ status: "active" }).eq("id", listingId);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    // optional: deactivate listing on cancellation
  }

  return new Response(null, { status: 200 });
}
