import React, { useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import Empty from "../card/empty";
import UserEdit from "../modal/userEdit";

import useUsers from "../../hooks/useUsers";

import { IoSettingsSharp } from "react-icons/io5";
import Pagination from "../Pagination";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { getUsers, changeState } = useUsers();

  const handleChangeState = (data) => {
    console.log(data);
    if (data.estado) {
      changeState(data.id, 0);
    } else {
      changeState(data.id, 1);
    }
  };

  useEffect(() => {
    getUsers(setUsers, setTotalPages, currentPage);
  }, [currentPage]);

  console.log(users);

  return (
    <>
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
                    <Dropdown.Item
                      onClick={() => {
                        const data = {
                          id: user.id,
                          estado: user.estado,
                        };
                        if (data.estado) {
                          handleChangeState(data);
                        } else {
                          handleChangeState(data);
                        }
                      }}
                    >
                      {user.estado ? "Desactivar" : "Activar"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {users.length ? (
        <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default UsersTable;
