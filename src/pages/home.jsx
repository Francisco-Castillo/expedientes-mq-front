import React from "react";

import Tab from "../components/tab";

import Navbar from "../components/navbar";

import "../styles/home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="sections">
        <Tab />
      </section>
    </>
  );
};

export default Home;
