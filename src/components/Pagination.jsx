import React from "react";

import "../styles/pagination.css";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handleNextPage = () => {
    if (currentPage <= totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="pagination">
      <span onClick={handlePrevPage} className="page-item">
        -
      </span>
      <span className="page-number">{currentPage}</span>
      <span onClick={handleNextPage} className="page-item">
        +
      </span>
    </div>
  );
};

export default Pagination;
