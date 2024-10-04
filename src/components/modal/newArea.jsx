import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";

import { IoIosSave } from "react-icons/io";
import useAreas from "../../hooks/useAreas";
import { useSelector } from "react-redux";

const NewArea = () => {
  const [descripcion, setDescripcion] = useState("");
  const [codigoPresupuestario, setCodigoPresupuestario] = useState("");
  const [nivel, setNivel] = useState();
  const [referenciaId, setReferenciaId] = useState();

  const { areas } = useSelector((state) => state.areas);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    getAreas();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const { createArea, getAreas } = useAreas();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArea(descripcion, codigoPresupuestario, nivel, referenciaId);
    handleClose();
  };

  return (
    <>
      <Button
        variant="dark"
        style={{
          borderRadius: "4px",
          padding: "10px 20px",
          marginBottom: "10px",
        }}
        onClick={handleShow}
      >
        Crear Area
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
          <Modal.Title>Crear Area</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          <form className="expedient-form">
            <label className="expedient-label" htmlFor="">
              Descripcion :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              onChange={(e) => setDescripcion(e.target.value)}
            />

            <label className="expedient-label" htmlFor="">
              Codigo Presupuestario :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              onChange={(e) => setCodigoPresupuestario(e.target.value)}
            />

            <label className="expedient-label" htmlFor="">
              Depende de :
            </label>
            <select
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setReferenciaId(e.target.value)}
            >
              <option>Seleccionar</option>
              {areas.map((area, index) => (
                <option value={area.id} key={index}>
                  {area.descripcion}
                </option>
              ))}
            </select>
          </form>
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
            Crear
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

export default NewArea;
