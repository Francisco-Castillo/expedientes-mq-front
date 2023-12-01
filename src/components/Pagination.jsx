import React from "react";

import "../styles/pagination.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handleNextPage = () => {
    if (currentPage <= totalPages - 2) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage != 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="pagination">
      <span onClick={handlePrevPage} className="page-item">
        <FaArrowLeft />
      </span>
      <span className="page-number">{currentPage}</span>
      <span onClick={handleNextPage} className="page-item">
        <FaArrowRight />
      </span>
    </div>
  );
};

export default Pagination;
