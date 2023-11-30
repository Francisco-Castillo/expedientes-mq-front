import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { Form, Button, Modal } from "react-bootstrap";

import useExpedients from "../../hooks/useExpedients";
import useAreas from "../../hooks/useAreas";

import decodeToken from "../../helpers/decodeToken";

import getDate from "../../helpers/getDate";

import { IoIosSave } from "react-icons/io";

import "../../styles/new_expedient.css";

const New_Expedient = () => {
  // const [date, setDate] = useState(new Date());
  const [expedientNumber, setExpedientNumber] = useState();
  const [reference, setReference] = useState();
  const [expedientTypes, setExpedientTypes] = useState([]);
  const [codigoTramite, setCodigoTramite] = useState();
  const [description, setDescription] = useState();
  const [iniciador, setIniciador] = useState();
  const [codigoPresupuestario, setCodigoPresupuestario] = useState();

  const date = getDate();

  const [areas, setAreas] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const { newExpedient, lastExpedientNumber, listExpedientTypes } =
    useExpedients();

  const { getAreas } = useAreas();

  const { areaName, userId } = decodeToken(token);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getAreas(setAreas);
    lastExpedientNumber(setExpedientNumber);
    listExpedientTypes(setExpedientTypes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newExpedient(
      expedientNumber,
      codigoPresupuestario,
      reference,
      date,
      description,
      codigoTramite,
      expedientTypes,
      userId,
      areaName,
      setShow
    );
  };

  useEffect(() => {}, [show, codigoPresupuestario]);

  return (
    <>
      <Button
        variant="light"
        style={{
          borderRadius: "4px",
          padding: "10px 20px",
          marginBottom: "10px",
        }}
        onClick={handleShow}
      >
        Caratular Expediente
      </Button>

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
                defaultValue={expedientNumber}
                readOnly
                style={{ width: "20%", marginBottom: "10px" }}
              />
              <Form.Select
                aria-label="Default select example"
                value={codigoPresupuestario}
                onChange={(e) => setCodigoPresupuestario(e.target.value)}
              >
                <option>Codigo Presupuestario</option>
                {areas.map((area, index) => (
                  <option value={area.codigoPresupuestario} key={index}>
                    {area.codigoPresupuestario
                      ? `${area.codigoPresupuestario} - ${area.descripcion}`
                      : null}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Label htmlFor="">Tipo de expediente :</Form.Label>

            <Form.Group className="mb-3">
              <Form.Select
                aria-label="Default select example"
                value={expedientTypes}
                onChange={(e) => setTypeExpedient(e.target.value)}
              >
                <option>seleccionar</option>
                {expedientTypes.map((type, index) => (
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
                onChange={(e) => setReference(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Form.Group>
            <Form.Label htmlFor="">Codigo de tramite :</Form.Label>

            <Form.Group className="mb-3">
              <Form.Select
                aria-label="Default select example"
                // value={expedientTypes}
                onChange={(e) => setCodigoTramite(e.target.value)}
              >
                <option value="Subsidio">Pago de factura</option>
                <option value="Pago">Pago de servicios</option>
                <option value="Compra">Pago de locacion</option>
                <option value="Personal">Pago a proveedores</option>
              </Form.Select>
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
