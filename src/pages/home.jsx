import React from "react";

import Tab from "../components/tab";

import Navbar from "../components/navbar";

import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import decodeToken from "../helpers/decodeToken";
import { setUserData } from "../store/User/userData";

const Home = () => {
  const { token, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (status !== "not-authenticated") {
    const dataUser = decodeToken(token);
    dispatch(setUserData(dataUser));
  }

  return (
    <>
      <Navbar />
      <Tab />
    </>
  );
};

export default Home;
