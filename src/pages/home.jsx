import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Welcome from "../components/card/welcome";

import "../styles/home.css";
import Tab from "../components/tab";
import decodeToken from "../helpers/decodeToken";
import { setUserData } from "../store/User/userData";

const Home = () => {
  const { tab } = useSelector((state) => state.tab);

  const { token, status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  if (status !== "not-authenticated") {
    const dataUser = decodeToken(token);
    dispatch(setUserData(dataUser));
  }

  return (
    <>
      <Tab />
      {tab == "" && <Welcome />}
    </>
  );
};

export default Home;
