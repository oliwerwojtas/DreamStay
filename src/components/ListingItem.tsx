import { FormDataCreate2 } from "../types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pl"; // Dodaj lokalizację, jeśli chcesz sformatować datę w innym języku
import { MdLocationOn } from "react-icons/md";
interface ListingItemProps {
  listing: FormDataCreate2["data"];
  id: string;
}

export const ListingItem = ({ listing, id }: ListingItemProps) => {
  // const formattedDate = dayjs(listing.timestamp.toDate()).format("MMMM D, YYYY ");
  const daysFromToday = dayjs().diff(dayjs(listing.timestamp.toDate()), "day");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(price);
  };

  return (
    <li className="bg-white relative flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transistion-shadow duration-150">
      <Link to={`/category/${listing.type}/${id}`}></Link>
      <img
        src="https://th.bing.com/th/id/R.49c05bd2899fb27903e9707334ce8af9?rik=XmEu7gg6XRToHA&pid=ImgRaw&r=0"
        alt="house photo"
        className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
      />
      {/* <span>{formattedDate}</span> */}
      <span className="absolute top-2 left-2 bg-green-800 text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
        {daysFromToday} days ago
      </span>
      <div className="w-full p-[10px]">
        <div className="flex items-center space-x-1">
          <MdLocationOn className="h-4 w-4 text-green-600" />
          <p className="font-semibold text-sm mb-[2px]  truncate">{listing.address}</p>
        </div>
        <p className="font-semibold mt-2 text-lg truncate">{listing.name}</p>
        <p>
          {listing.offer ? formatPrice(listing.discountedPrice) : formatPrice(listing.regularPrice)}
          {listing.type === "rent" && " / month"}
        </p>
        <div className="flex items-center mt-[10px] space-x-3">
          <div className="flex items-center space-x-1">
            {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-1">
            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
          </div>
        </div>
      </div>
    </li>
  );
};
