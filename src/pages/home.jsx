import React from "react";

import Navbar from "../components/navbar";

import "../styles/home.css";
import Tab from "../components/tab";
import Pagination from "../components/Pagination";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="sections">
        <Tab />
        {/* <Pagination /> */}
      </section>
    </>
  );
};

export default Home;
