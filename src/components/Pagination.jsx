import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { setPage } from "../store/pages";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import "../styles/pagination.css";

const Pagination = () => {
  const { page, totalPages } = useSelector((state) => state.pages);

  const dispatch = useDispatch();

  const handleNextPage = () => {
    if (page <= totalPages - 2) {
      dispatch(setPage(page + 1));
    }
  };

  const handlePrevPage = () => {
    if (page != 0) {
      dispatch(setPage(page - 1));
    }
  };

  return (
    <div className="pagination">
      <span onClick={handlePrevPage} className="page-item">
        <FaArrowLeft />
      </span>
      <span className="page-number">{page + 1}</span>
      <span onClick={handleNextPage} className="page-item">
        <FaArrowRight />
      </span>
    </div>
  );
};

export default Pagination;
