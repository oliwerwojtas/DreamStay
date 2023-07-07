import { useFetchUserDocuments } from "../../hooks/useFetchUserDocuments";

import { ListingItem } from "../../components/ListingItem";
import { Spinner } from "../../components/reusable/Spinner";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
export const Home = () => {
  const [search, setSearched] = useState<string>("");
  const { listings, loading } = useFetchUserDocuments();
  const debounceSearch = useDebounce(search, 300);
  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearched(searchText);
  };
  if (loading) {
    return <Spinner />;
  }
  const filteredListings = listings.filter((listing) => {
    const nameMatches = listing.data.name.toLowerCase().includes(debounceSearch.toLowerCase());
    const addressMatches = listing.data.address
      .toLowerCase()
      .includes(debounceSearch.toLowerCase());
    // const typeMatches = listing.data.type === "sale" || listing.data.type === "rent";
    return nameMatches || addressMatches;
    // && typeMatches
  });

  const saleListings = filteredListings.filter((listing) => listing.data.type === "sale");
  const rentListings = filteredListings.filter((listing) => listing.data.type === "rent");
  return (
    <div>
      <div className="flex flex-col w-full">
        <input
          className="w-1/2 bg-slate-600 text-white"
          onChange={handleSearchText}
          value={search}
          placeholder="Search..."
        />
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
