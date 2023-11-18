import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

import useUsers from "../../hooks/useUsers";
import useAreas from "../../hooks/useAreas";

const UserEdit = ({ userEmail }) => {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [DNI, setDNI] = useState();
  const [email, setEmail] = useState();
  const [dependence, setDependence] = useState();

  const [areas, setAreas] = useState([]);

  const [user, SetUser] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
    getUser(SetUser, userEmail);
  };

  const { updateUser, getUser } = useUsers();
  const { getAreas } = useAreas();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(name, lastName, DNI, email, dependence, user.id, setShow);
  };

  useEffect(() => {
    getAreas(setAreas);
  }, []);

  return (
    <>
      <Dropdown.Item
        variant="light"
        style={{
          borderRadius: "4px",
          padding: "10px 20px",
          marginBottom: "10px",
        }}
        onClick={handleShow}
      >
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
          <Modal.Title>Editar Usuario</Modal.Title>
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
              onChange={(e) => setDependence(e.target.value)}
            >
              <option>Seleccionar dependencia</option>
              {areas.map((area, index) => (
                <option
                  value={area.areaId}
                  key={index}
                  disabled={user.dependencia === area.descripcion}
                >
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
              defaultValue={user.nombre}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="expedient-label" htmlFor="">
              Apellido :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              defaultValue={user.apellido}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="expedient-label" htmlFor="">
              DNI :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              defaultValue={user.dni}
              onChange={(e) => setDNI(e.target.value)}
            />

            <label className="expedient-label" htmlFor="">
              Correo :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="email"
              className="expedient-input"
              defaultValue={user.email}
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

export default UserEdit;
