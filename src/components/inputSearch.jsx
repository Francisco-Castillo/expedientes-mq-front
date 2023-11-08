import React, { useEffect, useState } from "react";

import useExpedients from "../hooks/useExpedients";

import "../styles/search.css";

const InputSearch = ({ setResultSearch, setTotalPages, currentPage }) => {
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterTypeExpedient, setFilterTypeExpedient] = useState("");
  const [filterDate, setFilterDate] = useState("");

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
    searchExpedients(
      setResultSearch,
      currentPage,
      search,
      setTotalPages,
      filterDate,
      filterState,
      filterTypeExpedient
    );
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
      <div className="container-filter">
        <select onChange={(e) => setFilterDate(e.target.value)}>
          <option value="">Estado</option>
          <option value="Iniciado">Iniciado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completado">Completado</option>
          <option value="Suspendido">Suspendido</option>
        </select>

        <select onChange={(e) => setFilterTypeExpedient(e.target.value)}>
          <option value="">Tipo de Expediente</option>
          <option value="Subsidio">Subsidio</option>
          <option value="Pago">Pago</option>
          <option value="Compra">Compra</option>
          <option value="Personal">Personal</option>
          <option value="Solicitud de servicio">Solicitud de servicio</option>
        </select>

        <input type="date" onChange={(e) => setFilterDate(e.target.value)} />

        <button>Filtrar</button>
      </div>
    </div>
  );
};

export default InputSearch;
