import React, { useState } from "react";

import { Button, Modal, Form, Dropdown } from "react-bootstrap";

import useDocuments from "../../hooks/useDocuments";

import getDate from "../../helpers/getDate";

import { IoIosSave } from "react-icons/io";

import "../../styles/new_document.css";

const New_document = ({ expedientId }) => {
  const [file, setFile] = useState(null);
  const [observations, setObservations] = useState();
  const [types, setTypes] = useState([]);
  const [type, setType] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    ListDocumentTypes(setTypes);
  };

  const { newDocument, ListDocumentTypes } = useDocuments();

  const date = getDate();

  const formData = new FormData();

  formData.append("files", file);

  formData.append(
    "data",
    JSON.stringify({
      fechaCreacion: date,
      observaciones: observations,
      tipoDocumento: type,
      exepedienteId: expedientId,
    })
  );

  const handleUpload = async (e) => {
    e.preventDefault();
    await newDocument(formData, setShow);
  };

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
            <Form.Group>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setType(e.target.value)}
              >
                <option label="Seleccionar"></option>
                {types.map((e, index) => (
                  <option value={e.id} key={index}>
                    {e.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

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
              // value={observations}
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
            <IoIosSave style={{ fontSize: "25px" }} />
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
