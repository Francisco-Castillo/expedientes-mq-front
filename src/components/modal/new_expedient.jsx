import { useState } from "react";

import { Form, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

import useExpedients from "../../hooks/useExpedients";
import useAreas from "../../hooks/useAreas";

import { IoIosSave } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa6";

import "../../styles/new_expedient.css";

const New_Expedient = () => {
  const [expedientNumber, setExpedientNumber] = useState();
  const [reference, setReference] = useState();
  const [expedientType, setExpedientType] = useState("");
  const [expedientTypes, setExpedientTypes] = useState([]);
  const [codigoTramite, setCodigoTramite] = useState();
  const [description, setDescription] = useState();
  const [codigoPresupuestario, setCodigoPresupuestario] = useState();

  const [areas, setAreas] = useState([]);

  const [show, setShow] = useState(false);

  const { newExpedient, lastExpedientNumber, listExpedientTypes } =
    useExpedients();

  const { getAreas } = useAreas();

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
      description,
      codigoTramite,
      expedientType,
      setShow
    );
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
          <FaFileSignature
            onClick={handleShow}
            // style={{ fontSize: "45px" }}
            className="newExpedient"
          />
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
                value={expedientType}
                onChange={(e) => setExpedientType(e.target.value)}
              >
                <option>Seleccionar</option>
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
            {/* <Form.Label htmlFor="">Codigo de tramite :</Form.Label>

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
            </Form.Group> */}
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
