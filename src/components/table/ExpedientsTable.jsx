import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { onLoad } from "../../store/load";

import useExpedients from "../../hooks/useExpedients";

import decodeToken from "../../helpers/decodeToken";

import New_document from "../modal/new_document";
import UpdateExpedient from "../modal/updateExpedient";
import Pagination from "../Pagination";
import MakePass from "../modal/makePass";
import Empty from "../card/empty";

import { Table, Dropdown } from "react-bootstrap";
import { IoSettingsSharp } from "react-icons/io5";

import "../../styles/table.css";
import LoadColorRing from "../loaders/colorRIng";

const ExpedientsTable = () => {
  const { token } = useSelector((state) => state.auth);
  const { page } = useSelector((state) => state.pages);
  const { status } = useSelector((state) => state.load);

  const { userId } = decodeToken(token);

  const [expedients, setExpedients] = useState([]);

  const { getExpedients } = useExpedients();

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const viewExpedient = (expedientId) => {
    navigation(`/expediente/${expedientId}`);
  };

  useEffect(() => {
    getExpedients(setExpedients, userId);
  }, [page]);

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
          <Table responsive striped bordered hover id="table-data">
            <thead>
              <tr>
                <th>Número</th>
                <th>Iniciado</th>
                <th>Tipo de Expediente</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Enviado por</th>
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
          {expedients.length ? <Pagination /> : <Empty />}
        </>
      )}
    </>
  );
};

export default ExpedientsTable;
