import { useParams } from "react-router-dom";
import { useFetchUserDocuments } from "../../hooks/useFetchUserListings";
import { Spinner } from "../../components/shared/Spinner";
import { useGeolocation } from "../../hooks/useGeolocation";
import { MdLocationOn } from "react-icons/md";

import { MdSmokeFree } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { BiBed } from "react-icons/bi";
import { MdOutlineBathroom } from "react-icons/md";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { LuSofa } from "react-icons/lu";
import { MapContainer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { MapContainerDetails } from "../../components/MapDetails";
import { ImageSlider } from "../../components/ImageSlider";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BackToTopButton } from "../../components/BackToTopButton";
import { Button } from "../../components/shared/Button";
const Details = () => {
  const { id } = useParams();
  const { listings } = useFetchUserDocuments();

  const details = listings.find((listing) => listing.id === id);
  const location = useGeolocation(details?.data.address || "");

  if (!details) {
    return <Spinner />;
  }
  const position: LatLngTuple = [location.latitude, location.longitude];

  return (
    <div className="flex flex-col justify-center items-center ">
      <Button className="flex mb-4 items-center gap-2 px-3 py-2 mt-4 rounded-md text-[#22292f] bg-[#ffcb74] hover:bg-[#dba548] transition-colors">
        <AiOutlineArrowLeft />
        <Link to="/" className="font-medium">
          Back to list
        </Link>
      </Button>

      <div className="flex  flex-wrap max-w-[80rem] justify-center">
        <div className="flex flex-col px-3 bg-white w-[90vw] h-full ">
          <span>
            {details.data.name} - {details.data.regularPrice} / month
          </span>
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-[#ffcb74]" />
            <p className="font-semibold text-sm mb-[2px]  truncate">{details.data.address}</p>
          </div>
          <span>Type: {details.data.type ? "rent" : "sale"}</span>
          <div className="flex flex-col break-all ">
            <span className="font-semibold">Description:</span>
            <span className="w-full">{details.data.description}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 place-items-center w-full mb-4">
            <div className="flex justify-center items-center text-sm font-medium gap-1 py-1 rounded-md text-[#22292f] border-2 border-[#ffcb74] hover:bg-[#FFF6D8] transition-colors min-w-[10rem]">
              <span className="bg-[#ffcb74] rounded-full w-8 h-8 flex justify-center items-center">
                <BiBed className="bg-[#ffcb74] rounded-full w-8 h-8 px-1 flex justify-center items-center" />
              </span>
              Beds: {details.data.bedrooms}
            </div>
            <div className="flex justify-center items-center text-sm font-medium gap-1 py-1 rounded-md text-[#22292f] border-2 border-[#ffcb74] hover:bg-[#FFF6D8] transition-colors min-w-[10rem]">
              <span className="bg-[#ffcb74] rounded-full w-8 h-8 flex justify-center items-center">
                <MdOutlineBathroom size={24} />
              </span>
              Baths: {details.data.bathrooms}
            </div>
            <div className="flex justify-center items-center text-sm font-medium gap-1 py-1 rounded-md text-[#22292f] border-2 border-[#ffcb74] hover:bg-[#FFF6D8] transition-colors min-w-[10rem]">
              <span className="bg-[#ffcb74] rounded-full w-8 h-8 flex justify-center items-center">
                <FaParking size={24} />
              </span>
              {details.data.parking ? "Parking place!" : "No parking place!"}
            </div>
            <div className="flex justify-center items-center text-sm font-medium gap-1 py-1 rounded-md text-[#22292f] border-2 border-[#ffcb74] hover:bg-[#FFF6D8] transition-colors min-w-[10rem]">
              <span className="bg-[#ffcb74] rounded-full w-8 h-8 flex justify-center items-center">
                <LuSofa size={24} />
              </span>
              {details.data.furnished ? "Furnished!" : "No furnished!"}
            </div>
            <div className="flex justify-center items-center text-sm font-medium gap-1 py-1 rounded-md text-[#22292f] border-2 border-[#ffcb74] hover:bg-[#FFF6D8] transition-colors min-w-[10rem]">
              <span className="bg-[#ffcb74] rounded-full w-8 h-8 flex justify-center items-center">
                <BsFillHouseDoorFill size={24} />
              </span>
              {details.data.meters}m²
            </div>
            <div className="flex justify-center items-center text-sm font-medium gap-1 py-1 rounded-md text-[#22292f] border-2 border-[#ffcb74] hover:bg-[#FFF6D8] transition-colors min-w-[10rem]">
              <span className="bg-[#ffcb74] rounded-full w-8 h-8 flex justify-center items-center">
                <MdSmokeFree size={24} />
              </span>
              {details.data.smoke ? "Smoking" : "No Smoking!"}
            </div>
            <div className="flex justify-center items-center text-sm font-medium gap-1 py-1 rounded-md text-[#22292f] border-2 border-[#ffcb74] hover:bg-[#FFF6D8] transition-colors min-w-[10rem]">
              <span className="bg-[#ffcb74] rounded-full w-8 h-8 flex justify-center items-center">
                <MdOutlineFreeBreakfast size={24} />
              </span>
              {details.data.breakfast ? "Breakfast" : "No breakfast!"}
            </div>
          </div>
        </div>
        <div className="w-full h-[24rem] mb-4 z-10">
          <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
            <MapContainerDetails position={position} details={details} />
          </MapContainer>
        </div>
      </div>
      <div>
        <ImageSlider imgUrls={details.data.imgUrls} />
      </div>
      <BackToTopButton />
    </div>
  );
};
export default Details;
