import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Swal from "sweetalert2";

import customIcon from "../../assets/customIcon.svg";

import "../../styles/new_expedient.css";

const New_Expedient = () => {
  const [date, setDate] = useState(new Date());
  const [numExpedient, setNumExpedient] = useState();
  const [reference, setReference] = useState();
  const [typeExpedient, setTypeExpedient] = useState("Subsidio");
  const [codigoTramite, setCodigoTramite] = useState();
  const [description, setDescription] = useState();

  const { token } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const data = JSON.parse(atob(token.slice(7).split(".")[1]));

  const BaseUrl = import.meta.env.VITE_API_URL;

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("es-AR", options);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/expedientes/caratular`, {
        numeroExpediente: "1002-TES-2023",
        referencia: reference,
        fechaCaratulacion: formattedDate,
        descripcion: description,
        codigoTramite: codigoTramite,
        estado: "iniciado",
        tipoExpediente: typeExpedient,
        // usuario: user.name + user.lastName,
      });
      setShow(false);
      Swal.fire({
        iconHtml: customIcon,
        text: "Expediente generado exitosamente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        text: error.message,
      });
      console.log(error);
    }
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
        Caratular Expediente
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
          <Modal.Title>Caratular Expediente</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          <form className="expedient-form">
            <label className="expedient-label" htmlFor="">
              Tipo de expediente :
            </label>

            <select
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              className="form-select"
              aria-label="Default select example"
              value={typeExpedient}
              onChange={(e) => setTypeExpedient(e.target.value)}
            >
              <option value="Subsidio">Subsidio</option>
              <option value="Pago">Pago</option>
              <option value="Compra">Compra</option>
              <option value="Personal">Personal</option>
              <option value="Solicitud de servicio">
                Solicitud de servicio
              </option>
            </select>

            <label className="expedient-label" htmlFor="">
              Referencia :
            </label>
            <input
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              type="text"
              className="expedient-input"
              onChange={(e) => setReference(e.target.value)}
            />

            <label className="expedient-label" htmlFor="">
              Descripcion :
            </label>

            <textarea
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              name="Description"
              id=""
              className="expedient-textarea"
              cols="100"
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label className="expedient-label" htmlFor="">
              Codigo de tramite :
            </label>
            <select
              style={{ backgroundColor: "rgba(217, 217, 217, 1) " }}
              className="form-select"
              aria-label="Default select example"
              value={typeExpedient}
              onChange={(e) => setCodigoTramite(e.target.value)}
            >
              <option value="Subsidio">Pago de factura</option>
              <option value="Pago">Pago de servicios</option>
              <option value="Compra">Pago de locacion</option>
              <option value="Personal">Pago a proveedores</option>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-folder"
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

export default New_Expedient;