import { useParams } from "react-router-dom";
import { useFetchUserDocuments } from "../../hooks/useFetchUserDocuments";
import { Spinner } from "../../components/Spinner";
import { useGeolocation } from "../../hooks/useGeolocation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";

export const Details = () => {
  const { id } = useParams();
  const { listings } = useFetchUserDocuments();

  const details = listings.find((listing) => listing.id === id);
  const location = useGeolocation(details?.data.address || "");
  console.log(details);
  console.log(location);
  if (!details) {
    return <Spinner />;
  }
  const position: LatLngTuple = [location.latitude, location.longitude];
  console.log(position);
  return (
    <div>
      <div className="flex flex-col px-6">
        <span>{details.data.name}</span>
        <span>Longitude: {location.longitude}</span>
        <span>Latitude: {location.latitude}</span>
      </div>
      <div className="h-80">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{details.data.address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
