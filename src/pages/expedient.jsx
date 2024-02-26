import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useExpedients from "../hooks/useExpedients";

import Navbar from "../components/navbar";
import DocumentsTable from "../components/table/DocumentsTable";

import { FaArrowAltCircleLeft } from "react-icons/fa";

import { MdDownload } from "react-icons/md";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/expedient.css";

const Expedient = () => {
  const [expedient, setExpedient] = useState({});

  const { tab, subTab } = useSelector((state) => state.tab);
  const { files } = useSelector((state) => state.files);

  const { expedientId } = useParams();
  const { getExpedient } = useExpedients();

  const navigate = useNavigate();

  const handleComeBack = () => {
    navigate(`/${tab}/${subTab}`);
  };

  useEffect(() => {
    getExpedient(setExpedient, expedientId);
  }, []);

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

            <MdDownload className="button-back" />
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
          <h3 className="expedient-title">Documentos</h3>
          <DocumentsTable files={files} expedientId={expedientId} />
        </Row>
      </Container>
    </>
  );
};

export default Expedient;
