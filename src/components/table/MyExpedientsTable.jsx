import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Table, Dropdown } from "react-bootstrap";
import { IoSettingsSharp } from "react-icons/io5";

import useExpedients from "../../hooks/useExpedients";
import Pagination from "../Pagination";
import Empty from "../card/empty";
import LinkDocument from "../modal/link_document";
import MakePass from "../modal/makePass";
import UpdateExpedient from "../modal/updateExpedient";

import "../../styles/table.css";

const MyExpedientsTable = () => {
  const { totalPages, page } = useSelector((state) => state.pages);
  const { myExpedients } = useSelector((state) => state.expedients);

  const [expedient, setExpedient] = useState({});
  const [expedientId, setExpedientId] = useState();
  const [updateExpedient, setUpdateExpedient] = useState(false);
  const [linkFile, setLinkFile] = useState(false);
  const [makePass, setMakePass] = useState(false);

  const { getMyExpedients } = useExpedients();

  const handleMakePass = (value) => {
    setMakePass(true);
    setExpedient(value);
  };

  const handleLinkFile = (value) => {
    setLinkFile(true);
    setExpedientId(value);
  };

  const handleUpdateExpedient = (value) => {
    setUpdateExpedient(true);
    setExpedient(value);
  };

  useEffect(() => {
    getMyExpedients();
  }, [page]);

  return (
    <>
      {myExpedients.length ? (
        <>
          <Table
            responsive
            striped
            bordered
            hover
            id="table-data"
            className={`table ${myExpedients.length == 1 ? "short" : "long"}`}
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

                        <Dropdown.Item
                          value={expedient}
                          onClick={() => {
                            handleUpdateExpedient(expedient);
                          }}
                        >
                          Cambiar estado
                        </Dropdown.Item>
                        <Dropdown.Item
                          value={expedient.id}
                          onClick={() => {
                            handleLinkFile(expedient.id);
                          }}
                        >
                          Vincular Archivo
                        </Dropdown.Item>
                        <Dropdown.Item
                          value={expedient}
                          onClick={() => handleMakePass(expedient)}
                        >
                          Realizar pase
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
      ) : (
        <Empty />
      )}

      <MakePass
        expedient={expedient}
        isOpened={makePass}
        setIsOpened={setMakePass}
      />
      <LinkDocument
        expedientId={expedientId}
        isOpened={linkFile}
        setIsOpened={setLinkFile}
      />
      <UpdateExpedient
        expedient={expedient}
        isOpened={updateExpedient}
        setIsOpened={setUpdateExpedient}
      />
    </>
  );
};

export default MyExpedientsTable;
