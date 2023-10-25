import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";

import Dropdown from "react-bootstrap/Dropdown";

import settings from "../assets/settings.svg";

import Navbar from "../components/navbar";
import New_Expedient from "../components/modal/new_expedient";
import New_document from "../components/modal/new_document";
import UpdateExpedient from "../components/modal/updateExpedient";
import LinkFile from "../components/modal/linkFile";

import "../styles/home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Expedientes");
  const [expedients, setExpedients] = useState([]);
  // const [expedient, setExpedient] = useState({});
  const [documents, setDocuments] = useState([]);

  const [resultSearch, setResultSearch] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [itemsPerPage] = useState(10);

  const BaseUrl = import.meta.env.VITE_API_URL;

  const navigation = useNavigate();

  // TABS

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Listado de expedientes

  const handleExpedients = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/expedientes`);
      setExpedients(data);
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

  // PAGINATION

  // const handleClick = ({ selected }) => {
  //   setCurrentPage(selected);
  // };

  const getPaginatedExpedientes = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return expedients.slice(startIndex, endIndex);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage != 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // view expedient

  const viewExpedient = (expedientId) => {
    navigation(`/expedient/${expedientId}`);
    console.log(expedientId);
  };

  // Search expedientes

  const searchExpedientes = () => {
    return expedients.filter((expediente) => {
      return (
        expediente.numeroExpediente.toLowerCase().includes(search) ||
        expediente.tipoExpediente.toLowerCase().includes(search) ||
        expediente.descripcion.toLowerCase().includes(search)
      );
    });
  };

  const handleSearch = async () => {
    try {
      // const { data } = await axios.get(
      //   `http://localhost:3001/api/expedientes?page=${currentPage}&search=${search}`
      // );
      // setResultSearch(data);
      // const serverTotalPages = data.totalPages;
      // setTotalPages(serverTotalPages);
      setResultSearch(searchExpedientes());
    } catch (error) {
      console.log(error);
    }
  };

  const getPaginatedResultSearch = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return resultSearch.slice(startIndex, endIndex);
  };

  // DOCUMENTOS

  const handleDocuments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/documents/allDocuments`
      );
      setDocuments(data);
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

  const todosLosDocumentos = [];

  documents.forEach((documento) => {
    todosLosDocumentos.push(documento);
  });

  const getPaginatedDocuments = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return todosLosDocumentos.slice(startIndex, endIndex);
  };

  // USEFFECT

  const currentExpedientes = getPaginatedExpedientes();

  const currentSearch = getPaginatedResultSearch();

  const currentDocuments = getPaginatedDocuments();

  useEffect(() => {
    handleExpedients();
    // handleSearch();
    handleDocuments();
    const total = Math.ceil(expedients.length / itemsPerPage);
    setTotalPages(total);
    setResultSearch(searchExpedientes());
  }, [currentPage]);

  return (
    <>
      <Navbar />
      <section className="sections">
        <div className="tab-header">
          <div
            className={`tab ${activeTab === "Expedientes" ? "active" : ""}`}
            onClick={() => handleTabChange("Expedientes")}
          >
            Expedientes
          </div>
          <div
            className={`tab ${activeTab === "Documentos" ? "active" : ""}`}
            onClick={() => handleTabChange("Documentos")}
          >
            Documentos
          </div>
          <div
            className={`tab ${activeTab === "Consulta" ? "active" : ""}`}
            onClick={() => handleTabChange("Consulta")}
          >
            Consulta
          </div>
        </div>

        <div className="tab-content">
          {activeTab === "Expedientes" && (
            <div>
              <New_Expedient />

              <table className="registros-table">
                <thead>
                  <tr>
                    <th>Iniciado</th>
                    <th>Número</th>
                    <th>Tipo de Expediente</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Usuario Actual</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentExpedientes.map((expediente, index) => (
                    <tr key={index}>
                      <td>{expediente.fechaCaratulacion}</td>
                      <td>{expediente.numeroExpediente}</td>
                      <td>{expediente.tipoExpediente}</td>
                      <td>{expediente.descripcion}</td>
                      <td>{expediente.estado}</td>
                      <td>{expediente.usuario}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="warning"
                            id="dropdown-basic"
                          >
                            <img
                              src={settings}
                              alt=""
                              width={"30px"}
                              height={"30px"}
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => viewExpedient(expediente.id)}
                            >
                              Ver
                            </Dropdown.Item>
                            <UpdateExpedient expedientId={expediente.id} />
                            {/* <Dropdown.Item>Cambiar Estado</Dropdown.Item> */}
                            {/* <Dropdown.Item>Vincular Archivo</Dropdown.Item> */}
                            <LinkFile expedientId={expediente.id} />
                            <Dropdown.Item>Realizar pase</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Documentos" && (
            <div>
              <New_document />
              <table className="registros-table">
                <thead>
                  <tr>
                    <th>Fecha de creación</th>
                    <th>Tipo de documento</th>
                    <th>Observaciones</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocuments.map((documento, index) => (
                    <tr key={index}>
                      <td>{documento.fechaCreacion}</td>
                      <td>{documento.tipoDocumento}</td>
                      <td>{documento.observaciones}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="warning"
                            id="dropdown-basic"
                          >
                            <img
                              src={settings}
                              alt=""
                              width={"30px"}
                              height={"30px"}
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                              Cambiar estado
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Vincular Archivo
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Realizar pase
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Consulta" && (
            <div>
              <div className="search-bar">
                <input
                  style={{
                    borderRadius: "4px",
                    padding: "10px 20px",
                    marginBottom: "10px",
                  }}
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  style={{
                    borderRadius: "4px",
                    padding: "8px 20px",
                    marginBottom: "10px",
                  }}
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
              <table className="registros-table">
                <thead>
                  <tr>
                    <th>Iniciado</th>
                    <th>Número</th>
                    <th>Tipo de Expediente</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Usuario Actual</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSearch.map((expediente, index) => (
                    <tr key={index}>
                      <td>{expediente.estado}</td>
                      <td>{expediente.numeroExpediente}</td>
                      <td>{expediente.tipoExpediente}</td>
                      <td>{expediente.descripcion}</td>
                      <td>{expediente.estado}</td>
                      <td>{expediente.usuario}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="warning"
                            id="dropdown-basic"
                          >
                            <img
                              src={settings}
                              alt=""
                              width={"30px"}
                              height={"30px"}
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                              Cambiar estado
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Vincular Archivo
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Realizar pase
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="pagination">
            <span onClick={handlePrevPage} className="page-item">
              -
            </span>
            <span className="page-number">{currentPage}</span>
            <span onClick={handleNextPage} className="page-item">
              +
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
