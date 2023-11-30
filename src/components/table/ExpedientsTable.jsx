import React from "react";

import { useNavigate } from "react-router-dom";

import New_document from "../modal/new_document";

import UpdateExpedient from "../modal/updateExpedient";
import Pagination from "../Pagination";

import MakePass from "../modal/makePass";

import { Table, Dropdown } from "react-bootstrap";

import { useSelector } from "react-redux/es/hooks/useSelector";

import decodeToken from "../../helpers/decodeToken";

import { IoSettingsSharp } from "react-icons/io5";

import "../../styles/table.css";

const ExpedientsTable = ({
  expedients,
  totalPages,
  setCurrentPage,
  currentPage,
}) => {
  const { token } = useSelector((state) => state.auth);

  const navigation = useNavigate();

  const viewExpedient = (expedientId) => {
    navigation(`/expedient/${expedientId}`);
  };

  const { name, lastName } = decodeToken(token);

  return (
    <>
      <Table responsive striped bordered hover id="table-data">
        <thead>
          <tr>
            <th>Número</th>
            <th>Iniciado</th>
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
              <td>{expedient.numero}</td>
              <td>{expedient.fechaCaratulacion}</td>
              <td>{expedient.tipo}</td>
              <td>{expedient.descripcion}</td>
              <td>{expedient.estado}</td>
              <td>{`${expedient.usuarioEmisor.nombre} ${expedient.usuarioEmisor.apellido}`}</td>
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
                      Ver expediente
                    </Dropdown.Item>
                    <UpdateExpedient expedientId={expedient.id} />
                    <New_document expedientId={expedient.id} />
                    <MakePass expedientId={expedient.id}></MakePass>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default ExpedientsTable;
