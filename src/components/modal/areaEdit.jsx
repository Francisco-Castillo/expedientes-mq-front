import React, { useState } from "react";

import useAreas from "../../hooks/useAreas";

import { Dropdown, Modal, Button, Form } from "react-bootstrap";

const AreaEdit = ({
  areaId,
  descripcion,
  codigoPresupuestario,
  nivel,
  referenciaId,
}) => {
  // const { codigoPresupuestario, descripcion } = useSelector(
  //   (state) => state.area
  // );

  const [Newdescripcion, setDescripcion] = useState("");
  const [NewcodigoPresupuestario, setCodigoPresupuestario] = useState("");
  const [newNivel, setNivel] = useState();
  const [newReferenciaId, setReferenciaId] = useState();

  const [show, setShow] = useState(false);

  const { updateArea, getAreas } = useAreas();

  const handleClose = () => {
    getAreas();
    setShow(false);
  };

  const handleShow = async (e) => {
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateArea(
      areaId,
      Newdescripcion,
      NewcodigoPresupuestario,
      newNivel,
      newReferenciaId
    );
    handleClose();
  };

  return (
    <>
      <Dropdown.Item variant="light" onClick={handleShow}>
        Editar
      </Dropdown.Item>

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
          <Modal.Title>Editar Area</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          <Form id="expedient-form">
            <Form.Group className="mb-3">
              <Form.Label className="expedient-label" htmlFor="">
                Descripcion :
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
                type="text"
                className="expedient-input"
                defaultValue={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="expedient-label" htmlFor="">
                Codigo Presupuestario :
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
                type="text"
                className="expedient-input"
                defaultValue={codigoPresupuestario}
                onChange={(e) => setCodigoPresupuestario(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="expedient-label" htmlFor="">
                Nivel :
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
                type="number"
                className="expedient-input"
                defaultValue={nivel}
                onChange={(e) => setNivel(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="expedient-label" htmlFor="">
                Referencia ID :
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
                type="number"
                className="expedient-input"
                defaultValue={referenciaId}
                onChange={(e) => setReferenciaId(e.target.value)}
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
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-folder"
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

export default AreaEdit;
