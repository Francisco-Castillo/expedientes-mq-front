import React from "react";

import FileView from "../modal/fileView";

import { OverlayTrigger, Tooltip, Table } from "react-bootstrap";

import "../../styles/table.css";

const DocumentsTable = ({ files }) => {
  return (
    <Table responsive striped bordered hover id="table-data">
      <thead>
        <tr>
          <th>Referencia</th>
          <th>Tipo de Documento</th>
          <th>Fecha de Vinculación</th>
        </tr>
      </thead>
      <tbody>
        {files.map((document, index) => (
          <tr key={index}>
            <td>{document.observaciones}</td>
            <td>{document.tipoArchivo}</td>
            <td>
              {document.fechaSubida
                ? `${document.fechaSubida.slice(
                    0,
                    10
                  )} ${document.fechaSubida.slice(11, 16)}`
                : null}
            </td>
            <td>
              {" "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip">Ver documento</Tooltip>}
              >
                <div>
                  <FileView file={document} />
                </div>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DocumentsTable;
