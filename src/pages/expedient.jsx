import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/navbar";
import Button from "react-bootstrap/Button";

import useExpedients from "../hooks/useExpedients";

import { useNavigate } from "react-router-dom";

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
        <Button variant="secondary" onClick={handleComeBack}>
          Volver
        </Button>
        <div className="expediente-info">
          <h1 className="expediente-name">
            Expediente: {expedient.numeroExpediente}
          </h1>
          <table className="expediente-table">
            <thead>
              <tr>
                <th>Caratulado por: {expedient.usuario}</th>
                <th>Fecha de caratulación: {expedient.fechaCaratulacion}</th>
                <th>Estado: {expedient.estado}</th>
              </tr>
            </thead>
          </table>
          <p className="expediente-description">
            Descripción: {expedient.descripcion}
          </p>
        </div>
        <div className="documentos">
          <h2>Documentos del expediente</h2>
          <div className="documentos-grid">
            {documents.map((documento, index) => (
              <div key={index} className="documento-card">
                <h3>{documento.tipoDocumento}</h3>
                <p>
                  <strong>Fecha de Creación:</strong> {documento.fechaCreacion}
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
      </section>
    </>
  );
};

export default Expedient;
