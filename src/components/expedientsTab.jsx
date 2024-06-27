import React from "react";

import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { setSubTab } from "../store/tab";
import { clearPages } from "../store/pages";
import { onLoad } from "../store/load";

import New_Expedient from "./modal/new_expedient";

import "../styles/expedientsTab.css";

const ExpedientsTab = ({}) => {
  const { subTab } = useSelector((state) => state.tab);
  const { areaId, areaName } = useSelector((state) => state.userData.user);

  const authorizedLevel = import.meta.env.VITE_HIGH_LVL;

  const dispatch = useDispatch();

  const handleTabChange = (tabName) => {
    dispatch(setSubTab(tabName));
    dispatch(onLoad(true));
    dispatch(clearPages());
  };
  return (
    <>
      <div className="tabExpedients-header">
        <Link
          to="bandeja-de-entrada"
          className={`tab ${
            subTab === "bandeja-de-entrada" ? "active" : "disable"
          }`}
          onClick={() => {
            if (subTab !== "bandeja-de-entrada") {
              handleTabChange("bandeja-de-entrada");
            }
          }}
        >
          Bandeja de Entrada
        </Link>

        {areaName === "Mesa general de entradas" ? (
          <>
            {" "}
            <Link
              to="mis-expedientes"
              className={`tab ${
                subTab === "mis-expedientes" ? "active" : "disable"
              }`}
              onClick={() => {
                if (subTab !== "mis-expedientes") {
                  handleTabChange("mis-expedientes");
                }
              }}
            >
              Mis Expedientes
            </Link>
            {subTab === "mis-expedientes" && <New_Expedient />}
          </>
        ) : (
          ""
        )}
      </div>
      <Outlet />
    </>
  );
};

export default ExpedientsTab;
