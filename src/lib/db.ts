import { getSampleListingBySlug, sampleListings } from "@/data/sampleListings";
import { getSupabaseAdmin } from "./supabaseAdmin";

export async function getActiveListings(limit = 24) {
  const supabaseAdmin = getSupabaseAdmin();

  if (!supabaseAdmin) {
    return sampleListings.slice(0, limit);
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("listings")
      .select("id,title,price,created_at,slug,city,thumbnail_url,description")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    if (!data || data.length === 0) {
      return sampleListings.slice(0, limit);
    }

    return data;
  } catch (error) {
    console.error("[db] Falling back to sample listings", error);
    return sampleListings.slice(0, limit);
  }
}

export async function getListingBySlug(slug: string) {
  const supabaseAdmin = getSupabaseAdmin();

  if (!supabaseAdmin) {
    return getSampleListingBySlug(slug) || null;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("listings")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error(`[db] Falling back to sample listing for slug: ${slug}`, error);
  }

  return getSampleListingBySlug(slug) || null;
}
