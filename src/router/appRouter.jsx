import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "../pages/login";
import New_Expedient from "../components/modal/new_expedient";
import Home from "../pages/home";
import Expedient from "../pages/expedient";
import FirsLogin from "../pages/firsLogin";
import ExpedientsTab from "../components/expedientsTab";

export const AppRouter = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="/expediente/:expedientId" element={<Expedient />} />
        <Route path="/actualizar-contraseña" element={<FirsLogin />} />
      </Routes>
    </>
  );
};
