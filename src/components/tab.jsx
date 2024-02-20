import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { setTab } from "../store/tab";
import { clearPages } from "../store/pages";

import decodeToken from "../helpers/decodeToken";

import UsersTable from "./table/UsersTable";
import New_User from "./modal/new_user";
import ExpedientsTab from "./expedientsTab";
import QueryContent from "./queryContent";
import Welcome from "./card/welcome";

import "../styles/tab.css";

const Tab = () => {
  const { token } = useSelector((state) => state.auth);
  const { tab } = useSelector((state) => state.tab);

  const { areaId } = decodeToken(token);

  const authorizedLevel = import.meta.env.VITE_HIGH_LVL;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTabChange = (tabName) => {
    dispatch(setTab(tabName.toLowerCase()));
    dispatch(clearPages(0));
    navigate(`/${tabName.toLowerCase()}`);
  };

  return (
    <>
      <div className="tab-header">
        <div
          className={`tab ${tab === "expedientes" ? "active" : "disable"}`}
          onClick={() => handleTabChange("expedientes")}
        >
          Expedientes
        </div>
        <div
          className={`tab ${tab === "consulta" ? "active" : "disable"}`}
          onClick={() => handleTabChange("consulta")}
        >
          Consulta
        </div>
        {areaId === Number(authorizedLevel) ? (
          <div
            className={`tab ${tab === "usuarios" ? "active" : "disable"}`}
            onClick={() => handleTabChange("usuarios")}
          >
            Usuarios
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="tab-content">
        {tab == "" && (
          <div>
            <Welcome />
          </div>
        )}
        {tab == "expedientes" && (
          <div>
            <ExpedientsTab />
          </div>
        )}
        {tab == "consulta" && (
          <div>
            <QueryContent />
          </div>
        )}
        {tab == "usuarios" && (
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
