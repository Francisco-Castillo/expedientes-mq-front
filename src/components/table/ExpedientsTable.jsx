import React from "react";
import { useNavigate } from "react-router-dom";

import New_document from "../modal/new_document";

import UpdateExpedient from "../modal/updateExpedient";

import Dropdown from "react-bootstrap/Dropdown";

import settings from "../../assets/settings.svg";

import { useSelector } from "react-redux/es/hooks/useSelector";

import decodeToken from "../../helpers/decodeToken";

import "../../styles/table.css";

const ExpedientsTable = ({ expedients }) => {
  const { token } = useSelector((state) => state.auth);

  const navigation = useNavigate();

  const viewExpedient = (expedientId) => {
    navigation(`/expedient/${expedientId}`);
  };

  const { sub } = decodeToken(token);

  return (
    <table className="registros-table">
      <thead>
        <tr>
          <th>Iniciado</th>
          <th>Número</th>
          <th>Tipo de Expediente</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Enviado por</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {expedients.map((expediente, index) => (
          <tr key={index}>
            <td>{expediente.fechaCaratulacion}</td>
            <td>{expediente.numero}</td>
            <td>{expediente.tipo}</td>
            <td>{expediente.descripcion}</td>
            <td>{expediente.estado}</td>
            <td>{sub}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                  <img src={settings} alt="" width={"30px"} height={"30px"} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => viewExpedient(expediente.id)}>
                    Tramitar
                  </Dropdown.Item>
                  <UpdateExpedient expedientId={expediente.id} />
                  <New_document />
                  <Dropdown.Item>Realizar pase</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpedientsTable;
