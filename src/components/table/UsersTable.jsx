import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Dropdown, Table } from "react-bootstrap";

import UserEdit from "../modal/userEdit";
import Pagination from "../Pagination";

import useUsers from "../../hooks/useUsers";

import { IoSettingsSharp } from "react-icons/io5";
import { onLoad } from "../../store/load";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  const { totalPages } = useSelector((state) => state.pages);
  const { loadStatus } = useSelector((state) => state.load);

  const { getUsers, changeState } = useUsers();
  const dispatch = useDispatch();

  const handleChangeState = async (data) => {
    if (data.estado) {
      await changeState(data.id, 0);
    } else {
      await changeState(data.id, 1);
    }
  };

  useEffect(() => {
    getUsers(setUsers);
  }, [users]);

  useEffect(() => {
    if (loadStatus) {
      const timer = setTimeout(() => {
        dispatch(onLoad(false));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loadStatus]);

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
              <td
                style={{
                  color: user.estado === 0 ? "rgba(212, 25, 25, 1)" : "inherit",
                }}
              >
                {user.nombre}
              </td>
              <td
                style={{
                  color: user.estado === 0 ? "rgba(212, 25, 25, 1)" : "inherit",
                }}
              >
                {user.apellido}
              </td>
              <td
                style={{
                  color: user.estado === 0 ? "rgba(212, 25, 25, 1)" : "inherit",
                }}
              >
                {user.documento}
              </td>
              <td
                style={{
                  color: user.estado === 0 ? "rgba(212, 25, 25, 1)" : "inherit",
                }}
              >
                {user.email}
              </td>
              <td
                style={{
                  color: user.estado === 0 ? "rgba(212, 25, 25, 1)" : "inherit",
                }}
              >
                {user.area.descripcion}
              </td>
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
      {totalPages > 1 ? <Pagination /> : null}
    </>
  );
};

export default UsersTable;
