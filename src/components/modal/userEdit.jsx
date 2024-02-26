import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useUsers from "../../hooks/useUsers";

import {
  clearUserData,
  updateAreaId,
  updateLastName,
  updateName,
  updateDni,
} from "../../store/User/userSelect";

import { Dropdown, Modal, Button, Form } from "react-bootstrap";

const UserEdit = ({ userEmail }) => {
  const { nombre, apellido, documento, email } = useSelector(
    (state) => state.userSelect.user
  );
  const { descripcion } = useSelector((state) => state.userSelect.user.area);
  const { areas } = useSelector((state) => state.areas);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const { updateUser, getUser } = useUsers();

  const handleClose = () => {
    setShow(false);
    dispatch(clearUserData());
  };
  const handleShow = async (e) => {
    setShow(true);
    await getUser(userEmail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(setShow);
    dispatch(clearUserData());
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
                onChange={(e) => dispatch(updateAreaId(e.target.value))}
              >
                <option>Seleccionar dependencia</option>
                {areas.map((e, index) => (
                  <option
                    value={e.areaId}
                    key={index}
                    disabled={descripcion === e.descripcion}
                  >
                    {e.descripcion}
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
                defaultValue={nombre}
                onChange={(e) => dispatch(updateName(e.target.value))}
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
                defaultValue={apellido}
                onChange={(e) => dispatch(updateLastName(e.target.value))}
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
                defaultValue={documento}
                onChange={(e) => dispatch(updateDni(e.target.value))}
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
                defaultValue={email}
                disabled
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
