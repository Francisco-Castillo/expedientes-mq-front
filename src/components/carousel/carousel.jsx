import React, { useState } from "react";

import Carousel from "react-bootstrap/Carousel";

import useDocuments from "../../hooks/useDocuments";

import { Modal } from "react-bootstrap";

import { IoDocuments } from "react-icons/io5";

const BaseUrl = import.meta.env.VITE_API_URL;
function CarouselDocuments({ expedientId }) {
  const { getDocuments } = useDocuments();

  const [show, setShow] = useState(false);

  const [documents, setDocuments] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getDocuments(expedientId, setDocuments);
  };

  return (
    <>
      <IoDocuments
        className="button-back"
        style={{ fontSize: "25px" }}
        onClick={handleShow}
      />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(235, 87, 87, 1)", color: "white" }}
        >
          <Modal.Title>Documentos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {documents.map((document, index) => (
              <Carousel.Item key={index}>
                {document.tipoArchivo === "image/png" ? (
                  <img
                    src={`${BaseUrl}${document.url.split("8090/")[1]}`}
                    alt=""
                    width={"100%"}
                    height="700px"
                  />
                ) : (
                  <embed
                    src={`${BaseUrl}${document.url.split("8090/")[1]}`}
                    type={document.tipoArchivo}
                    width="100%"
                    height="700px"
                  />
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CarouselDocuments;
