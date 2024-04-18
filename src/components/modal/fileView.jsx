import React, { useState } from "react";

import ImageFile from "../card/imgFile";

import { Modal } from "react-bootstrap";

import { IoDocuments } from "react-icons/io5";

const BaseUrl = import.meta.env.VITE_API_URL;
function FileView({ file }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
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
          <Modal.Title>{file.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {file.tipoArchivo === "image/png" ? (
            <ImageFile url={`${BaseUrl}${file.url.split("8090")[1]}`} />
          ) : (
            <embed
              src={`${BaseUrl}${file.url.split("8090")[1]}`}
              type={file.tipoArchivo}
              width="100%"
              height="700px"
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FileView;
