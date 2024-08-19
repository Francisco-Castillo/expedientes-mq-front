import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";

import { MdDeleteForever } from "react-icons/md";

import useExpedients from "../../hooks/useExpedients";

import "../../styles/settings.css";
import Empty from "../card/empty";

const TypeTable = () => {
  const { types } = useSelector((state) => state.expedientProperties);
  const { updateExpedientType, deleteExpedientType, listExpedientTypes } =
    useExpedients();

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [validated, setValidated] = useState(false);

  const handleDelete = async (id) => {
    await deleteExpedientType(id);
    await listExpedientTypes();
  };

  const handleKeyDown = async (e, index, tipo) => {
    if (e.key === "Enter") {
      // Ejecutar la actualización al presionar Enter
      if (editValue) {
        await updateExpedientType(tipo.id, { descripcion: editValue });
        setEditIndex(null);
        await listExpedientTypes();
      } else {
        setEditIndex(null);
      }
    }
  };

  const handleDoubleClick = (index, tipo) => {
    setEditIndex(index);
    setEditValue(tipo.descripcion);
  };

  return (
    <Table responsive striped bordered hover id="table-makePass">
      <thead>
        <tr>
          <th>Tipos de expedientes</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        {types.length ? (
          <>
            {types.map((tipo, index) => (
              <tr key={index}>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip">Doble click para editar</Tooltip>
                  }
                >
                  <td>
                    <input
                      type="text"
                      value={editIndex === index ? editValue : tipo.descripcion}
                      readOnly={editIndex !== index}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index, tipo)}
                      onDoubleClick={() => handleDoubleClick(index, tipo)}
                      className="input-settings"
                    />
                  </td>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip">Eliminar</Tooltip>}
                >
                  <td style={{ textAlign: "center" }}>
                    <MdDeleteForever
                      type="button"
                      onClick={() => handleDelete(tipo.id)}
                    />
                  </td>
                </OverlayTrigger>
              </tr>
            ))}
          </>
        ) : (
          <Empty />
        )}
      </tbody>
    </Table>
  );
};

export default TypeTable;
