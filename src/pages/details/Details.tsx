import { useParams } from "react-router-dom";
import { useFetchUserDocuments } from "../../hooks/useFetchUserDocuments";
import { Spinner } from "../../components/Spinner";
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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper";
export const Details = () => {
  const { id } = useParams();
  const { listings } = useFetchUserDocuments();

  const details = listings.find((listing) => listing.id === id);
  const location = useGeolocation(details?.data.address || "");

  console.log(details?.data.imgUrls);
  console.log(details?.data);
  console.log(location);
  if (!details) {
    return <Spinner />;
  }
  const position: LatLngTuple = [location.latitude, location.longitude];
  console.log(position);
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <button className="flex justify-start w-[70rem] mb-4">Back to list </button>
      <div className="flex h-[20rem] bg-green-500 flex-wrap">
        <div className="flex flex-col px-6 bg-white w-[40rem]">
          <span>
            {details.data.name} - {details.data.regularPrice} / month
          </span>
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px]  truncate">{details.data.address}</p>
          </div>
          <span>Type: {details.data.type}</span>
          <div>Description: {details.data.description}</div>
          <div className="flex flex-wrap justify-around mt-4 w-full">
            <p className="flex bg-red-400 w-1/4 justify-center items-center py-3">
              <BiBed size={24} />
              Beds: {details.data.bedrooms}
            </p>
            <p className="flex justify-center items-center bg-green-400 w-1/4">
              <MdOutlineBathroom size={24} />
              Baths: {details.data.bathrooms}
            </p>
            <p className="flex bg-blue-400 w-1/4 justify-center items-center">
              <FaParking size={24} />
              {details.data.parking ? "Parking place!" : "No parking place!"}
            </p>
            <p className="flex bg-yellow-400 w-1/4 justify-center items-center">
              <LuSofa size={24} />
              {details.data.furnished ? "furnished!" : "No furnished!"}
            </p>

            <p className="flex justify-center items-center w-1/3 bg-orange-200">
              <BsFillHouseDoorFill size={24} /> Metry
            </p>
            <p className="flex justify-center items-center w-1/3 bg-slate-600 py-3">
              <MdSmokeFree size={24} />
              Niepalący
            </p>
            <p className="flex justify-center items-center w-1/3 bg-amber-700">
              <MdOutlineFreeBreakfast size={24} />
              Śniadania
            </p>
          </div>
        </div>
        <div className="w-[30rem] bg-red-400">
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
      <div className="h-80 w-[50rem]">
        <Swiper
          navigation={true}
          modules={[Navigation, EffectFade]}
          effect={"fade"}
          slidesPerView={1}
          className="w-[25rem]"
        >
          {details.data.imgUrls.map((imageUrl, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img className="w-full h-[20rem]" src={imageUrl} alt={`Image ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-80 bg-white"></div>
    </div>
  );
};
