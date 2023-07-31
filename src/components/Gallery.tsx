import { LazyImage } from "./LazyImage";
//utilities
import { v4 as uuidv4 } from "uuid";

export const Gallery = ({ imgUrls }: { imgUrls: string[] }) => {
  return (
    <div className="max-w-[40rem] px-4 mb-4">
      {imgUrls.map((imageUrl) => (
        <LazyImage imageUrl={imageUrl} key={uuidv4()} />
      ))}
    </div>
  );
};
