import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { onLoad } from "../../store/load";

import decodeToken from "../../helpers/decodeToken";

import { Table, Dropdown } from "react-bootstrap";
import { IoSettingsSharp } from "react-icons/io5";

import useExpedients from "../../hooks/useExpedients";
import Pagination from "../Pagination";
import Empty from "../card/empty";
import New_document from "../modal/new_document";
import MakePass from "../modal/makePass";
import UpdateExpedient from "../modal/updateExpedient";
import LoadColorRing from "../loaders/colorRIng";

import "../../styles/table.css";

const MyExpedientsTable = () => {
  const { token } = useSelector((state) => state.auth);
  const { page } = useSelector((state) => state.pages);
  const { status } = useSelector((state) => state.load);

  const { userId } = decodeToken(token);

  const { getMyExpedients } = useExpedients();

  const [expedients, setExpedients] = useState([]);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const viewExpedient = (expedientId) => {
    navigation(`/expediente/${expedientId}`);
  };

  useEffect(() => {
    getMyExpedients(setExpedients, userId);
  }, [page || expedients]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(onLoad(false));
    }, 1000);
  }, [status]);

  return (
    <>
      {status ? (
        <LoadColorRing />
      ) : (
        <>
          {expedients.length ? (
            <>
              <Table
                responsive
                striped
                bordered
                hover
                id="table-data"
                className={`table ${expedients.length == 1 ? "short" : "long"}`}
              >
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
                        <Dropdown
                          key="end"
                          id="dropdown-button-drop-end"
                          drop="end"
                          variant="secondary"
                          title="Drop end"
                        >
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
              <Pagination />
            </>
          ) : (
            <Empty />
          )}
        </>
      )}
    </>
  );
};

export default MyExpedientsTable;
