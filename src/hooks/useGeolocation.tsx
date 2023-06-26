import { useState, useEffect } from "react";

export const useGeolocation = (address: string) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const handleGeolocation = async () => {
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib2xpd2VyMDAiLCJhIjoiY2xqNzZuem1uMHZ6cjNycW5iNTZ4dDN1ZSJ9.-jgnhloRdQ3E7mPaYNbzSg`;

      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        const coordinates = data.features[0].geometry.coordinates;
        const lng = coordinates[0];
        const lat = coordinates[1];

        setLocation({ latitude: lat, longitude: lng });
      } catch (error) {
        console.log(error);
      }
    };

    if (address !== "") {
      handleGeolocation();
    }
  }, [address]);

  return location;
};
