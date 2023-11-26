import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux/es/hooks/useSelector";

import New_Expedient from "./modal/new_expedient";
import DocumentsTable from "./table/DocumentsTable";
import ExpedientsTable from "./table/ExpedientsTable";
import UsersTable from "./table/UsersTable";
import ExpedientsSearchTable from "./table/ExpedientsSearchTable";
import New_document from "./modal/new_document";
import InputSearch from "./inputSearch";
import New_User from "./modal/new_user";
import Pagination from "./Pagination";

import useExpedients from "../hooks/useExpedients";
import useDocuments from "../hooks/useDocuments";
import useUsers from "../hooks/useUsers";

import decodeToken from "../helpers/decodeToken";

import "../styles/tab.css";

const Tab = () => {
  const { token } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("Expedientes");

  const [expedients, setExpedients] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [users, setUsers] = useState([]);

  const [resultSearch, setResultSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const { getExpedients } = useExpedients();
  const { getDocuments } = useDocuments();
  const { getUsers } = useUsers();

  const { areaId } = decodeToken(token);

  const authorizedLevel = import.meta.env.VITE_HIGH_LVL;

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
    } else if (activeTab === "Usuarios") {
      getUsers(setUsers, setTotalPages, currentPage);
    }
  }, [activeTab, currentPage, documents, users]);

  return (
    <>
      <div className="tab-header">
        <div
          className={`tab ${activeTab === "Expedientes" ? "active" : ""}`}
          onClick={() => handleTabChange("Expedientes")}
        >
          Expedientes
        </div>
        {/* <div
          className={`tab ${activeTab === "Documentos" ? "active" : ""}`}
          onClick={() => handleTabChange("Documentos")}
        >
          Documentos
        </div> */}
        <div
          className={`tab ${activeTab === "Consulta" ? "active" : ""}`}
          onClick={() => handleTabChange("Consulta")}
        >
          Consulta
        </div>
        {areaId === Number(authorizedLevel) ? (
          <div
            className={`tab ${activeTab === "Usuarios" ? "active" : ""}`}
            onClick={() => handleTabChange("Usuarios")}
          >
            Usuarios
          </div>
        ) : null}
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
            <ExpedientsSearchTable resultSearch={resultSearch} />
            <Pagination
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
        {activeTab == "Usuarios" && (
          <div>
            <New_User />
            <UsersTable users={users} />
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
