import { useState, ChangeEvent, useEffect, useRef } from "react";
import { Option } from "./reusable/Option";
import { MdOutlineSpellcheck } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { motion } from "framer-motion";
interface SearchBarProps {
  search: string;
  handleSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onSortOptionClick: (sortKey: string) => void;
  sortKey: string;
}

const SearchBar = ({
  search,
  handleSearchText,
  className,
  onSortOptionClick,
  sortKey,
}: SearchBarProps) => {
  const [open, setOpen] = useState(false);

  const wrapperVariants = {
    open: {
      scaleY: 1,
    },
    closed: {
      scaleY: 0,
    },
  };
  const handleOptionClick = (sortKey: string) => {
    onSortOptionClick(sortKey);
    setOpen(false);
  };

  return (
    <div className="flex justify-between w-4/5">
      <div className=" flex items-center justify-center bg-white">
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md text-[#22292f] bg-[#ffcb74] hover:bg-[#dba548] transition-colors"
            onClick={() => setOpen((previous) => !previous)}
          >
            <span className="font-medium text-[#22292f] flex items-center">
              Sorted by
              {sortKey === "name" && <MdOutlineSpellcheck className="ml-1" />}
              {sortKey === "address" && <MdLocationOn className="ml-1" />}
              {sortKey === "date" && <AiOutlineFieldTime className="ml-1" />}
            </span>
          </button>

          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "30%" }}
            className="absolute flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl "
          >
            <Option
              setOpen={setOpen}
              Icon={MdOutlineSpellcheck}
              text="Name"
              onClick={() => handleOptionClick("name")}
            />
            <Option
              setOpen={setOpen}
              Icon={MdLocationOn}
              text="Address"
              onClick={() => handleOptionClick("address")}
            />
            <Option
              setOpen={setOpen}
              Icon={AiOutlineFieldTime}
              text="Date"
              onClick={() => handleOptionClick("date")}
            />
          </motion.ul>
        </motion.div>
      </div>
      <div className="flex items-center relative">
        <input
          className="w-[10rem] py-1 px-4 rounded-md  text-[#22292f] placeholder-[#22292f] border-2 border-[#ffcb74]"
          onChange={handleSearchText}
          value={search}
          placeholder="Search..."
        />

        <AiOutlineSearch
          size={18}
          className="flex items-center rounded-full text-[#22292f] bg-[#ffcb74] hover:bg-[#dba548] transition-colors absolute right-2 w-6 h-6 px-1"
        />
      </div>
    </div>
  );
};

export default SearchBar;
