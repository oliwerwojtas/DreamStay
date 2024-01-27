import { useState } from "react";
//components
import { Button } from "./shared/Button";
//utilities
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { PaginationProps } from "../types/components/components";
import React from "react";

export const Pagination = ({ apartamentsPerPage, totalPosts, paginate }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / apartamentsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length && apartamentsPerPage === 6) {
      setCurrentPage((prevPage) => prevPage + 1);
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="">
      <ul className="flex gap-2">
        <li>
          <Button onClick={handlePrev} className="px-5 mt-4 font-medium rounded-md">
            <GrFormPrevious /> <span>Prev</span>
          </Button>
        </li>

        <li>
          <Button onClick={handleNext} className="px-5 mt-4 font-medium rounded-md">
            Next <GrFormNext />
          </Button>
        </li>
      </ul>
    </div>
  );
};
