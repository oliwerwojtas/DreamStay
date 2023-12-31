import { useEffect, useRef, useState } from "react";
//utilities
import { LazyImageProps } from "../types/components/components";

export const LazyImage = ({ imageUrl, alt, className }: LazyImageProps) => {
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
    <img src={imageUrl} alt={alt} className={`rounded-md mb-4 ${className}`} />
  ) : (
    <img ref={imageRef} alt={alt} style={{ width: "100%", height: "170px", opacity: 0 }} />
  );
};
