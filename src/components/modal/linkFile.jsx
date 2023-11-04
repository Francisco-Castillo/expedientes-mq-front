import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import useExpedients from "../../hooks/useExpedients";
import useDocuments from "../../hooks/useDocuments";

import iconSave from "../../assets/save.svg";

const LinkFile = ({ expedientId }) => {
  const { getExpedient, linkFile } = useExpedients();
  const { searchFiles } = useDocuments();

  const [expedient, setExpedient] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getExpedient(expedientId, setExpedient);
  };

  const [resultSearch, setResultSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [fileId, setFileId] = useState();

  const uploadFile = () => {
    linkFile(expedientId, fileId, setShow);
  };

  const selectFile = (fileId) => {
    setFileId(fileId);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchFiles(search, setResultSearch);
    }
  };

  useEffect(() => {
    searchFiles(search, setResultSearch);
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
              <Form.Select onChange={(e) => setSearch(e.target.value)}>
                <option value="">Elegir tipo del documento</option>
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
              // value={search}
              onChange={(e) => setSearch(e.target.value)}
              // onKeyDown={handleKeyDown}
            />
            {/* <button
              style={{
                borderRadius: "4px",
                padding: "8px 20px",
                marginBottom: "10px",
              }}
              onClick={searchFiles}
            >
              Buscar
            </button> */}
            <table className="registros-table">
              <thead>
                <tr>
                  <th>Fecha de creación</th>
                  <th>Tipo de documento</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {resultSearch.map((documento, index) => (
                  <tr key={index} onClick={() => selectFile(documento.id)}>
                    <td>{documento.fechaCreacion}</td>
                    <td>{documento.tipoDocumento}</td>
                    <td>{documento.observaciones}</td>
                    {/* <td></td> */}
                  </tr>
                ))}
              </tbody>
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
            onClick={uploadFile}
          >
            <img src={iconSave} alt="" />
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
