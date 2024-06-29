import React from "react";

import { ColorRing } from "react-loader-spinner";

import "../../styles/loader.css";

const LoadColorRing = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ color: "white", fontSize: "24px" }}>
        {" "}
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          colors={["#b5002c", "#fbfbfb", "#20639d", "#f9d172", "#f37c3d"]}
        />
        Cargando...
      </div>
    </div>
  );
};

export default LoadColorRing;
