import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Dropdown } from "react-bootstrap";
import { IoSettingsSharp } from "react-icons/io5";
import useExpedients from "../../hooks/useExpedients";
import Pagination from "../Pagination";
import Empty from "../card/empty";
import LinkDocument from "../modal/link_document";
import MakePass from "../modal/makePass";
import UpdateExpedient from "../modal/updateExpedient";
import LoadColorRing from "../loaders/colorRIng";
import { onLoad } from "../../store/load";
import "../../styles/table.css";

const MyExpedientsTable = () => {
  const dispatch = useDispatch();
  const { totalPages, page } = useSelector((state) => state.pages);
  const { InboxExpedients, refreshExpedientsInbox } = useSelector(
    (state) => state.expedients
  );
  const { loadStatus } = useSelector((state) => state.load);
  const { getExpedientsInbox } = useExpedients();

  console.log(InboxExpedients);

  const [modalState, setModalState] = useState({
    expedient: {},
    expedientId: null,
    updateExpedient: false,
    linkFile: false,
    makePass: false,
  });

  // Memoized handlers to prevent unnecessary re-renders
  const handleMakePass = useCallback((expedient) => {
    setModalState((prev) => ({
      ...prev,
      makePass: true,
      expedient,
    }));
  }, []);

  const handleLinkFile = useCallback((expedientId) => {
    setModalState((prev) => ({
      ...prev,
      linkFile: true,
      expedientId,
    }));
  }, []);

  const handleUpdateExpedient = useCallback((expedient) => {
    setModalState((prev) => ({
      ...prev,
      updateExpedient: true,
      expedient,
    }));
  }, []);

  // Combined useEffect for expedients fetching
  useEffect(() => {
    const shouldFetchExpedients =
      refreshExpedientsInbox || modalState.updateExpedient;

    if (shouldFetchExpedients) {
      getExpedientsInbox();
    }
  }, [page, modalState.updateExpedient, refreshExpedientsInbox]);

  // Separate effect for load status handling
  useEffect(() => {
    if (!loadStatus) return;

    const timer = setTimeout(() => {
      dispatch(onLoad(false));
      getExpedientsInbox();
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadStatus, dispatch]);

  // Memoized render function for table rows
  const renderTableRow = useCallback(
    (expedient, index) => (
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
              <Dropdown.Item onClick={() => handleUpdateExpedient(expedient)}>
                Cambiar estado
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLinkFile(expedient.id)}>
                Vincular Archivo
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleMakePass(expedient)}>
                Realizar pase
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    ),
    [handleUpdateExpedient, handleLinkFile, handleMakePass]
  );

  if (loadStatus) {
    return <LoadColorRing />;
  }

  if (!InboxExpedients.length) {
    return <Empty />;
  }

  return (
    <>
      <Table
        responsive
        striped
        bordered
        hover
        id="table-data"
        className={`table ${InboxExpedients.length === 1 ? "short" : "long"}`}
      >
        <thead>
          <tr>
            <th>Número</th>
            <th>Fecha de Inicio</th>
            <th>Tipo de Expediente</th>
            <th>Estado</th>
            <th>Enviado por</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{InboxExpedients.map(renderTableRow)}</tbody>
      </Table>

      {totalPages > 1 && <Pagination />}

      <MakePass
        expedient={modalState.expedient}
        isOpened={modalState.makePass}
        setIsOpened={(makePass) =>
          setModalState((prev) => ({ ...prev, makePass }))
        }
      />
      <LinkDocument
        expedientId={modalState.expedientId}
        isOpened={modalState.linkFile}
        setIsOpened={(linkFile) =>
          setModalState((prev) => ({ ...prev, linkFile }))
        }
      />
      <UpdateExpedient
        expedient={modalState.expedient}
        isOpened={modalState.updateExpedient}
        setIsOpened={(updateExpedient) =>
          setModalState((prev) => ({ ...prev, updateExpedient }))
        }
      />
    </>
  );
};

export default MyExpedientsTable;
