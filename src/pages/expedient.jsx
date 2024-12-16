import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import useExpedients from "../hooks/useExpedients";
import DocumentsTable from "../components/table/DocumentsTable";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/expedient.css";
import axios from "axios";
import Navbar from "../components/Navbar";

const Expedient = () => {
  const [expedient, setExpedient] = useState({});
  const { tab, subTab } = useSelector((state) => state.tab);
  const { files } = useSelector((state) => state.files);
  const { expedientId } = useParams();
  const { getExpedient } = useExpedients();
  const navigate = useNavigate();

  const BaseUrl = import.meta.env.VITE_API_URL;

  const handleComeBack = () => {
    navigate(`/${tab}/${subTab}`);
  };

  useEffect(() => {
    getExpedient(setExpedient, expedientId);
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}expedientes/${expedientId}/caratula`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "caratula.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

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
            <MdDownload className="button-back" onClick={handleDownload} />
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
            <ul>
              <li>
                <strong> Fecha: </strong> {expedient.fechaCaratulacion}
              </li>
              <li>
                <strong> Monto: </strong> $ {expedient.monto}
              </li>
              <li>
                <strong> Descripción: </strong> {expedient.descripcion}
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
