import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiEdit } from "react-icons/fi";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { Option } from "../../reusable/Option";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";

export const Dropdown = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iconVariants = {
    open: { rotate: 180 },
    close: { rotate: 0 },
  };

  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.addEventListener("click", handleClickOutside);
  });
  return (
    <div className=" flex items-center justify-center bg-white">
      <motion.div animate={open ? "open" : "closed"} className="relative" ref={wrapperRef}>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-md text-[#22292f] bg-[#ffcb74] hover:bg-[#dba548] transition-colors"
          onClick={() => setOpen((previous) => !previous)}
        >
          <span className="font-medium text-[#22292f]">Settings</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="absolute flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl "
        >
          <Option
            setOpen={setOpen}
            Icon={AiOutlineHome}
            text="Home"
            onClick={() => navigate("/")}
          />

          <Option
            setOpen={setOpen}
            Icon={AiOutlineUser}
            text="Profile"
            onClick={() => navigate("/settings")}
          />

          <Option
            setOpen={setOpen}
            Icon={FiEdit}
            text="Create"
            onClick={() => navigate("/create")}
          />
          <span className="flex justify-center">--------------</span>
          <Option setOpen={setOpen} Icon={AiOutlineLogout} text="Logout" onClick={logout} />
        </motion.ul>
      </motion.div>
    </div>
  );
};
