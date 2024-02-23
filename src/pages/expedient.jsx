import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import useExpedients from "../hooks/useExpedients";

import Navbar from "../components/navbar";
import CarouselDocuments from "../components/carousel/carousel";
import DocumentsTable from "../components/table/DocumentsTable";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
import { MdDownload } from "react-icons/md";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import "../styles/expedient.css";

const Expedient = () => {
  const [expedient, setExpedient] = useState({});
  const [files, setFiles] = useState([]);
  const { tab, subTab } = useSelector((state) => state.tab);

  const { expedientId } = useParams();
  const { getExpedient } = useExpedients();

  const navigate = useNavigate();

  const handleComeBack = () => {
    navigate(`/${tab}/${subTab}`);
  };

  useEffect(() => {
    getExpedient(setExpedient, expedientId, setFiles);
  }, []);

  console.log(expedient);

  return (
    <>
      <Navbar />

      <Container
        style={{
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
          display: "block ",
        }}
      >
        <Row>
          <Col id="expedient-name">
            <FaArrowAltCircleLeft
              className="button-back"
              onClick={handleComeBack}
            />

            <h1>Expediente N° {expedient.numero}</h1>
          </Col>
        </Row>
        <Row id="expedient-description">
          <Col ms={6}>
            <ul>
              <li>
                <strong> Estado: </strong> {expedient.estado}
              </li>
              <li>
                <strong> Iniciado: </strong> {expedient.iniciador}
              </li>
              <li>
                <strong> Referencia: </strong> {expedient.referencia}
              </li>
            </ul>
          </Col>
          <Col ms={6}>
            {" "}
            <ul>
              <li>
                <strong> Fecha: </strong> {expedient.fechaCaratulacion}
              </li>
              <li>
                <strong> Descripción: </strong>
                {expedient.descripcion}
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <h3 className="expedient-title">Historial</h3>
          {/* <Table striped bordered hover id="table-data">
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
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
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
            </tbody>
          </Table> */}
          <DocumentsTable files={files} expedientId={expedientId} />
        </Row>
      </Container>
    </>
  );
};

export default Expedient;
