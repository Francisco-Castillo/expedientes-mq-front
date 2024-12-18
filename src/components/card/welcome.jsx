import React from "react";

import Container from "react-bootstrap/Container";

import Card from "react-bootstrap/Card";

import MMQ from "../../assets/MMQ.svg";

const Welcome = () => {
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
          backgroundColor: "inherit",
          borderStyle: "none",
          alignItems: "center",
        }}
      >
        <Card.Img variant="top" src={MMQ} />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            Bienvenido al Sistema de Gestión de Expedientes
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Welcome;
