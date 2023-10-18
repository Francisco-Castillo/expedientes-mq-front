import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import Swal from "sweetalert2";

import "../../styles/new_document.css";

const New_document = () => {
  const [file, setFile] = useState();
  const [observations, setObservations] = useState();
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const BaseUrl = import.meta.env.VITE_API_URL;

  const formData = new FormData();

  formData.append("files", file);

  const data = {
    fechaSubida: date,
    observaciones: observations,
    tipoDocumentoId: 1,
    documenteId: 1,
  };

  formData.append("data", JSON.stringify(data));

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${BaseUrl}documentos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShow(false);

      Swal.fire({
        iconHtml: customIcon,
        text: "Documento subido exitosamente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });

      console.log(data);
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

  const customIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-check" width="30" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M11 19h-6a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4"></path>
    <path d="M15 19l2 2l4 -4"></path>
  </svg>`;

  // console.log(file);
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
          <form className="document-form">
            <label className="document-label" htmlFor="">
              Seleccionar :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="file"
              className="document-input"
              onChange={(e) => setFile(e.target.files[0])}
            />

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
