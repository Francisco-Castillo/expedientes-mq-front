import React from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import settings from "../../assets/settings.svg";

import "../../styles/table.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdDownload } from "react-icons/md";
import CarouselDocuments from "../carousel/carousel";

const DocumentsTable = ({ files, expedientId }) => {
  return (
    <Table responsive striped bordered hover id="table-data">
      <thead>
        <tr>
          <th>Orden</th>
          <th>Referencia</th>
          <th>Tipo de Documento</th>
          <th>Fecha de Vinculación</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {files.map((document, index) => (
          <tr key={index}>
            <td>{1}</td>
            <td>{document.observaciones}</td>
            <td>{document.tipoArchivo}</td>
            <td>{document.fechaSubida}</td>
            <td>
              {" "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip">Imprimir</Tooltip>}
              >
                <div>
                  <MdDownload className="button-back" />
                </div>
              </OverlayTrigger>
            </td>
            <td>
              {" "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip">Ver documentos</Tooltip>}
              >
                <div>
                  <CarouselDocuments expedientId={expedientId} />
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
