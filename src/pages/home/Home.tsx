import { useFetchUserDocuments } from "../../hooks/useFetchUserDocuments";

import { ListingItem } from "../../components/ListingItem";
export const Home = () => {
  const { listings } = useFetchUserDocuments();
  const saleListings = listings.filter((listing) => listing.data.type === "sale");
  const rentListings = listings.filter((listing) => listing.data.type === "rent");
  return (
    <div>
      <div className="flex flex-col">
        <span className="text-xl px-4 py-4">Checkout apartaments for buy!</span>
        <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 w-full">
          {saleListings.map((listing) => (
            <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl px-4 py-4">Checkout apartaments for rent!</span>
        <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 w-full ">
          {rentListings.map((listing) => (
            <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
          ))}
        </div>
      </div>
    </div>
  );
};
