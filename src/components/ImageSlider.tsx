import { v4 as uuidv4 } from "uuid";
import { LazyImage } from "./LazyImage";

export const ImageSlider = ({ imgUrls }: { imgUrls: string[] }) => {
  return (
    <div className="max-w-[40rem] px-4 mb-4">
      {imgUrls.map((imageUrl) => (
        <LazyImage imageUrl={imageUrl} key={uuidv4()} />
      ))}
    </div>
  );
};
