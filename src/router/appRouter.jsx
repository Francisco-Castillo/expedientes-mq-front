import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "../pages/login";
import New_Expedient from "../pages/new_expedient-page";
import Navbar from "../components/navbar";
import Home from "../pages/home";

export const AppRouter = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/new/expedient" element={<New_Expedient />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};
