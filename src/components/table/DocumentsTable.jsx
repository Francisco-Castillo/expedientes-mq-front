import React from "react";

import Dropdown from "react-bootstrap/Dropdown";

import settings from "../../assets/settings.svg";

import "../../styles/table.css";

const DocumentsTable = ({ documents }) => {
  return (
    <table className="registros-table">
      <thead>
        <tr>
          <th>Fecha de creación</th>
          <th>Tipo de documento</th>
          <th>Observaciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document, index) => (
          <tr key={index}>
            <td>{document.fechaCreacion}</td>
            <td>{document.tipoDocumento}</td>
            <td>{document.observaciones}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                  <img src={settings} alt="" width={"30px"} height={"30px"} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Ver</Dropdown.Item>
                  {/* <UpdateExpedient expedientId={expediente.id} />
                  <LinkFile expedientId={expediente.id} /> */}
                  {/* <Dropdown.Item>Vincular</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentsTable;
