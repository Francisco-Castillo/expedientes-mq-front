import React, { useEffect, useState } from "react";

import useExpedients from "../../hooks/useExpedients";
import Pagination from "../Pagination";

import { Table, Dropdown } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux/es/hooks/useSelector";

import decodeToken from "../../helpers/decodeToken";

import { IoSettingsSharp } from "react-icons/io5";

import "../../styles/table.css";

const MyExpedientsTable = ({}) => {
  const [expedients, setExpedients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userName, setUserName] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  const { token } = useSelector((state) => state.auth);

  const { userId } = decodeToken(token);

  const { getMyExpedients } = useExpedients();

  const navigation = useNavigate();

  const viewExpedient = (expedientId) => {
    navigation(`/expedient/${expedientId}`);
  };

  useEffect(() => {
    getMyExpedients(setExpedients, setTotalPages, currentPage, userId);
  }, []);

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
            <th>Caratulado por</th>
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
              <td>{`${expedient.usuario.nombre} ${expedient.usuario.apellido}`}</td>
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

export default MyExpedientsTable;
