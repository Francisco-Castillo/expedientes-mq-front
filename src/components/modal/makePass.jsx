import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import MakePassTable from "../table/makePassTable";

import getDateTime from "../../helpers/getDate";

import useExpedients from "../../hooks/useExpedients";
import useUsers from "../../hooks/useUsers";

import { clearSearchResult } from "../../store/search";
import { SetRefreshExpedientsInbox } from "../../store/expedients/expedients";

import { Form, Modal, Button } from "react-bootstrap";

import { MdDriveFileMove } from "react-icons/md";

const MakePass = ({ expedient, isOpened, setIsOpened }) => {
  const [selectUserReceptor, setSelectUserReceptor] = useState({});
  const [observations, setObservations] = useState("");

  const [users, setUsers] = useState([]);

  const { expedientPass } = useExpedients();
  const { getUsers } = useUsers();

  const { userId } = useSelector((state) => state.userData.user);

  const date = getDateTime();

  const dispatch = useDispatch();

  const handleClose = () => {
    setIsOpened(false);
    dispatch(clearSearchResult());
    dispatch(SetRefreshExpedientsInbox(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    expedientPass(
      userId,
      selectUserReceptor.id,
      selectUserReceptor.nombre,
      selectUserReceptor.apellido,
      date,
      expedient.id,
      observations
    );
    dispatch(clearSearchResult());
    dispatch(SetRefreshExpedientsInbox(true));
    setIsOpened(false);
  };

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <>
      <Modal
        size="lg"
        show={isOpened}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(235, 87, 87, 1)", color: "white" }}
        >
          <Modal.Title>{`Pase de Expediente N° ${expedient?.numero}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px" }}>
          <Form id="user-form">
            <Form.Label htmlFor="">Motivo del pase :</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                className="me-2"
                type="text"
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Motivo del pase"
                style={{
                  borderColor: "rgb(188, 191, 194)",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
              />
            </Form.Group>

            <Form.Label htmlFor="">Usuario :</Form.Label>
            <Form.Group>
              <Form.Select>
                <option value="">Seleccionar destino del pase</option>
                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                    hidden={user.id === userId}
                    onClick={(e) => {
                      setSelectUserReceptor(user);
                    }}
                  >
                    {user.area.descripcion} - {user.nombre} {user.apellido}
                  </option>
                ))}
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
            <MdDriveFileMove style={{ fontSize: "25px" }} />
            Realizar pase
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

export default MakePass;
