import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import useUsers from "../../hooks/useUsers";
import useAreas from "../../hooks/useAreas";

import { IoIosSave } from "react-icons/io";

const New_User = () => {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [DNI, setDNI] = useState();
  const [email, setEmail] = useState();
  const [areaId, setAreaId] = useState();
  const [areas, setAreas] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { newUser } = useUsers();

  const { getAreas } = useAreas();

  const handleSubmit = (e) => {
    e.preventDefault();
    newUser(name, lastName, DNI, email, areaId, setShow);
  };

  useEffect(() => {
    getAreas(setAreas);
  }, []);

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
              onChange={(e) => setAreaId(e.target.value)}
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
              onChange={(e) => setName(e.target.value)}
            />

            <label className="expedient-label" htmlFor="">
              Apellido :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="expedient-label" htmlFor="">
              DNI :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              onChange={(e) => setDNI(e.target.value)}
            />

            <label className="expedient-label" htmlFor="">
              Correo :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="email"
              className="expedient-input"
              onChange={(e) => setEmail(e.target.value)}
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
