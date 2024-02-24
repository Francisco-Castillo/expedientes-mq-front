import React from "react";
import { useSelector } from "react-redux";

import { Table, Form } from "react-bootstrap";

import Pagination from "../Pagination";

const MakePassTable = ({ setUserReceiver }) => {
  const { userSearchResult } = useSelector((state) => state.search);

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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userSearchResult.map((usuario, index) => (
                <tr key={index}>
                  <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
                  <td>{usuario.area.descripcion}</td>

                  <td>
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
