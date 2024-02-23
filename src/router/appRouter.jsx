import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";

import { useSelector } from "react-redux/es/hooks/useSelector";

import { Navbar } from "react-bootstrap";

import Home from "../pages/home";
import Expedient from "../pages/expedient";
import FirsLogin from "../pages/firsLogin";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);

  return (
    <>
      {/* {status === "authenticated" ? <Navbar /> : null} */}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="/expediente/:expedientId" element={<Expedient />} />
        <Route path="/actualizar-contraseña" element={<FirsLogin />} />
      </Routes>
    </>
  );
};
