import supabaseAdmin from "./supabaseAdmin";

export async function getActiveListings(limit = 24) {
  const { data, error } = await supabaseAdmin
    .from("listings")
    .select("id,title,price,city,thumbnail_url,slug,created_at")
    .eq("status","active")
    .order("created_at",{ ascending:false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getListingBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}
