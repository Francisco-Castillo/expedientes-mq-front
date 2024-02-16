import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/navbar";

import CarouselDocuments from "../components/carousel/carousel";

import useExpedients from "../hooks/useExpedients";

import { RiArrowGoBackLine } from "react-icons/ri";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { IoDocuments } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

import useDocuments from "../hooks/useDocuments";

import svg from "../assets/MMQ.svg";

import "../styles/expedient.css";

const Expedient = () => {
  const [expedient, setExpedient] = useState({});

  const { expedientId } = useParams();

  const { getExpedient } = useExpedients();
  const { getDocuments } = useDocuments();

  const navigate = useNavigate();

  const handleComeBack = () => {
    navigate("/home");
  };

  // const viewDocuments = async (expedientId) => {
  //   await getDocuments(expedientId);
  // };

  useEffect(() => {
    getExpedient(setExpedient, expedientId);
  }, []);
  return (
    <>
      <Navbar />

      <section className="expedient-section">
        <div>
          <div>
            <CarouselDocuments expedientId={expedientId} />
          </div>
          <br />
          <div>
            <AiFillPrinter className="button-back" />
          </div>
          <br />
          <div>
            <FaArrowAltCircleLeft
              className="button-back"
              onClick={handleComeBack}
            />
          </div>
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
