import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateState } from "../../store/expedients/expedient";

import useExpedients from "../../hooks/useExpedients";

import { IoIosSave } from "react-icons/io";

import { Dropdown, Form, Modal, Button } from "react-bootstrap";

const UpdateExpedient = ({ expedientId }) => {
  const [expedient, setExpedient] = useState({});

  const { status } = useSelector((state) => state.expedientProperties);

  const { getExpedient, updateExpedient } = useExpedients();

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    await getExpedient(setExpedient, expedientId);
  };

  const handleUpdate = async () => {
    await updateExpedient(setShow, expedientId);
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
                onChange={(e) => dispatch(updateState(e.target.value))}
              >
                <option value="">Seleccionar Estado</option>
                {status.map((state, index) => (
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
