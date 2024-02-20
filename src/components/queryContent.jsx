import React, { useState } from "react";

import SearchAndFilters from "./search&Filters";
import ExpedientsSearchTable from "./table/ExpedientsSearchTable";

const QueryContent = () => {
  const [resultSearch, setResultSearch] = useState([]);

  return (
    <>
      <SearchAndFilters
        setResultSearch={setResultSearch}
        resultSearch={resultSearch}
      />
      <ExpedientsSearchTable resultSearch={resultSearch} />
    </>
  );
};

export default QueryContent;
