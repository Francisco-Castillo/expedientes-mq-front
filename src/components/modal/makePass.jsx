import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import MakePassTable from "../table/makePassTable";
import SearchUser from "../searchUser";

import getDateTime from "../../helpers/getDate";

import useExpedients from "../../hooks/useExpedients";

import { clearSearchResult } from "../../store/search";

import { Form, Dropdown, Modal, Button } from "react-bootstrap";

import { MdDriveFileMove } from "react-icons/md";

const MakePass = ({ expedientId }) => {
  const [expedient, setExpedient] = useState({});
  const [userReceiver, setUserReceiver] = useState({});
  const [observations, setObservations] = useState("");

  const [show, setShow] = useState(false);

  const { getExpedient, expedientPass } = useExpedients();

  const { userId } = useSelector((state) => state.userData.user);

  const date = getDateTime();

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    dispatch(clearSearchResult());
  };

  const handleShow = () => {
    getExpedient(setExpedient, expedientId);
    setShow(true);
  };

  const handleSubmit = () => {
    expedientPass(
      userId,
      userReceiver.id,
      userReceiver.nombre,
      userReceiver.apellido,
      date,
      expedientId,
      observations,
      setShow
    );
    dispatch(clearSearchResult());
  };

  return (
    <>
      <Dropdown.Item variant="light" onClick={handleShow}>
        Realizar Pase
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
          <Modal.Title>{`Pase de Expediente N° ${expedient.numero}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px" }}>
          <Form id="user-form">
            <Form.Label htmlFor="">Motivo del pase :</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                className="me-2"
                type="text"
                onChange={(e) => setObservations(e.target.value)}
              />
            </Form.Group>

            <Form.Label htmlFor="">Usuario :</Form.Label>
            <Form.Group>
              <SearchUser />
            </Form.Group>
          </Form>

          <MakePassTable setUserReceiver={setUserReceiver} />
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
