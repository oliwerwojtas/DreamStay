import { useEffect, useRef, useState } from "react";
import { LazyImageProps } from "../types";
export const LazyImage = ({ width, height, imageUrl }: LazyImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [inView, setInView] = useState(false);
  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback);

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  return inView ? (
    <img src={imageUrl} width={width} height={height} />
  ) : (
    <img ref={imageRef} style={{ width: "100px", height: "500px", marginBottom: "100px" }} />
  );
};
