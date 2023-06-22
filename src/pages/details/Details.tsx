import { useParams } from "react-router-dom";
import { useFetchUserDocuments } from "../../hooks/useFetchUserDocuments";
import { Spinner } from "../../components/Spinner";
import { useGeolocation } from "../../hooks/useGeolocation";

export const Details = () => {
  const { id } = useParams();
  const { listings } = useFetchUserDocuments();

  const details = listings.find((listing) => listing.id === id);
  const location = useGeolocation(details?.data.address || "");
  if (!details) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex flex-col px-6">
        <span>{details.data.name}</span>
        <span>Longitude: {location.longitude}</span>
        <span>Latitude: {location.latitude}</span>
      </div>
    </div>
  );
};
