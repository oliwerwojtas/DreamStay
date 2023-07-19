import { v4 as uuidv4 } from "uuid";

export const ImageSlider = ({ imgUrls }: { imgUrls: string[] }) => {
  return (
    <div className="h-80 w-[50rem]">
      {imgUrls.map((imageUrl) => (
        <img src={imageUrl} key={uuidv4()} width="800" height="1000" />
      ))}
    </div>
  );
};
