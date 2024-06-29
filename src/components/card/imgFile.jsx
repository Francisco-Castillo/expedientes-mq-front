import React from "react";

import Container from "react-bootstrap/Container";

import Card from "react-bootstrap/Card";

const ImageFile = ({ url }) => {
  const BaseUrl = import.meta.env.VITE_API_URL;

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "25rem",
        marginTop: "100px",
        zIndex: "1",
      }}
    >
      <Card
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderStyle: "none",
          alignItems: "center",
        }}
      >
        <Card.Body>
          <Card.Img
            variant="top"
            src={url}
            //   alt=""
            //   width={"100%"}
            //   height={"100%"}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ImageFile;
