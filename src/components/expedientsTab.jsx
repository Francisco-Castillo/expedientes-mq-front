import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { setSubTab } from "../store/tab";
import { clearPages } from "../store/pages";
import { onLoad } from "../store/load";

import ExpedientsTable from "./table/ExpedientsTable";
import New_Expedient from "./modal/new_expedient";
import MyExpedientsTable from "./table/MyExpedientsTable";

import "../styles/expedientsTab.css";

const ExpedientsTab = ({}) => {
  const { subTab } = useSelector((state) => state.tab);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTabChange = (tabName) => {
    dispatch(setSubTab(tabName));
    dispatch(clearPages(0));
    dispatch(onLoad(true));
    navigate(`expedientes/${tabName.replace(" ", "").toLowerCase()}`);
  };

  return (
    <>
      <div className="tabExpedients-header">
        <div
          className={`tab ${
            subTab === "expedientes entrantes" ? "active" : "disable"
          }`}
          onClick={() => {
            if (subTab !== "expedientes entrantes") {
              handleTabChange("expedientes entrantes");
            }
          }}
        >
          Expedientes Entrantes
        </div>
        <div
          className={`tab ${
            subTab === "mis expedientes" ? "active" : "disable"
          }`}
          onClick={() => {
            if (subTab !== "mis expedientes") {
              handleTabChange("mis expedientes");
            }
          }}
        >
          Mis Expedientes
        </div>

        {subTab === "mis expedientes" && <New_Expedient />}
      </div>

      <div className="tab-content">
        {subTab == "expedientes entrantes" && (
          <div>
            <ExpedientsTable />
          </div>
        )}
        {subTab == "mis expedientes" && (
          <div>
            <MyExpedientsTable />
          </div>
        )}
      </div>
    </>
  );
};

export default ExpedientsTab;
