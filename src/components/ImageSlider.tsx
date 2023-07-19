import { v4 as uuidv4 } from "uuid";
import { LazyImage } from "./LazyImage";

export const ImageSlider = ({ imgUrls }: { imgUrls: string[] }) => {
  return (
    <div className="h-80 w-[50rem]">
      {imgUrls.map((imageUrl) => (
        <LazyImage imageUrl={imageUrl} key={uuidv4()} width="800" height="1000" />
      ))}
    </div>
  );
};
