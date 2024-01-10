import React, { useEffect, useState } from "react";

import Carousel from "react-bootstrap/Carousel";

import useDocuments from "../../hooks/useDocuments";

import { Button, Modal, Form, Dropdown } from "react-bootstrap";

import { IoDocuments } from "react-icons/io5";
function CarouselDocuments({ expedientId }) {
  const { getDocuments } = useDocuments();

  const [show, setShow] = useState(false);

  const [documents, setDocuments] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getDocuments(expedientId, setDocuments);
  };

  console.log(documents);
  return (
    <>
      {/* <Dropdown.Item onClick={handleShow}></Dropdown.Item> */}
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
        <Modal.Body style={{ padding: "30px" }}>
          <Carousel slide={false}>
            {documents.map((document, index) => (
              <Carousel.Item>
                {/* <ExampleCarouselImage text="First slide" /> */}
                <img src={document.url} alt="" />
                <Carousel.Caption>
                  <h3>{document.observaciones}</h3>
                  {/* <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p> */}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
            <Carousel.Item>
              {/* <ExampleCarouselImage text="First slide" /> */}
              <img src={2} alt="" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="Second slide" /> */}
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="Third slide" /> */}
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CarouselDocuments;
