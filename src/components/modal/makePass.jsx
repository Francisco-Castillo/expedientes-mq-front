import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import MakePassTable from "../table/makePassTable";
import SearchUser from "../searchUser";

import getDateTime from "../../helpers/getDate";

import useExpedients from "../../hooks/useExpedients";

import { clearSearchResult } from "../../store/search";
import { SetRefreshExpedientsInbox } from "../../store/expedients/expedients";

import { Form, Dropdown, Modal, Button } from "react-bootstrap";

import { MdDriveFileMove } from "react-icons/md";

import Swal from "sweetalert2";

const MakePass = ({ expedientId }) => {
  const [expedient, setExpedient] = useState({});
  const [selectUserReceiver, setSelectUserReceiver] = useState({});
  const [observations, setObservations] = useState("");
  const [passNumber, setPassNumber] = useState();
  const [actualUserReceiverId, setActualUserReceiverId] = useState();

  const [show, setShow] = useState(false);

  const { getExpedient, expedientPass, lastPassNumber } = useExpedients();

  const { userId } = useSelector((state) => state.userData.user);

  const date = getDateTime();

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    dispatch(clearSearchResult());
    dispatch(SetRefreshExpedientsInbox(false));
  };

  const handleShow = () => {
    setShow(true);
    getExpedient(setExpedient, expedientId);
    lastPassNumber(setPassNumber, setActualUserReceiverId, expedientId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (actualUserReceiverId === Number(selectUserReceiver.id)) {
      return Swal.fire({
        icon: "error",
        text: "El usuario seleccionado ya tiene en su poder este expediente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
    } else {
      expedientPass(
        userId,
        selectUserReceiver.id,
        selectUserReceiver.nombre,
        selectUserReceiver.apellido,
        date,
        expedientId,
        observations,
        setShow,
        passNumber
      );
      dispatch(clearSearchResult());
      dispatch(SetRefreshExpedientsInbox(true));
    }
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
                style={{
                  borderColor: "rgb(188, 191, 194)",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
              />
            </Form.Group>

            <Form.Label htmlFor="">Usuario :</Form.Label>
            <Form.Group>
              <SearchUser />
            </Form.Group>
          </Form>

          <MakePassTable
            setSelectUserReceiver={setSelectUserReceiver}
            actualUserReceiverId={actualUserReceiverId}
          />
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
