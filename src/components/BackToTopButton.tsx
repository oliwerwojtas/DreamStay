import React, { useEffect, useState, useRef } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsVisible(scrollY > 0);
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting);
    });

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      className={`fixed opacity-0 right-5 bottom-5 rounded-full p-2.5 border-[#ffcb74] border-2 text-[#22292f] font-medium z-10 ${
        isVisible ? "opacity-[1]" : ""
      }`}
      onClick={handleBackToTop}
    >
      <span className="bg-[#ffcb74] rounded-full w-10 h-10 px-1 flex justify-center items-center">
        <AiOutlineArrowUp size={20} />
      </span>
    </button>
  );
};
