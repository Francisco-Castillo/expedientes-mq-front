import React, { useEffect, useState } from "react";

import New_Expedient from "./modal/new_expedient";
import DocumentsTable from "./DocumentsTable";
import New_document from "./modal/new_document";
import InputSearch from "./inputSearch";
import ExpedientsTable from "./ExpedientsTable";
import Pagination from "./Pagination";

import useExpedients from "../hooks/useExpedients";
import useDocuments from "../hooks/useDocuments";

import "../styles/tab.css";

const Tab = () => {
  const [activeTab, setActiveTab] = useState("Expedientes");

  const [expedients, setExpedients] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [resultSearch, setResultSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const { getExpedients } = useExpedients();
  const { getDocuments } = useDocuments();

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
    setTotalPages(0);
  };

  useEffect(() => {
    if (activeTab === "Expedientes") {
      getExpedients(setExpedients, setTotalPages, currentPage);
    } else if (activeTab === "Documentos") {
      getDocuments(setDocuments, currentPage, setTotalPages);
    }
    getExpedients(setExpedients, setTotalPages, currentPage);
  }, [activeTab, currentPage]);

  return (
    <>
      <div className="tab-header">
        <div
          className={`tab ${activeTab === "Expedientes" ? "active" : ""}`}
          onClick={() => handleTabChange("Expedientes")}
        >
          Expedientes
        </div>
        <div
          className={`tab ${activeTab === "Documentos" ? "active" : ""}`}
          onClick={() => handleTabChange("Documentos")}
        >
          Documentos
        </div>
        <div
          className={`tab ${activeTab === "Consulta" ? "active" : ""}`}
          onClick={() => handleTabChange("Consulta")}
        >
          Consulta
        </div>
      </div>

      <div className="tab-content">
        {activeTab == "Expedientes" && (
          <div>
            <New_Expedient />
            <ExpedientsTable expedients={expedients} />
            <Pagination
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
        {activeTab == "Documentos" && (
          <div>
            <New_document />
            <DocumentsTable documents={documents} />
            <Pagination
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
        {activeTab == "Consulta" && (
          <div>
            <InputSearch
              setResultSearch={setResultSearch}
              setTotalPages={setTotalPages}
              currentPage={currentPage}
            />
            <ExpedientsTable expedients={resultSearch} />
            <Pagination
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Tab;
