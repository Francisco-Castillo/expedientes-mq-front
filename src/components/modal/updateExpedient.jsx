import React, { useState } from "react";

import { Dropdown, Form, Modal, Button } from "react-bootstrap";

import useExpedients from "../../hooks/useExpedients";

import { IoIosSave } from "react-icons/io";

const UpdateExpedient = ({ expedientId }) => {
  const [expedient, setExpedient] = useState({});
  const [states, setStates] = useState([]);
  const [state, setState] = useState(null);

  const { getExpedient, updateExpedient, listExpedientStates } =
    useExpedients();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    await getExpedient(setExpedient, expedientId);
    await listExpedientStates(setStates);
  };

  const handleUpdate = async () => {
    await updateExpedient(state, setShow, expedientId);
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
          style={{
            backgroundColor: "rgba(235, 87, 87, 1)",
            color: "white",
          }}
        >
          <Modal.Title>{`Expediente  ${expedient.numero}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          <Form id="expedient-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Iniciado</Form.Label>
              <Form.Control
                type="text"
                defaultValue={expedient.fechaCaratulacion}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Expediente</Form.Label>
              <Form.Control
                type="text"
                defaultValue={expedient.tipo}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              {" "}
              <Form.Label>Estado</Form.Label>
              <Form.Select
                aria-label="Seleccionar estado"
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Seleccionar Estado</option>
                {states.map((state, index) => (
                  <option value={state} key={index}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
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
