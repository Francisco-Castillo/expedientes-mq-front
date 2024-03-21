import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  filterEndDate,
  filterExpedientType,
  filterStartDate,
  filterStatus,
} from "../store/filters";

import { setSearch } from "../store/search";
import { clearPages } from "../store/pages";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Button } from "react-bootstrap";

import useExpedients from "../hooks/useExpedients";

import "../styles/search.css";

const SearchAndFilters = () => {
  const { status, types } = useSelector((state) => state.expedientProperties);
  const { page } = useSelector((state) => state.pages);
  const { search } = useSelector((state) => state.search);
  const { filter } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const { searchExpedients } = useExpedients();

  const handleSearch = async () => {
    await searchExpedients();
  };

  useEffect(() => {
    handleSearch();
    dispatch(clearPages());
  }, [search]);

  useEffect(() => {
    handleSearch();
  }, [page]);

  useEffect(() => {
    handleSearch();
    dispatch(clearPages());
  }, [filter]);

  return (
    <Container
      style={{
        backgroundColor: "rgba(217, 70, 70, 1)",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "5px",
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
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
            <Button variant="light">Buscar</Button>
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
              onChange={(e) => dispatch(filterStatus(e.target.value))}
            >
              <option value="">Seleccionar Estado</option>
              {status.map((state, index) => (
                <option value={state} key={index}>
                  {state}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ color: "white", fontSize: "20px" }}>
              Tipo
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => dispatch(filterExpedientType(e.target.value))}
            >
              <option value="">Seleccionar tipo</option>
              {types.map((type, index) => (
                <option value={type} key={index}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label
              id="basic-addon1"
              style={{ color: "white", fontSize: "20px" }}
            >
              Fecha de Inicio
            </Form.Label>
            <Form.Control
              type="date"
              id="date-filter"
              onChange={(e) => dispatch(filterStartDate(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col>
          {" "}
          <Form.Group className="mb-3">
            <Form.Label
              id="basic-addon1"
              style={{ color: "white", fontSize: "20px" }}
            >
              Fecha de Finalizacion
            </Form.Label>
            <Form.Control
              type="date"
              id="date-filter"
              onChange={(e) => dispatch(filterEndDate(e.target.value))}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchAndFilters;
