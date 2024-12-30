import React, { useState } from "react";

import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { setSubTab } from "../store/tab";
import { clearPages } from "../store/pages";
import { onLoad } from "../store/load";

import New_Expedient from "./modal/new_expedient";

import "../styles/expedientsTab.css";
import Settings from "./modal/settings";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaFileSignature } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

const ExpedientsTab = ({}) => {
  const { subTab } = useSelector((state) => state.tab);
  const { areaName } = useSelector((state) => state.userData.user);

  const [isOpened, setIsOpened] = useState(false);
  const [isModal, setIsModal] = useState("");

  const dispatch = useDispatch();

  const handleOpenModal = (value) => {
    setIsModal(value);
    setIsOpened(true);
  };

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
            {subTab === "mis-expedientes" && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip">Caratular Expediente</Tooltip>}
              >
                <div
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  <FaFileSignature
                    className="newExpedient"
                    onClick={() => {
                      handleOpenModal("newExpedient");
                    }}
                  />
                </div>
              </OverlayTrigger>
            )}
            {subTab === "mis-expedientes" && (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip">
                    Configurar Tipos de Expedientes
                  </Tooltip>
                }
              >
                <div
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  <IoIosSettings
                    onClick={() => {
                      handleOpenModal("settings");
                    }}
                    className="newExpedient"
                  />
                </div>
              </OverlayTrigger>
            )}
          </>
        ) : (
          ""
        )}
      </div>
      <New_Expedient
        isOpened={isModal === "newExpedient" ? isOpened : false}
        setIsOpened={setIsOpened}
      />
      <Settings
        isOpened={isModal === "settings" ? isOpened : false}
        setIsOpened={setIsOpened}
      />
      <Outlet />
    </>
  );
};

export default ExpedientsTab;
