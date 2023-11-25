import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import useExpedients from "../../hooks/useExpedients";

import { IoIosSave } from "react-icons/io";

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

  console.log(expedient);

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
                defaultValue={expedient.fechaCaratulacion}
                readOnly
              />
              <Form.Label>Numero</Form.Label>
              <Form.Control
                type="text"
                defaultValue={expedient.numero}
                readOnly
              />
              <Form.Label>Tipo de Expediente</Form.Label>
              <Form.Control
                type="text"
                defaultValue={expedient.tipo}
                readOnly
              />
              <Form.Label>Estado</Form.Label>
              <Form.Select
                aria-label="Selecionar estado"
                onChange={(e) => setState(e.target.value)}
              >
                <option>Cambiar estado</option>
                <option
                  defaultValue="Iniciado"
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

export default UpdateExpedient;
