import { getActiveListings } from "@/src/lib/db";
import ListingCard from "@/components/ListingCard";

export default async function ListingsPage(){
  const listings = await getActiveListings(60);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Latest Listings</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {listings?.map((item:any)=>(<ListingCard key={item.id} item={item}/>))}
      </div>
    </div>
  );
}
