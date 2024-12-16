import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { onLoad } from "../../store/load";

import useExpedients from "../../hooks/useExpedients";

import New_document from "../modal/new_document";
import MakePass from "../modal/makePass";
import UpdateExpedient from "../modal/updateExpedient";

import Empty from "../card/empty";
import LoadColorRing from "../loaders/colorRIng";

import { Table, Dropdown } from "react-bootstrap";
import { IoSettingsSharp } from "react-icons/io5";

import "../../styles/table.css";

const ExpedientsInbox = () => {
  const dispatch = useDispatch();
  const { loadStatus } = useSelector((state) => state.load);
  const { InboxExpedients, refreshExpedientsInbox } = useSelector(
    (state) => state.expedients
  );

  const { getExpedientsInbox } = useExpedients();

  useEffect(() => {
    getExpedientsInbox();
  }, []);

  useEffect(() => {
    if (refreshExpedientsInbox) {
      getExpedientsInbox();
    }
  }, [refreshExpedientsInbox]);

  useEffect(() => {
    if (loadStatus) {
      const timer = setTimeout(() => {
        dispatch(onLoad(false));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loadStatus, dispatch]);

  console.log(InboxExpedients);

  return (
    <>
      {loadStatus ? (
        <LoadColorRing />
      ) : (
        <>
          {InboxExpedients.length ? (
            <>
              <Table
                responsive
                striped
                bordered
                hover
                id="table-data"
                className={`table ${
                  InboxExpedients.length === 1 ? "short" : ""
                }`}
              >
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Iniciado</th>
                    <th>Tipo de Expediente</th>
                    <th>Estado</th>
                    <th>Enviado por</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {InboxExpedients.map((expedient, index) => (
                    <tr key={index}>
                      <td>{expedient.numero}</td>
                      <td>{expedient.fechaCaratulacion}</td>
                      <td>{expedient.tipo}</td>
                      <td>{expedient.estado}</td>
                      <td>{`${expedient.usuarioEmisor.nombre} ${expedient.usuarioEmisor.apellido}`}</td>
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
                            <Link
                              className="dropdown-item"
                              to={`/expediente/${expedient.id}`}
                            >
                              Ver expediente
                            </Link>
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
            </>
          ) : (
            <Empty />
          )}
        </>
      )}
    </>
  );
};

export default ExpedientsInbox;
