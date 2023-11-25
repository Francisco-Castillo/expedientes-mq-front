import React, { useEffect, useState } from "react";

import useExpedients from "../hooks/useExpedients";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "../styles/search.css";

const InputSearch = ({ setResultSearch, currentPage, setTotalPages }) => {
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterExpedientType, setFilterExpedientType] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [expedientTypes, setExpedientTypes] = useState([]);
  const [expedientStates, setExpedientStates] = useState([]);

  const { searchExpedients, listExpedientTypes, listExpedientStates } =
    useExpedients();

  const handleSearch = async () => {
    searchExpedients(
      setResultSearch,
      currentPage,
      search,
      setTotalPages,
      filterStartDate,
      filterEndDate,
      filterState,
      filterExpedientType
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    searchExpedients(
      setResultSearch,
      currentPage,
      search,
      setTotalPages,
      filterStartDate,
      filterEndDate,
      filterState,
      filterExpedientType
    );
    listExpedientTypes(setExpedientTypes);
    listExpedientStates(setExpedientStates);
  }, [
    search,
    currentPage,
    filterState,
    filterEndDate,
    filterStartDate,
    filterExpedientType,
  ]);

  return (
    <Container
      style={{
        backgroundColor: "rgba(217, 70, 70, 1)",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "10px",
      }}
    >
      <Row>
        <Col>
          <Form.Group className="mb-3" style={{ display: "flex" }}>
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="light" onClick={handleKeyDown}>
              Buscar
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ color: "white" }}>Estado</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="">Todos</option>
              {expedientStates.map((state, index) => (
                <option value={state} key={index}>
                  {state}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ color: "white" }}>Tipo</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setFilterExpedientType(e.target.value)}
            >
              <option value="">Todos</option>
              {expedientTypes.map((type, index) => (
                <option value={type} key={index}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label id="basic-addon1" style={{ color: "white" }}>
              Fecha de Inicio
            </Form.Label>
            <Form.Control
              type="date"
              id="date-filter"
              onChange={(e) => setFilterStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          {" "}
          <Form.Group className="mb-3">
            <Form.Label id="basic-addon1" style={{ color: "white" }}>
              Fecha de Finalizacion
            </Form.Label>
            <Form.Control
              type="date"
              id="date-filter"
              onChange={(e) => setFilterEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default InputSearch;
