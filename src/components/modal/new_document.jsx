import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import useDocuments from "../../hooks/useDocuments";

import "../../styles/new_document.css";

const New_document = () => {
  const [file, setFile] = useState(null);
  const [observations, setObservations] = useState();
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { newDocument } = useDocuments();

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("es-AR", options);

  const formData = new FormData();

  formData.append("files", file);

  const data = {
    fechaCreacion: formattedDate,
    observaciones: observations,
    tipoDocumento: type,
  };

  formData.append("data", JSON.stringify(data));

  const handleUpload = async (e) => {
    e.preventDefault();
    newDocument(formData, setShow);
  };

  return (
    <>
      <Button
        variant="light"
        style={{
          borderRadius: "4px",
          padding: "10px 20px",
          marginBottom: "10px",
        }}
        onClick={handleShow}
      >
        Crear Documento
      </Button>

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
          <Modal.Title>Subir Archivo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          <form className="document-form" onSubmit={handleUpload}>
            <label className="document-label" htmlFor="">
              Seleccionar :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="file"
              className="document-input"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <Form.Label>Tipo de Documento</Form.Label>
            <Form.Select onChange={(e) => setType(e.target.value)}>
              <option>Elegir tipo del documento</option>
              <option value="Factura">Factura</option>
              <option value="Informe">Informe</option>
              <option value="CV">CV</option>
              <option value="Auditoria">Auditoria</option>
              <option value="Proyecto">Plan</option>
              <option value="Contrato">Contrato</option>
              <option value="Publicidad">Publicidad</option>
            </Form.Select>

            <label className="document-label" htmlFor="">
              Descripcion :
            </label>

            <textarea
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              name="Description"
              id=""
              className="document-textarea"
              cols="100"
              rows="10"
              onChange={(e) => setObservations(e.target.value)}
            ></textarea>
          </form>
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
            onClick={handleUpload}
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

export default New_document;
