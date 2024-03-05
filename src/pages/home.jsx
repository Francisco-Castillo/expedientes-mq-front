import React from "react";
import { useSelector } from "react-redux";

import Welcome from "../components/card/welcome";

import Tab from "../components/tab";

import "../styles/home.css";

const Home = () => {
  const { tab } = useSelector((state) => state.tab);

  return (
    <>
      <Tab />
      {tab == "" && <Welcome />}
    </>
  );
};

export default Home;
