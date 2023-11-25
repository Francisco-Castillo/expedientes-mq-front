import React from "react";
import { useNavigate } from "react-router-dom";

import New_document from "../modal/new_document";

import UpdateExpedient from "../modal/updateExpedient";

import Dropdown from "react-bootstrap/Dropdown";

import Table from "react-bootstrap/Table";

import { useSelector } from "react-redux/es/hooks/useSelector";

import decodeToken from "../../helpers/decodeToken";

import { IoSettingsSharp } from "react-icons/io5";

import "../../styles/table.css";

const ExpedientsTable = ({ expedients }) => {
  const { token } = useSelector((state) => state.auth);

  const navigation = useNavigate();

  const viewExpedient = (expedientId) => {
    navigation(`/expedient/${expedientId}`);
  };

  const { name, lastName } = decodeToken(token);
  // const x = decodeToken(token);
  // console.log(x);
  return (
    <Table responsive striped bordered hover id="table-data">
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
        {expedients.map((expedient, index) => (
          <tr key={index}>
            <td>{expedient.fechaCaratulacion}</td>
            <td>{expedient.numero}</td>
            <td>{expedient.tipo}</td>
            <td>{expedient.descripcion}</td>
            <td>{expedient.estado}</td>
            <td>{expedient.usuario}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    backgroundColor: "rgba(217, 70, 70, 1)",
                    borderColor: "gray",
                  }}
                  id="dropdown-basic"
                >
                  <IoSettingsSharp />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => viewExpedient(expedient.id)}>
                    Tramitar
                  </Dropdown.Item>
                  <UpdateExpedient expedientId={expedient.id} />
                  <New_document expedientId={expedient.id} />
                  <Dropdown.Item>Realizar pase</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpedientsTable;
