import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "../pages/login";
import New_Expedient from "../pages/new_expedient-page";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/new/expedient" element={<New_Expedient />} />
      </Routes>
    </>
  );
};
