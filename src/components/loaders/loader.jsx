import React from "react";
import { Spinner, Container } from "react-bootstrap";

import { ProgressBar } from "react-loader-spinner";

import "../../styles/loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <h1>Bienvenido</h1>
      <ProgressBar
        height="100"
        width="100"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="rgba(217, 70, 70, 1)"
        barColor="rgb(224, 220, 8)"
      />
    </div>
  );
};

export default Loader;
