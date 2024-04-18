import React from "react";

import FileView from "../modal/fileView";

import useDocuments from "../../hooks/useDocuments";

import Table from "react-bootstrap/Table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { MdDownload } from "react-icons/md";

import "../../styles/table.css";

const DocumentsTable = ({ files, expedientId }) => {
  const { viewDocument } = useDocuments();

  return (
    <Table responsive striped bordered hover id="table-data">
      <thead>
        <tr>
          <th>Referencia</th>
          <th>Tipo de Documento</th>
          <th>Fecha de Vinculación</th>
          <th></th>
          {/* <th></th> */}
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
            {/* <td>
              {" "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip">Descargar</Tooltip>}
              >
                <div>
                  <MdDownload
                    className="button-back"
                    onClick={() => downloadFile(document.nombre)}
                    type="button"
                    href=""
                    download
                  />
                </div>
              </OverlayTrigger>
            </td> */}
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
