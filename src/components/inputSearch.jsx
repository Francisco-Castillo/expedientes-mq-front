import React, { useEffect, useState } from "react";

import useExpedients from "../hooks/useExpedients";

const InputSearch = ({ setResultSearch, setTotalPages, currentPage }) => {
  const [search, setSearch] = useState("");

  const { searchExpedients } = useExpedients();

  const handleSearch = async () => {
    searchExpedients(setResultSearch, currentPage, search, setTotalPages);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    searchExpedients(setResultSearch, currentPage, search, setTotalPages);
  }, [search]);

  return (
    <div className="search-bar">
      <input
        className="input-search"
        style={{
          borderRadius: "4px",
          padding: "10px 20px",
          marginBottom: "10px",
        }}
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        style={{
          borderRadius: "4px",
          padding: "8px 20px",
          marginBottom: "10px",
        }}
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
};

export default InputSearch;
