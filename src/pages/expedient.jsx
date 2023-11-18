import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/navbar";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import useExpedients from "../hooks/useExpedients";

import { RiArrowGoBackLine } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

import svg from "../assets/MMQ.svg";

import "../styles/expedient.css";

const Expedient = () => {
  const [expedient, setExpedient] = useState({});
  const [documents, setDocuments] = useState([]);

  const { expedientId } = useParams();

  const { getExpedientsWhitFiles } = useExpedients();

  const navigate = useNavigate();

  const handleComeBack = () => {
    navigate("/home");
  };

  useEffect(() => {
    getExpedientsWhitFiles(setExpedient, setDocuments, expedientId);
  }, []);

  return (
    <>
      <Navbar />
      <section className="expediente-section">
        <div style={{ padding: "20px" }}>
          <RiArrowGoBackLine className="button-back"
            style={{ fontSize: "25px" }}
            onClick={handleComeBack}
          />{" "}
          <span>Volver</span>
        </div>
        {/* <Button variant="secondary" onClick={handleComeBack}>
          Volver
        </Button> */}
        <div className="container-expediente">
          <div className="expediente-info">
            <div>
              <img src={svg} alt="" style={{ width: "250px" }} />
            </div>
            <div>
              <h1 className="expediente-name">
                Expediente N° 1569-108{expedient.numeroExpediente}
              </h1>
            </div>
            <ul style={{ fontSize: "20px" }}>
              <li>
                {" "}
                <span style={{ fontWeight: "bold" }}>Fecha:</span> 2023-01-01
              </li>
              <li>
                {" "}
                <span style={{ fontWeight: "bold" }}>Iniciado:</span> Secretaria
                de Gobierno
              </li>
              <li>
                {" "}
                <span style={{ fontWeight: "bold" }}>Extracto:</span> referencia
                secretaria
              </li>
            </ul>

            <p className="expediente-description">
              Descripción: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Praesentium voluptas, asperiores, illum repellendus eaque
              sapiente omnis provident vel obcaecati ex, commodi quod delectus
              recusandae eum aliquam quasi esse ad ratione!
            </p>
          </div>
          <div className="documentos">
            <h2>Documentos del expediente</h2>
            <div className="documentos-grid">
              {documents.map((documento, index) => (
                <div key={index} className="documento-card">
                  <h3>{documento.tipoDocumento}</h3>
                  <p>
                    <strong>Fecha de Creación:</strong>{" "}
                    {documento.fechaCreacion}
                  </p>
                  <p>
                    <strong>Observaciones:</strong> {documento.observaciones}
                  </p>
                  <a
                    href={documento.archivoAdjunto}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Adjunto
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Expedient;
