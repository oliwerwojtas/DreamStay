import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animation from "../../assets/lottie-home.json";

export const Welcome = () => {
  const [isPreferenceBased, setIsPreferenceBased] = useState(true);

  const homeRef = useRef<LottieRefCurrentProps>(null);

  const transition = { duration: 0.6 };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPreferenceBased((prevIsPreferenceBased) => !prevIsPreferenceBased);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-8xl ">
        <div className=" lg:max-w-[650px] mb-12 md:mb-6 relative">
          <Lottie
            className="h-[250px] md:h-[400px] xxl:h-[650px] "
            onComplete={() => homeRef.current?.setDirection(-1)}
            lottieRef={homeRef}
            animationData={animation}
          />
        </div>
        <div className="w-[600px]  lg:ml-20 text-[#22292f] flex flex-col justify-between rounded-md gap-2">
          <h1 className="text-4xl lg:text-5xl mt-6 font-bold text-left">
            Explore features such as{" "}
            {isPreferenceBased ? (
              <motion.span
                key="filtering"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                className="inline-block text-[#ffbb44]"
              >
                preference-based filtering
              </motion.span>
            ) : (
              <motion.span
                key="photos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                className="inline-block text-[#ffbb44]"
              >
                photos
              </motion.span>
            )}{" "}
            and{" "}
            {isPreferenceBased ? (
              <motion.span
                key="location"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                className="inline-block text-[#ffbb44]"
              >
                location.
              </motion.span>
            ) : (
              <motion.span
                key="description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                className="inline-block text-[#ffbb44]"
              >
                description.
              </motion.span>
            )}
          </h1>
          <h2 className="text-base text-gray-500 text-left ">
            Find exciting offers, compare prices and conditions. Start your journey to find your
            dream home now!
          </h2>
        </div>
      </div>
    </section>
  );
};
