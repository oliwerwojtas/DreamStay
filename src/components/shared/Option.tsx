import { SetStateAction, Dispatch } from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { itemVariants, actionIconVariants } from "../../utilities/animations";

export const Option = ({
  text,
  Icon,
  setOpen,
  onClick,
}: {
  text: string;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
}) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        onClick();
      }}
      className="flex items-center gap-2 w-full p-2 pr-8 text-sm font-medium whitespace-nowrap rounded-md hover:bg-[#FFF6D8] text-[#22292f]  transition-colors cursor-pointer"
    >
      <motion.span
        variants={actionIconVariants}
        className="bg-[#ffcb74] rounded-full w-6 h-6 px-1 flex justify-center items-center"
      >
        <Icon size={18} />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};
