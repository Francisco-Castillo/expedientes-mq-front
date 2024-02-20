import React from "react";

import Container from "react-bootstrap/Container";

import Card from "react-bootstrap/Card";

const Empty = () => {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "18rem",
        marginTop: "100px",
      }}
    >
      <Card
        style={{
          backgroundColor: "rgba(217, 217, 217, 1)",
          borderStyle: "none",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            Sin resultados
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Empty;
