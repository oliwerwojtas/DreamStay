import { motion } from "framer-motion";
import { ButtonProps } from "../../types";
export const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <motion.button
      className={`${className} flex items-center gap-2 px-3 py-2  text-[#22292f] bg-[#ffcb74] hover:bg-[#dba548] transition-colors`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
