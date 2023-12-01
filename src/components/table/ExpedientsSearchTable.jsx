import React from "react";
import { useNavigate } from "react-router-dom";

import SearchEmpty from "../card/searchEmpty";
import Pagination from "../Pagination";

import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import { IoSettingsSharp } from "react-icons/io5";

import "../../styles/table.css";

const ExpedientsSearchTable = ({
  resultSearch,
  totalPages,
  setCurrentPage,
  currentPage,
}) => {
  const navigation = useNavigate();

  const viewExpedient = (expedientId) => {
    navigation(`/expedient/${expedientId}`);
  };

  return (
    <>
      {resultSearch.length ? (
        <div>
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
              {resultSearch.map((expedient, index) => (
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
                        <Dropdown.Item
                          onClick={() => viewExpedient(expedient.id)}
                        >
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
        </div>
      ) : (
        <SearchEmpty />
      )}
    </>
  );
};

export default ExpedientsSearchTable;
