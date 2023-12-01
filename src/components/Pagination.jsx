import React, { useState } from "react";

import "../styles/pagination.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  setIsLoading,
}) => {
  const [starterPage, setStarterPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage <= totalPages - 2) {
      setCurrentPage((prev) => prev + 1);
      setStarterPage((prev) => prev + 1);
      setIsLoading(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage != 0) {
      setCurrentPage((prev) => prev - 1);
      setStarterPage((prev) => prev - 1);
    }
  };

  return (
    <div className="pagination">
      <span onClick={handlePrevPage} className="page-item">
        <FaArrowLeft />
      </span>
      <span className="page-number">{starterPage}</span>
      <span onClick={handleNextPage} className="page-item">
        <FaArrowRight />
      </span>
    </div>
  );
};

export default Pagination;
