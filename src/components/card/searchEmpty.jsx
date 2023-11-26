import React from "react";

import Container from "react-bootstrap/Container";

import Card from "react-bootstrap/Card";

const SearchEmpty = () => {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "18rem",
      }}
    >
      <Card
        style={{
          backgroundColor: "rgba(217, 217, 217, 1)",
          borderStyle: "none",
        }}
      >
        <Card.Img
          variant="top"
          src="https://i.postimg.cc/V669bTjv/6016221.png"
        />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            Su búsqueda no arrojó ningún resultado
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SearchEmpty;
