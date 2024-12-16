import { useState } from "react";
import { Form, OverlayTrigger, Tooltip, Button, Modal } from "react-bootstrap";

import { IoIosSave, IoIosSettings } from "react-icons/io";
import TypeTable from "../table/TypeTable";
import useExpedients from "../../hooks/useExpedients";

function Settings() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);

  const { createExpedientType, listExpedientTypes } = useExpedients();

  const handleSubmit = async () => {
    if (name.trim()) {
      await createExpedientType(name);
      await listExpedientTypes();
      setName(""); // Limpiar el input después de crear
      setValidated(false);
    } else {
      setValidated(true); // Mostrar el mensaje de validación si está vacío
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id="tooltip">Configurar Tipos de Expedientes</Tooltip>
        }
      >
        <div
          style={{
            textAlign: "center",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          <IoIosSettings onClick={handleShow} className="newExpedient" />
        </div>
      </OverlayTrigger>

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
          <Modal.Title>Configuracion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          <Form id="expedient-form" noValidate validated={validated}>
            <Form.Label>Tipo de Expediente:</Form.Label>
            <Form.Group
              className="mb-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Control
                className="expedient-input"
                type="text"
                placeholder="Ingrese un nuevo tipo de expediente"
                required
                value={name} // Enlazar el valor del input al estado
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                onClick={handleSubmit}
                style={{
                  background: "rgba(235, 87, 87, 1)",
                }}
              >
                Crear
              </Button>
            </Form.Group>
          </Form>

          <TypeTable />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Settings;
