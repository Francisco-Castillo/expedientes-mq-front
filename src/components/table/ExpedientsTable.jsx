import React from "react";
import { useNavigate } from "react-router-dom";

import LinkFile from "../modal/linkFile";
import UpdateExpedient from "../modal/updateExpedient";

import Dropdown from "react-bootstrap/Dropdown";

import settings from "../../assets/settings.svg";

import "../../styles/table.css";

const ExpedientsTable = ({ expedients }) => {
  const navigation = useNavigate();

  const viewExpedient = (expedientId) => {
    navigation(`/expedient/${expedientId}`);
  };

  return (
    <table className="registros-table">
      <thead>
        <tr>
          <th>Iniciado</th>
          <th>Número</th>
          <th>Tipo de Expediente</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Usuario Actual</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {expedients.map((expediente, index) => (
          <tr key={index}>
            <td>{expediente.fechaCaratulacion}</td>
            <td>{expediente.numeroExpediente}</td>
            <td>{expediente.tipoExpediente}</td>
            <td>{expediente.descripcion}</td>
            <td>{expediente.estado}</td>
            <td>{expediente.usuario}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                  <img src={settings} alt="" width={"30px"} height={"30px"} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => viewExpedient(expediente.id)}>
                    Ver
                  </Dropdown.Item>
                  <UpdateExpedient expedientId={expediente.id} />
                  <LinkFile expedientId={expediente.id} />
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
