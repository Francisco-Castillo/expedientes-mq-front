import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useExpedients from "../hooks/useExpedients";

import { onLoad } from "../store/load";
import { clearPages } from "../store/pages";
import { clearSearchResult } from "../store/search";

import SearchAndFilters from "./search&Filters";
import ExpedientsSearchTable from "./table/ExpedientsSearchTable";
import LoadColorRing from "./loaders/colorRIng";

const QueryContent = () => {
  const { loadStatus } = useSelector((state) => state.load);
  const { page } = useSelector((state) => state.pages);
  const { search } = useSelector((state) => state.search);
  const { filter } = useSelector((state) => state.filters);

  const { searchExpedients } = useExpedients();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    await searchExpedients();
  };

  useEffect(() => {
    handleSearch();
  }, [page]);

  useEffect(() => {
    handleSearch();
    dispatch(clearPages());
  }, [filter]);

  useEffect(() => {
    handleSearch();
    dispatch(clearPages());
  }, [search]);

  useEffect(() => {
    if (loadStatus) {
      const timer = setTimeout(() => {
        dispatch(onLoad(false));
        dispatch(clearPages(0));
        dispatch(clearSearchResult());
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
