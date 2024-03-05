import React from "react";

import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRouter from "../helpers/ProtectedRouter";

import Navbar from "./Navbar";
import Home from "../pages/home";
import Expedient from "../pages/expedient";
import FirsLogin from "../pages/firsLogin";
import ExpedientsInbox from "./table/ExpedientsInbox";
import ExpedientsTab from "./expedientsTab";
import MyExpedientsTable from "./table/MyExpedientsTable";
import QueryContent from "./queryContent";
import UsersTable from "./table/UsersTable";

export const Root = () => {
  return (
    <>
      <ProtectedRouter>
        <Navbar />
      </ProtectedRouter>
      <ProtectedRouter>
        <Home />
      </ProtectedRouter>

      <Routes>
        <Route
          path="/expedientes"
          element={
            <ProtectedRouter>
              <ExpedientsTab />
            </ProtectedRouter>
          }
        >
          <Route
            path="bandeja-de-entrada"
            element={
              <div style={{ padding: "0px 10px" }}>
                <ProtectedRouter>
                  <ExpedientsInbox />
                </ProtectedRouter>
              </div>
            }
          />
          <Route
            path="mis-expedientes"
            element={
              <div style={{ padding: "0px 10px" }}>
                <ProtectedRouter>
                  <MyExpedientsTable />
                </ProtectedRouter>
              </div>
            }
          />
        </Route>

        <Route
          path="/consulta"
          element={
            <ProtectedRouter>
              <QueryContent />
            </ProtectedRouter>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRouter>
              <UsersTable />
            </ProtectedRouter>
          }
        />
        <Route
          path="/expediente/:expedientId"
          element={
            <ProtectedRouter>
              <Expedient />
            </ProtectedRouter>
          }
        />
        <Route
          path="/actualizar-contraseña"
          element={
            <ProtectedRouter>
              <FirsLogin />
            </ProtectedRouter>
          }
        />
      </Routes>
    </>
  );
};
