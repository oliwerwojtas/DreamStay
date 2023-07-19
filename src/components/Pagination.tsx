import { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Button } from "./shared/Button";
import { PaginationProps } from "../types";
export const Pagination = ({ apartamentsPerPage, totalPosts, paginate }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / apartamentsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };
  return (
    <div className="">
      <ul className="flex gap-2">
        <li className={currentPage === 1 ? "disabled" : ""}>
          <Button onClick={handlePrev} className="px-5 mt-4 font-medium rounded-md">
            <GrFormPrevious /> <span>Prev</span>
          </Button>
        </li>

        <li className={currentPage === pageNumbers.length ? "disabled" : ""}>
          <Button onClick={handleNext} className="px-5 mt-4 font-medium rounded-md">
            Next <GrFormNext />
          </Button>
        </li>
      </ul>
    </div>
  );
};
