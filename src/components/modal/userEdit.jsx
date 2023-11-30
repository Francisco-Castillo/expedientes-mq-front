import React, { useEffect, useState } from "react";

import { Dropdown, Modal, Button, Form } from "react-bootstrap";

import useUsers from "../../hooks/useUsers";
import useAreas from "../../hooks/useAreas";

const UserEdit = ({ userEmail }) => {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [DNI, setDNI] = useState();
  const [email, setEmail] = useState();
  const [userArea, setUserArea] = useState();

  const [areas, setAreas] = useState([]);
  const [user, SetUser] = useState({});

  const [show, setShow] = useState(false);

  const { updateUser, getUser } = useUsers();
  const { getAreas } = useAreas();

  const handleClose = () => setShow(false);
  const handleShow = (e) => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(name, lastName, DNI, email, user.id, setShow);
  };

  const handleUpdate = async () => {
    await getAreas(setAreas);
    await getUser(SetUser, userEmail);
    const area = await user.area;
    setUserArea(area.descripcion);
  };

  useEffect(() => {
    handleUpdate();
  }, [show]);

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
          <Form id="expedient-form">
            <Form.Group className="mb-3">
              <Form.Label className="expedient-label" htmlFor="">
                Dependencia :
              </Form.Label>

              <Form.Select
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
                    disabled={userArea === area.descripcion}
                  >
                    {area.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="expedient-label" htmlFor="">
                Nombre :
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
                type="text"
                className="expedient-input"
                defaultValue={user.nombre}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="expedient-label" htmlFor="">
                Apellido :
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
                type="text"
                className="expedient-input"
                defaultValue={user.apellido}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="expedient-label" htmlFor="">
                DNI :
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
                type="text"
                className="expedient-input"
                defaultValue={user.dni}
                onChange={(e) => setDNI(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="expedient-label" htmlFor="">
                Correo :
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
                type="email"
                className="expedient-input"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
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

export default UserEdit;
