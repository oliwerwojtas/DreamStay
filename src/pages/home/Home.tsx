import { useFetchUserDocuments } from "../../hooks/useFetchUserDocuments";

import { ListingItem } from "../../components/ListingItem";
import { Spinner } from "../../components/reusable/Spinner";
import { ChangeEvent, useState } from "react";

export const Home = () => {
  const { listings, loading } = useFetchUserDocuments();

  const saleListings = listings.filter((listing) => listing.data.type === "sale");
  const rentListings = listings.filter((listing) => listing.data.type === "rent");

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex flex-col w-full">
        <span className="text-2xl px-4 py-4 text-center font-semibold">
          Checkout apartaments for buy!
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-6 mx-auto">
          {saleListings.map((listing) => (
            <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-wrap">
        <span className="text-2xl px-4 py-4 text-center font-semibold">
          Checkout apartaments for rent!
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-6 mx-auto">
          {rentListings.map((listing) => (
            <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
          ))}
        </div>
      </div>
    </div>
  );
};
