import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ReactPaginate from "react-paginate";

import Swal from "sweetalert2";

import Dropdown from "react-bootstrap/Dropdown";

import settings from "../assets/settings.svg";

// import { expedientes } from "../Data/expedients.json";
import { documentos } from "../Data/Documentos.json";

import Navbar from "../components/navbar";
import New_Expedient from "../components/modal/new_expedient";
import New_document from "../components/modal/new_document";

import "../styles/home.css";
const Home = () => {
  const [activeTab, setActiveTab] = useState("Expedientes");
  const [expedients, setExpedients] = useState([]);
  const [expedient, setExpedient] = useState({});

  const [resultSearch, setResultSearch] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const BaseUrl = import.meta.env.VITE_API_URL;

  const navigation = useNavigate();

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleExpedients = async (e) => {
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

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}expedientes?page=${currentPage}&size=10&search=${search}&orderBy=numero&orientation=asc`
      );
      setResultSearch(data.items);

      const serverTotalPages = data.totalPages;
      setTotalPages(serverTotalPages);

      // Restablece la página actual si es mayor que el número de páginas disponibles
      if (currentPage >= serverTotalPages) {
        setCurrentPage(0);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleView = async (expedientId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedientes/view/${expedientId}`
      );
      navigation("/expedient");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleExpedients();
  }, [currentPage]);

  const startOffset = currentPage * itemsPerPage;
  const endOffset = (currentPage + 1) * itemsPerPage;
  const currentRegistros = resultSearch.slice(startOffset, endOffset);

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
                  {expedients.map((expediente, index) => (
                    <tr key={index}>
                      <td>{expediente.estado}</td>
                      <td>{expediente.numero}</td>
                      <td>{expediente.tipo}</td>
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
                              href="#/action-1"
                              onClick={() => handleView(expediente.id)}
                            >
                              Ver
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Cambiar estado
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Vincular Archivo
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-4">
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
                  {documentos.map((documento, index) => (
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
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                style={{ marginBottom: "10px" }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn-primary" onClick={handleSearch}>
                Buscar
              </button>
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
                  {currentRegistros.map((expediente, index) => (
                    <tr key={index}>
                      <td>{expediente.estado}</td>
                      <td>{expediente.numero}</td>
                      <td>{expediente.tipo}</td>
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
          {totalPages > 1 && (
            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Siguiente"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
