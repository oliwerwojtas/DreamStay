import React, { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  imageUrl: string;

  width: string;
  height: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ width, height, imageUrl }) => {
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
