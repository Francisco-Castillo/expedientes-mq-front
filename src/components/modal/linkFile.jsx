import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import Swal from "sweetalert2";

const LinkFile = ({ expedientId }) => {
  const [expedient, setExpedient] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [resultSearch, setResultSearch] = useState([]);
  const [search, setSearch] = useState("");

  const handleExpedient = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedientes/view/${expedientId}`
      );

      setExpedient(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        text: error.message,
      });
      console.log(error);
    }
  };

  const searchFiles = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/documents/search`,
        search
      );
      console.log(data);
      setResultSearch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchFiles();
    }
  };

  useEffect(() => {
    handleExpedient();
    searchFiles();
  }, [search]);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Vincular Archivo</Dropdown.Item>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(235, 87, 87, 1)", color: "white" }}
        >
          <Modal.Title>Vincular Documento</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          <h3>Expediente: {expedient.numeroExpediente}</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Documento</Form.Label>
              <Form.Select onChange={(e) => setResultSearch(e.target.value)}>
                <option>Elegir tipo del documento</option>
                <option value="Factura">Factura</option>
                <option value="Informe">Informe</option>
                <option value="CV">CV</option>
                <option value="Contrato">Contrato</option>
                <option value="Auditoria">Auditoria</option>
                <option value="Plan">Plan</option>
                <option value="Contrato">Contrato</option>
                <option value="Publicidad">Publicidad</option>
                <option value="Estado Finaciero">Estado Finaciero</option>
                <option value="Presentacion">Presentacion</option>
              </Form.Select>
            </Form.Group>

            <input
              style={{
                borderRadius: "4px",
                padding: "10px 20px",
                marginBottom: "10px",
              }}
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              style={{
                borderRadius: "4px",
                padding: "8px 20px",
                marginBottom: "10px",
              }}
              onClick={searchFiles}
            >
              Buscar
            </button>
            <table className="registros-table">
              <thead>
                <tr>
                  <th>Fecha de creación</th>
                  <th>Tipo de documento</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              {/* <tbody>
              {resultSearch.map((documento, index) => (
                <tr key={index}>
                  <td>{documento.fechaCreacion}</td>
                  <td>{documento.tipoDocumento}</td>
                  <td>{documento.observaciones}</td>
                  <td></td>
                </tr>
              ))}
            </tbody> */}
            </table>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
          }}
        >
          <Button
            style={{
              background: "rgba(235, 87, 87, 1)",
            }}
            type="submit"
            // onClick={}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-folder"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"></path>
            </svg>
            Guardar
          </Button>
          <Button
            onClick={handleClose}
            style={{ background: "rgba(235, 87, 87, 1)" }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LinkFile;
