import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { setSubTab } from "../store/tab";
import { clearPages } from "../store/pages";
import { onLoad } from "../store/load";
import { clearSearch } from "../store/search";

import ExpedientsTable from "./table/ExpedientsTable";
import New_Expedient from "./modal/new_expedient";
import MyExpedientsTable from "./table/MyExpedientsTable";

import "../styles/expedientsTab.css";
import LoadColorRing from "./loaders/colorRIng";

const ExpedientsTab = ({}) => {
  const { subTab } = useSelector((state) => state.tab);
  const { loadStatus } = useSelector((state) => state.load);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTabChange = (tabName) => {
    dispatch(setSubTab(tabName));
    dispatch(onLoad(true));
    navigate(`expedientes/${tabName.replace(" ", "").toLowerCase()}`);
  };

  useEffect(() => {
    if (loadStatus) {
      const timer = setTimeout(() => {
        dispatch(onLoad(false));
        dispatch(clearPages(0));
        dispatch(clearSearch());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loadStatus]);

  return (
    <>
      {loadStatus ? (
        <LoadColorRing />
      ) : (
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
      )}
    </>
  );
};

export default ExpedientsTab;
