import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: any;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    if (totalPages === 0) return [];
    const pages = [];

    const startPage = Math.max(
      1,
      Math.min(currentPage - 2, totalPages - 3) // Ensures we don't go below 1 or beyond totalPages - 3
    );
    const endPage = Math.min(totalPages, startPage + 3); // Ensures at most 4 pages are displayed

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };
  if (totalItems === 0 || totalPages === 0) {
    return null;
  }
  return (
    <div className="px-2 flex justify-between items-center">
      <span className="text-xs md:text-sm text-primary">
        Showing Results {(currentPage - 1) * itemsPerPage + 1} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </span>
      <div className="inline-flex space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={`w-7 h-7 flex justify-center items-center rounded-md bg-primary text-white hover:text-black hover:hover:bg-gray-300 ${
            currentPage === 1 ? "hidden" : ""
          }`}
          disabled={currentPage === 1}
        >
          <MdChevronLeft />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-7 h-7 text-xs flex justify-center items-center border rounded-md ${
              currentPage === page
                ? "border-primary text-primary"
                : "border-gray-300 text-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className={`w-7 h-7 flex justify-center items-center rounded-md bg-primary text-white hover:text-black hover:bg-gray-300 ${
            currentPage === totalPages ? "hidden" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          <MdChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
