import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import useExpedients from "../../hooks/useExpedients";

const UpdateExpedient = ({ expedientId }) => {
  const [expedient, setExpedient] = useState({});
  const [state, setState] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getExpedient(setExpedient, expedientId);
  };

  const { getExpedient, updateExpedient } = useExpedients();

  const handleUpdate = async () => {
    updateExpedient(state, setShow, expedientId);
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Cambiar estado</Dropdown.Item>

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
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Iniciado</Form.Label>
              <Form.Control
                type="text"
                value={expedient.fechaCaratulacion}
                readOnly
              />
              <Form.Label>Numero</Form.Label>
              <Form.Control
                type="text"
                defaultValue={expedient.numeroExpediente}
                readOnly
              />
              <Form.Label>Tipo de Expediente</Form.Label>
              <Form.Control
                type="text"
                value={expedient.tipoExpediente}
                readOnly
              />
              <Form.Label>Estado</Form.Label>
              <Form.Select
                aria-label="Selecionar estado"
                onChange={(e) => setState(e.target.value)}
              >
                <option>Cambiar estado</option>
                <option
                  value="Iniciado"
                  disabled={expedient.estado === "Iniciado"}
                >
                  Iniciado
                </option>
                <option
                  value="En Progreso"
                  disabled={expedient.estado === "En Progreso"}
                >
                  En Progreso
                </option>
                <option
                  value="Completado"
                  disabled={expedient.estado === "Completado"}
                >
                  Completado
                </option>
                <option
                  value="Suspendido"
                  disabled={expedient.estado === "Suspendido"}
                >
                  Suspendido
                </option>
                <option value="Baja" disabled={expedient.estado === "Baja"}>
                  Baja
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              //   controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={expedient.descripcion}
                readOnly
              />
            </Form.Group>
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
            onClick={handleUpdate}
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

export default UpdateExpedient;
