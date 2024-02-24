import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useExpedients from "../hooks/useExpedients";

import { onLoad } from "../store/load";
import { clearPages } from "../store/pages";

import SearchAndFilters from "./search&Filters";
import ExpedientsSearchTable from "./table/ExpedientsSearchTable";
import LoadColorRing from "./loaders/colorRIng";

const QueryContent = () => {
  const { resultSearch } = useSelector((state) => state.search);
  const { loadStatus } = useSelector((state) => state.load);

  const { searchExpedients } = useExpedients();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    await searchExpedients();
  };

  useEffect(() => {
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
          <ExpedientsSearchTable />
        </>
      )}
    </>
  );
};

export default QueryContent;
