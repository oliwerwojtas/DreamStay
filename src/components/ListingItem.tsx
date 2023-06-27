import { FormDataCreate2 } from "../types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useFetchUserDocuments } from "../hooks/useFetchUserDocuments";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface ListingItemProps {
  listing: FormDataCreate2["data"];
  id: string;
}

export const ListingItem = ({ listing, id }: ListingItemProps) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const daysFromToday = dayjs().diff(dayjs(listing.timestamp.toDate()), "day");
  const { deleteDocument, loading } = useFetchUserDocuments(auth.currentUser?.uid);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(price);
  };
  console.log(listing);
  console.log(id);
  console.log(auth.currentUser?.uid == listing.userRef);
  const handleDelete = async () => {
    await deleteDocument("listings", id);
    if (!loading) {
      window.location.reload();
    }
  };
  // console.log(documentID);
  const handleEdit = () => {
    console.log(id);
    navigate(`/edit/${id}`);
  };

  return (
    <li className="bg-white w-60 relative flex flex-col justify-between shadow-md hover:shadow-xl rounded-md overflow-hidden transistion-shadow duration-150">
      <Link to={`/details/${id}`}>
        <img
          src={listing.imgUrls[0]}
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
            {listing.offer
              ? formatPrice(listing.discountedPrice)
              : formatPrice(listing.regularPrice)}
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
      </Link>
      {auth.currentUser?.uid === listing.userRef && (
        <>
          <FaTrash
            size={20}
            className="absolute bottom-2 right-2 cursor-pointer text-red-500"
            onClick={handleDelete}
          />
          <MdEdit
            size={20}
            className="absolute bottom-2 right-8 cursor-pointer"
            onClick={handleEdit}
          />
        </>
      )}
    </li>
  );
};
