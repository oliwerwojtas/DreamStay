import { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
interface PaginationProps {
  apartamentsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

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
          <button
            onClick={handlePrev}
            className="flex justify-center items-center bg-[#ffcb74] hover:bg-[#dba548] px-5 py-2 mt-4 font-medium rounded-md text-[#22292f]"
          >
            <GrFormPrevious /> <span>Prev</span>
          </button>
        </li>

        <li className={currentPage === pageNumbers.length ? "disabled" : ""}>
          <button
            onClick={handleNext}
            className="flex justify-center items-center bg-[#ffcb74] hover:bg-[#dba548] px-5 py-2 mt-4 font-medium rounded-md text-[#22292f]"
          >
            Next <GrFormNext />
          </button>
        </li>
      </ul>
    </div>
  );
};
