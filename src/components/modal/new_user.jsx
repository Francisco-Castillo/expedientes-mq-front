import React, { useEffect, useState } from "react";

import {
  setApellido,
  setAreaId,
  setDocumento,
  setEmail,
  setNombre,
} from "../../store/User/newUser";

import { Modal, Button } from "react-bootstrap";

import useUsers from "../../hooks/useUsers";

import { IoIosSave } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const New_User = () => {
  const { areas } = useSelector((state) => state.areas);

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { newUser } = useUsers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newUser(setShow);
  };

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
        Crear Usuario
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
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          <form className="expedient-form">
            <label className="expedient-label" htmlFor="">
              Dependencia :
            </label>

            <select
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => dispatch(setAreaId(e.target.value))}
            >
              <option>Seleccionar dependencia</option>
              {areas.map((area, index) => (
                <option value={area.id} key={index}>
                  {area.descripcion}
                </option>
              ))}
            </select>

            <label className="expedient-label" htmlFor="">
              Nombre :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              onChange={(e) => dispatch(setNombre(e.target.value))}
            />

            <label className="expedient-label" htmlFor="">
              Apellido :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              onChange={(e) => dispatch(setApellido(e.target.value))}
            />

            <label className="expedient-label" htmlFor="">
              DNI :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              onChange={(e) => dispatch(setDocumento(e.target.value))}
            />

            <label className="expedient-label" htmlFor="">
              Correo :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="email"
              className="expedient-input"
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
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

export default New_User;
