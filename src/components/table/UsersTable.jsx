import React from "react";

import Dropdown from "react-bootstrap/Dropdown";

import settings from "../../assets/settings.svg";

// import { usuarios } from "../../Data/Users.json";

import UserEdit from "../modal/userEdit";

const UsersTable = ({ users }) => {
  return (
    <table className="registros-table">
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
            <td>{user.dni}</td>
            <td>{user.email}</td>
            <td>{user.dependencia}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                  <img src={settings} alt="" width={"30px"} height={"30px"} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <UserEdit userId={user.id} />
                  <Dropdown.Item>Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
