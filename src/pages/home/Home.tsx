import { useFetchUserListings } from "../../hooks/useFetchUserListings";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
//components
import { ListingItem } from "../../components/ListingItem";
import { Spinner } from "../../components/shared/Spinner";
import SearchBar from "../../components/SearchBar";
import { Pagination } from "../../components/Pagination";
import { BackToTopButton } from "../../components/BackToTopButton";
//utilities
import { ChangeEvent } from "react";

const Home = () => {
  const [search, setSearched] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("date");
  const [currentSalePage, setCurrentSalePage] = useState<number>(1);
  const [currentRentPage, setCurrentRentPage] = useState<number>(1);
  const [apartamentsPerPage] = useState<number>(6);
  const { listings, loading } = useFetchUserListings();
  const debounceSearch = useDebounce(search, 500);

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

    return nameMatches || addressMatches;
  });
  const handleSortOptionClick = (selectedSortKey: string) => {
    if (selectedSortKey === sortKey) {
      setSortKey("");
    } else {
      setSortKey(selectedSortKey);
    }
  };

  const sortedListings = [...filteredListings];

  if (sortKey === "name") {
    sortedListings.sort((a, b) => a.data.name.localeCompare(b.data.name));
  } else if (sortKey === "address") {
    sortedListings.sort((a, b) => a.data.address.localeCompare(b.data.address));
  } else if (sortKey === "date") {
    sortedListings.sort((a, b) => {
      const dateA = new Date(a.data.timestamp.toDate());
      const dateB = new Date(b.data.timestamp.toDate());
      return dateB.getTime() - dateA.getTime();
    });
  }
  const saleListings = sortedListings.filter((listing) => listing.data.type === "sale");
  const rentListings = sortedListings.filter((listing) => listing.data.type === "rent");
  const hasSaleListings = saleListings.length > 0;
  const hasRentListings = rentListings.length > 0;

  const indexOfLastSaleApartament = currentSalePage * apartamentsPerPage;
  const indexOfFirstSaleApartment = indexOfLastSaleApartament - apartamentsPerPage;
  const currentSaleApartaments = saleListings.slice(
    indexOfFirstSaleApartment,
    indexOfLastSaleApartament
  );

  const indexOfLastRentApartament = currentRentPage * apartamentsPerPage;
  const indexOfFirstRentApartment = indexOfLastRentApartament - apartamentsPerPage;
  const currentRentApartaments = rentListings.slice(
    indexOfFirstRentApartment,
    indexOfLastRentApartament
  );

  const paginateSale = (pageNumber: number) => {
    setCurrentSalePage(pageNumber);
  };

  const paginateRent = (pageNumber: number) => {
    setCurrentRentPage(pageNumber);
  };
  return (
    <div>
      <div className="flex justify-center mt-4 mb-4">
        <SearchBar
          className="w-1/2"
          handleSearchText={handleSearchText}
          search={search}
          onSortOptionClick={handleSortOptionClick}
          sortKey={sortKey}
        />
      </div>
      <div className="flex flex-wrap ">
        <span className="flex text-5xl px-4 py-4 text-center font-semibold text-[#22292f] justify-center items-center mx-auto w-[35rem]">
          <span className="mb-4">
            Checkout apartaments to <strong className="text-[#ffbb44]">buy.</strong>
          </span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3 mx-auto">
          {hasSaleListings ? (
            currentSaleApartaments.map((listing) => (
              <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
            ))
          ) : (
            <div className="text-center w-full">
              <p>No apartment found for your preferences!</p>
            </div>
          )}
          <div className="row-span-3 col-span-full">
            <Pagination
              apartamentsPerPage={apartamentsPerPage}
              totalPosts={saleListings.length}
              paginate={paginateSale}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-12 mb-4">
        <div className="grid order-2 xxl:order-1  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3 mx-auto ">
          {hasRentListings ? (
            currentRentApartaments.map((listing) => (
              <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
            ))
          ) : (
            <div className="text-center w-full">
              <p>No apartment found for your preferences!</p>
            </div>
          )}
          <div className="row-span-3 col-span-full">
            <Pagination
              apartamentsPerPage={apartamentsPerPage}
              totalPosts={rentListings.length}
              paginate={paginateRent}
            />
          </div>
        </div>

        <span className="flex order-1 xxl:order-2 text-5xl px-4 py-4 text-center font-semibold text-[#22292f] justify-center items-center mx-auto w-[35rem] ">
          <span>
            Checkout apartaments for <strong className="text-[#ffbb44]">rent.</strong>
          </span>
        </span>
        <BackToTopButton />
      </div>
    </div>
  );
};
export default Home;
