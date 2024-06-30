import React from "react";
import { useSelector } from "react-redux";

import { Table, Form } from "react-bootstrap";

import Pagination from "../Pagination";

import { FaCheckCircle } from "react-icons/fa";

import "../../styles/makePass.css";

const MakePassTable = ({ setUserReceiver }) => {
  const { userSearchResult } = useSelector((state) => state.search);
  const { totalPages } = useSelector((state) => state.pages);
  const { name, lastName } = useSelector((state) => state.userData.user);

  const userFullName = `${name} ${lastName}`;

  const handleUserSelect = (user) => {
    setUserReceiver(user);
  };

  return (
    <>
      {userSearchResult.length ? (
        <>
          <Table responsive striped bordered hover id="table-makePass">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Área</th>
                <th style={{ textAlign: "center" }}>
                  <FaCheckCircle />
                </th>
              </tr>
            </thead>
            <tbody>
              {userSearchResult.map((usuario, index) => (
                <tr key={index}>
                  {userFullName !== `${usuario.nombre} ${usuario.apellido}` ? (
                    <>
                      <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
                      <td>{usuario.area.descripcion}</td>
                      <td style={{ textAlign: "center" }}>
                        <Form.Check
                          type="radio"
                          id={`custom-switch-${index}`}
                          name="userSelection"
                          value={usuario.id}
                          onChange={(e) => {
                            const userSelected = {
                              id: e.target.value,
                              nombre: usuario.nombre,
                              apellido: usuario.apellido,
                            };
                            handleUserSelect(userSelected);
                          }}
                        />
                      </td>
                    </>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination />
        </>
      ) : null}
    </>
  );
};

export default MakePassTable;
