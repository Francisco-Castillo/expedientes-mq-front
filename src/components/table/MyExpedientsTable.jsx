import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { onLoad } from "../../store/load";

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
  const { loadStatus } = useSelector((state) => state.load);
  const { totalPages, page } = useSelector((state) => state.pages);
  const { myExpedients, refreshMyExpedientsList } = useSelector(
    (state) => state.expedients
  );

  const { getMyExpedients } = useExpedients();

  const dispatch = useDispatch();

  useEffect(() => {
    getMyExpedients();
  }, []);

  useEffect(() => {
    getMyExpedients();
  }, [page]);

  useEffect(() => {
    if (refreshMyExpedientsList) {
      getMyExpedients();
    }
  }, [refreshMyExpedientsList]);

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
      {loadStatus ? (
        <LoadColorRing />
      ) : (
        <>
          {myExpedients.length ? (
            <>
              <Table
                responsive
                striped
                bordered
                hover
                id="table-data"
                className={`table ${
                  myExpedients.length == 1 ? "short" : "long"
                }`}
              >
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Iniciado</th>
                    <th>Tipo de Expediente</th>
                    <th>Estado</th>
                    <th>Caratulado por</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {myExpedients.map((expedient, index) => (
                    <tr key={index}>
                      <td>{expedient.numero}</td>
                      <td>{expedient.fechaCaratulacion}</td>
                      <td>{expedient.tipo}</td>
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
              {totalPages > 1 ? <Pagination /> : null}
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
