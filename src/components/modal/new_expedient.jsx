import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useExpedients from "../../hooks/useExpedients";

import {
  setBudgetCode,
  setDescription,
  setReference,
  setType,
  setClearAttributes,
} from "../../store/expedients/expedient";

import { refreshExpedientsList } from "../../store/expedients/expedients";

import { Form, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

import { IoIosSave } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa6";

import "../../styles/new_expedient.css";

const New_Expedient = () => {
  const { type, budgetCode, number } = useSelector((state) => state.expedient);

  const { types } = useSelector((state) => state.expedientProperties);

  const { areas } = useSelector((state) => state.areas);

  const [show, setShow] = useState(false);

  const { newExpedient, lastExpedientNumber } = useExpedients();

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    dispatch(setClearAttributes());
    dispatch(refreshExpedientsList(false));
  };
  const handleShow = () => {
    setShow(true);
    lastExpedientNumber();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newExpedient(setShow);
    dispatch(setClearAttributes());
    dispatch(refreshExpedientsList(true));
  };

  return (
    <>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip">Caratular Expediente</Tooltip>}
      >
        <div
          style={{
            textAlign: "center",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          <FaFileSignature onClick={handleShow} className="newExpedient" />
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
          <Modal.Title>Caratular Expediente</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px" }}>
          <Form id="expedient-form">
            <Form.Label htmlFor="">Numero Expediente :</Form.Label>

            <Form.Group className="mb-3">
              <Form.Control
                defaultValue={number}
                readOnly
                style={{ width: "20%", marginBottom: "10px" }}
              />
              <Form.Select
                aria-label="Default select example"
                value={budgetCode}
                onChange={(e) => dispatch(setBudgetCode(e.target.value))}
              >
                <option value="">Codigo Presupuestario</option>
                {areas
                  .filter((area) => area.codigoPresupuestario !== null)
                  .map((area, index) => (
                    <option value={area.codigoPresupuestario} key={index}>
                      {`${area.codigoPresupuestario} - ${area.descripcion}`}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Label htmlFor="">Tipo de expediente :</Form.Label>

            <Form.Group className="mb-3">
              <Form.Select
                aria-label="Default select example"
                value={type}
                onChange={(e) => dispatch(setType(e.target.value))}
              >
                <option value="">Seleccionar</option>
                {types.map((type, index) => (
                  <option value={type} key={index}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Label htmlFor="">Referencia :</Form.Label>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                onChange={(e) => dispatch(setReference(e.target.value))}
              />
            </Form.Group>

            <Form.Label htmlFor="">Descripcion :</Form.Label>
            <Form.Group className="mb-3">
              <textarea
                name="Description"
                id=""
                className="expedient-textarea"
                cols="100"
                rows="10"
                onChange={(e) => dispatch(setDescription(e.target.value))}
              ></textarea>
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

export default New_Expedient;
