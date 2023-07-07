import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper";
export const ImageSlider = ({ imgUrls }: { imgUrls: string[] }) => {
  return (
    <div className="h-80 w-[50rem]">
      <Swiper
        navigation={true}
        modules={[Navigation, EffectFade]}
        effect={"fade"}
        slidesPerView={1}
        className="w-[25rem]"
      >
        {imgUrls.map((imageUrl, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img className="w-full h-[20rem]" src={imageUrl} alt={`Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
