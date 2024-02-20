import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useExpedients from "../hooks/useExpedients";

import SearchAndFilters from "./search&Filters";
import ExpedientsSearchTable from "./table/ExpedientsSearchTable";
import LoadColorRing from "./loaders/colorRIng";
import { onLoad } from "../store/load";
import { clearPages } from "../store/pages";

const QueryContent = () => {
  const [resultSearch, setResultSearch] = useState([]);

  const { search } = useSelector((state) => state.search);
  const { loadStatus } = useSelector((state) => state.load);
  const { totalPages } = useSelector((state) => state.pages);

  const { searchExpedients } = useExpedients();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSearch = async () => {
      await searchExpedients(setResultSearch, search);
    };

    handleSearch();
  }, [resultSearch]);

  useEffect(() => {
    if (loadStatus) {
      const timer = setTimeout(() => {
        dispatch(onLoad(false));
        dispatch(clearPages(0));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loadStatus]);

  return (
    <>
      {loadStatus ? (
        <LoadColorRing />
      ) : (
        <>
          <SearchAndFilters />
          <ExpedientsSearchTable resultSearch={resultSearch} />
        </>
      )}
    </>
  );
};

export default QueryContent;
