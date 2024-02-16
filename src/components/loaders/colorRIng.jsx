import React from "react";

import { ColorRing } from "react-loader-spinner";

import "../../styles/loader.css";

const LoadColorRing = () => {
  return (
    <div className="loader-container">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
      CARGANDO
    </div>
  );
};

export default LoadColorRing;
