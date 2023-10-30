import React from "react";

import "../styles/table.css";

const DocumentsTable = ({ documents }) => {
  return (
    <table className="registros-table">
      <thead>
        <tr>
          <th>Fecha de creación</th>
          <th>Tipo de documento</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document, index) => (
          <tr key={index}>
            <td>{document.fechaCreacion}</td>
            <td>{document.tipoDocumento}</td>
            <td>{document.observaciones}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentsTable;
