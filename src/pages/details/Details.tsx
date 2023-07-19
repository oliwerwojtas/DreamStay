import { useParams } from "react-router-dom";
import { useFetchUserDocuments } from "../../hooks/useFetchUserDocuments";
import { Spinner } from "../../components/shared/Spinner";
import { useGeolocation } from "../../hooks/useGeolocation";
import { MdLocationOn } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { MdSmokeFree } from "react-icons/md";
import { FaParking } from "react-icons/fa";
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

      <div className="flex bg-green-500 flex-wrap max-w-[80rem] justify-center">
        <div className="flex flex-col px-6 bg-white w-[90vw] h-full ">
          <span>
            {details.data.name} - {details.data.regularPrice} / month
          </span>
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px]  truncate">{details.data.address}</p>
          </div>
          <span>Type: {details.data.type ? "rent" : "sale"}</span>
          <div>Description: {details.data.description}</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 place-items-center w-full mb-4">
            <p className="flex justify-center items-center font-medium gap-1 px-3 py-2 rounded-md text-black border-2 border-green-500 hover:bg-green-600 hover:text-white transition-colors w-[13rem]">
              <BiBed size={24} />
              Beds: {details.data.bedrooms}
            </p>
            <p className="flex justify-center items-center font-medium gap-1 px-3 py-2 rounded-md text-black border-2 border-green-500 hover:bg-green-600 hover:text-white transition-colors w-[13rem]">
              <MdOutlineBathroom size={24} />
              Baths: {details.data.bathrooms}
            </p>
            <p className="flex justify-center items-center font-medium gap-1 px-3 py-2 rounded-md text-black border-2 border-green-500 hover:bg-green-600 hover:text-white transition-colors w-[13rem]">
              <FaParking size={24} />
              {details.data.parking ? "Parking place!" : "No parking place!"}
            </p>
            <p className="flex justify-center items-center font-medium gap-1 px-3 py-2 rounded-md text-black border-2 border-green-500 hover:bg-green-600 hover:text-white transition-colors w-[13rem]">
              <LuSofa size={24} />
              {details.data.furnished ? "Furnished!" : "No furnished!"}
            </p>
            <p className="flex justify-center items-center font-medium gap-1 px-3 py-2 rounded-md text-black border-2 border-green-500 hover:bg-green-600 hover:text-white transition-colors w-[13rem]">
              <BsFillHouseDoorFill size={24} /> {details.data.meters}
            </p>
            <p className="flex justify-center items-center font-medium gap-1 px-3 py-2 rounded-md text-indiblack border-2 border-green-500  hover:bg-green-700 hover:text-white transition-colors w-[13rem] ">
              <MdSmokeFree size={24} />
              {details.data.smoke ? "Dla palących!" : "Dla niepalących!"}
            </p>
            <p className="flex justify-center items-center font-medium gap-1 px-3 py-2 rounded-md text-indiblack  border-2 border-green-500 hover:bg-green-700 hover:text-white transition-colors w-[13rem] ">
              <MdOutlineFreeBreakfast size={24} />
              {details.data.breakfast ? "Ze śniadaniami!" : "Bez śniadań!"}
            </p>
          </div>
        </div>
        <div className="w-full bg-red-400 h-[24rem]">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <MapContainerDetails position={position} details={details} />
          </MapContainer>
        </div>
      </div>
      <div className="h-80 w-[50rem] px-2 mt-4">
        <ImageSlider imgUrls={details.data.imgUrls} />
      </div>
      <BackToTopButton />
    </div>
  );
};
export default Details;
