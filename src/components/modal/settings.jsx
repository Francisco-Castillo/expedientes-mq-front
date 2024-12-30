import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

import TypeTable from "../table/TypeTable";
import useExpedients from "../../hooks/useExpedients";

function Settings({ isOpened, setIsOpened }) {
  const [name, setName] = useState("");

  const handleClose = () => setIsOpened(false);

  const [validated, setValidated] = useState(false);

  const { createExpedientType, listExpedientTypes } = useExpedients();

  const handleSubmit = async () => {
    if (name.trim()) {
      await createExpedientType(name);
      await listExpedientTypes();
      setName("");
      setValidated(false);
      setIsOpened(false);
    } else {
      setValidated(true);
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
      <Modal
        size="lg"
        show={isOpened}
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
                value={name}
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
