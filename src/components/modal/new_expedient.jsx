import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useExpedients from "../../hooks/useExpedients";

import {
  setBudgetCode,
  setDescription,
  setDate,
  setMonto,
  setResponsable,
  setReference,
  setType,
  setClearAttributes,
} from "../../store/expedients/expedient";

import { SetRefreshMyExpedientsList } from "../../store/expedients/expedients";

import { Form, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

import { IoIosSave } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa6";

import "../../styles/new_expedient.css";

const New_Expedient = () => {
  const { newExpedient, lastExpedientNumber } = useExpedients();

  const dispatch = useDispatch();

  const { number } = useSelector((state) => state.expedient);

  const { types } = useSelector((state) => state.expedientProperties);

  const { areas } = useSelector((state) => state.areas);

  const [show, setShow] = useState(false);

  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(setClearAttributes());
    dispatch(SetRefreshMyExpedientsList(false));
  };

  const handleShow = () => {
    setShow(true);
    lastExpedientNumber();
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      newExpedient(setShow);
      dispatch(setClearAttributes());
      dispatch(SetRefreshMyExpedientsList(true));
    }
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
          <Form
            id="expedient-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Label htmlFor="">Numero Expediente :</Form.Label>

            <Form.Group className="mb-3">
              <Form.Control
                defaultValue={number}
                readOnly
                style={{ width: "20%", marginBottom: "10px" }}
                className="expedient-input"
              />
              <Form.Control.Feedback type="invalid">
                Por favor seleccione el Código Presupuestario
              </Form.Control.Feedback>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => dispatch(setBudgetCode(e.target.value))}
                className="expedient-input"
                required
              >
                <option value="">Código Presupuestario</option>
                {areas
                  .filter((area) => area.codigoPresupuestario !== null)
                  .map((area, index) => (
                    <option value={area.codigoPresupuestario} key={index}>
                      {`${area.codigoPresupuestario} - ${area.descripcion}`}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor seleccione el Código Presupuestario
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label htmlFor="">Tipo de expediente :</Form.Label>

            <Form.Group className="mb-3">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => dispatch(setType(e.target.value))}
                className="expedient-input"
                required
              >
                <option value="">Seleccionar</option>
                {types.map((type, index) => (
                  <option value={type} key={index}>
                    {type}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor seleccione el tipo de expediente
              </Form.Control.Feedback>
            </Form.Group>

            {/* FECHA INGRESADA POR EL USUARIO */}
            <Form.Label htmlFor="">Fecha :</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                onChange={(e) => dispatch(setDate(e.target.value))}
                className="expedient-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor elija una fecha
              </Form.Control.Feedback>
            </Form.Group>

            {/* MONTO A INGRESAR POR INPUT */}
            <Form.Label htmlFor="">Monto :</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                onChange={(e) => dispatch(setMonto(e.target.value))}
                className="expedient-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un monto
              </Form.Control.Feedback>
            </Form.Group>

            {/* PERMITE INGRESAR UN RESPONSABLE */}
            <Form.Label htmlFor="">Responsable :</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                onChange={(e) => dispatch(setResponsable(e.target.value))}
                className="expedient-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor complete el campo
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label htmlFor="">Referencia :</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                onChange={(e) => dispatch(setReference(e.target.value))}
                className="expedient-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor complete el campo
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label htmlFor="">Descripcion :</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                name="Description"
                className="expedient-input"
                cols="10"
                rows="3"
                onChange={(e) => dispatch(setDescription(e.target.value))}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese una descripción
              </Form.Control.Feedback>
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
            form="expedient-form" // Este form attribute asegura que el onSubmit del formulario se llame
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
