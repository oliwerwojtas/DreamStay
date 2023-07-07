import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiEdit } from "react-icons/fi";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { Option } from "./Option";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
export const Dropdown = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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

  return (
    <div className=" flex items-center justify-center bg-white">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-green-600 hover:bg-green-700 transition-colors"
          onClick={() => setOpen((previous) => !previous)}
        >
          <span className="font-medium text-white">Settings</span>
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

          <Option setOpen={setOpen} Icon={AiOutlineLogout} text="Logout" onClick={logout} />
        </motion.ul>
      </motion.div>
    </div>
  );
};
