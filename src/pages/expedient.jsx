import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import useExpedients from "../hooks/useExpedients";

import Navbar from "../components/navbar";

import CarouselDocuments from "../components/carousel/carousel";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";

import svg from "../assets/MMQ.svg";

import "../styles/expedient.css";

const Expedient = () => {
  const [expedient, setExpedient] = useState({});
  const { tab, subTab } = useSelector((state) => state.tab);

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

      <section className="expedient-section">
        <div>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip">Ver documentos</Tooltip>}
          >
            <div>
              <CarouselDocuments expedientId={expedientId} />
            </div>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip">Imprimir</Tooltip>}
          >
            <div>
              <AiFillPrinter className="button-back" />
            </div>
          </OverlayTrigger>
          <br />
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip">Volver</Tooltip>}
          >
            <div>
              <FaArrowAltCircleLeft
                className="button-back"
                onClick={handleComeBack}
              />
            </div>
          </OverlayTrigger>
        </div>
        <div className="container-expedient">
          <div className="expedient-info">
            <img className="logo" src={svg} alt="" />
            <h1 className="expedient-title">Municipalidad de Monte Quemado</h1>
          </div>

          <h1 className="expedient-name">Expediente N° {expedient.numero}</h1>

          <div className="expedient-description">
            <ul>
              <li>
                <strong> Fecha: </strong> {expedient.fechaCaratulacion}
              </li>
              <li>
                <strong> Iniciado: </strong> {expedient.iniciador}
              </li>
              <li>
                <strong> Extracto: </strong> {expedient.referencia}
              </li>
            </ul>

            <p>
              <strong> Descripción: </strong>
              {expedient.descripcion}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Expedient;
