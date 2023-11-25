import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "../pages/login";
import New_Expedient from "../components/modal/new_expedient";
import Home from "../pages/home";
import Expedient from "../pages/expedient";
import FirsLogin from "../pages/firsLogin";

export const AppRouter = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/new/expedient" element={<New_Expedient />} />
        <Route path="/home" element={<Home />} />
        <Route path="/expedient/:expedientId" element={<Expedient />} />
        <Route path="/updatePassword" element={<FirsLogin />} />
      </Routes>
    </>
  );
};
