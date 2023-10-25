import React, { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import Navbar from "../components/navbar";

import Swal from "sweetalert2";

import "../styles/expedient.css";

const Expedient = () => {
  const [expedient, setExpedient] = useState({});
  const [documents, setDocuments] = useState([]);

  const { expedientId } = useParams();

  const handleExpedient = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedientes/view/${expedientId}`
      );
      setExpedient(data);
      setDocuments(data.Files);
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        text: error.message,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    handleExpedient();
  }, []);

  return (
    <>
      <Navbar />
      <section className="expediente-section">
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
