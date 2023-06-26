import { useEffect } from "react";
import { useMap, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
interface MapContainerWrapperProps {
  position: LatLngTuple;
  details: any;
}
export const MapContainerDetails = ({ position, details }: MapContainerWrapperProps) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 13);
  }, [map, position]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{details.data.address}</Popup>
      </Marker>
    </>
  );
};
