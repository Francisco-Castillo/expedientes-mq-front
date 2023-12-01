import React, { useState } from "react";

import SearchAndFilters from "./search&Filters";
import ExpedientsSearchTable from "./table/ExpedientsSearchTable";

const QueryContent = () => {
  const [resultSearch, setResultSearch] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <>
      <SearchAndFilters
        setResultSearch={setResultSearch}
        currentPage={currentPage}
        setTotalPages={setTotalPages}
      />
      <ExpedientsSearchTable
        resultSearch={resultSearch}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default QueryContent;
