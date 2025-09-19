import LandingPage from "@/components/LandingPage";
import { getActiveListings } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const listings = await getActiveListings(4);
  return <LandingPage listings={listings ?? []} />;
}
