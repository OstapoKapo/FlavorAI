import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = (): void => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 absolute bottom-4 left-1/2 -translate-x-1/2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded cursor-pointer ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
      >
        &#8592;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer ${
            page === currentPage
              ? "bg-[#ff7f50] text-white border-[#ff7f50]"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded cursor-pointer ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;
