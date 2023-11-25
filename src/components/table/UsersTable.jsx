import React from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import UserEdit from "../modal/userEdit";

import { IoSettingsSharp } from "react-icons/io5";

const UsersTable = ({ users }) => {
  return (
    <Table responsive striped bordered hover id="table-data">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>Correo</th>
          <th>Dependencias</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.nombre}</td>
            <td>{user.apellido}</td>
            <td>{user.documento}</td>
            <td>{user.email}</td>
            <td>{user.dependencia}</td>
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
                  <UserEdit userEmail={user.email} />
                  <Dropdown.Item>Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
