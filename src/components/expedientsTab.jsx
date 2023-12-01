import React, { useState } from "react";

import ExpedientsTable from "./table/ExpedientsTable";
import New_Expedient from "./modal/new_expedient";
import MyExpedientsTable from "./table/MyExpedientsTable";

import "../styles/expedientsTab.css";

const ExpedientsTab = ({}) => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    // setCurrentPage(1);
    // setTotalPages(0);
  };
  return (
    <>
      <div className="tabExpedients-header">
        <div
          className={`tab ${
            activeTab === "Expedientes Entrantes" ? "active" : ""
          }`}
          onClick={() => handleTabChange("Expedientes Entrantes")}
        >
          Expedientes Entrantes
        </div>
        <div
          className={`tab ${activeTab === "Mis Expedientes" ? "active" : ""}`}
          onClick={() => handleTabChange("Mis Expedientes")}
        >
          Mis Expedientes
        </div>
      </div>

      <div className="tab-content">
        {activeTab == "Expedientes Entrantes" && (
          <div>
            <ExpedientsTable />
          </div>
        )}
        {activeTab == "Mis Expedientes" && (
          <div>
            <New_Expedient />
            <MyExpedientsTable />
          </div>
        )}
      </div>
    </>
  );
};

export default ExpedientsTab;
