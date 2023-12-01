import React, { useState } from "react";

import { useSelector } from "react-redux/es/hooks/useSelector";

import UsersTable from "./table/UsersTable";
import New_User from "./modal/new_user";
import ExpedientsTab from "./expedientsTab";
import QueryContent from "./queryContent";

import decodeToken from "../helpers/decodeToken";

import "../styles/tab.css";
import Welcome from "./card/welcome";

const Tab = () => {
  const { token } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState();

  const { areaId } = decodeToken(token);

  const authorizedLevel = import.meta.env.VITE_HIGH_LVL;

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

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
        {activeTab == null && (
          <div>
            <Welcome />
          </div>
        )}
        {activeTab == "Expedientes" && (
          <div>
            <ExpedientsTab />
          </div>
        )}
        {/* {activeTab == "Documentos" && (
          <div>
            <New_document />
            <DocumentsTable />
          </div>
        )} */}
        {activeTab == "Consulta" && (
          <div>
            <QueryContent />
          </div>
        )}
        {activeTab == "Usuarios" && (
          <div>
            <New_User />
            <UsersTable />
          </div>
        )}
      </div>
    </>
  );
};

export default Tab;
