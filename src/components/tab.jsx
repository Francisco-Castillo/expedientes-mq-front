import React from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { setTab, setSubTab } from "../store/tab";
import { onLoad } from "../store/load";
import { clearFilters } from "../store/filters";
import { clearPages } from "../store/pages";

import "../styles/tab.css";

const Tab = () => {
  const { tab } = useSelector((state) => state.tab);
  const { areaId, areaName } = useSelector((state) => state.userData.user);

  const authorizedLevel = import.meta.env.VITE_HIGH_LVL;

  const dispatch = useDispatch();

  const handleTabChange = (tabName) => {
    dispatch(setTab(tabName));
    dispatch(onLoad(true));
    dispatch(setSubTab(""));
    dispatch(clearFilters());
    dispatch(clearPages());
  };

  return (
    <>
      <div className="tab-header">
        <Link
          to="/expedientes"
          className={`tab ${tab === "expedientes" ? "active" : "disable"}`}
          onClick={() => handleTabChange("expedientes")}
        >
          Expedientes
        </Link>

        <Link
          to="/consulta"
          className={`tab ${tab === "consulta" ? "active" : "disable"}`}
          onClick={() => handleTabChange("consulta")}
        >
          Consulta
        </Link>

        {areaId === Number(authorizedLevel) && areaName == "Intendencia" ? (
          <Link
            to="/usuarios"
            className={`tab ${tab === "usuarios" ? "active" : "disable"}`}
            onClick={() => handleTabChange("usuarios")}
          >
            Usuarios
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Tab;
