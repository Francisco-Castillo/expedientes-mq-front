import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchEmpty from "../card/searchEmpty";
import Pagination from "../Pagination";

import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import { IoSettingsSharp } from "react-icons/io5";

import "../../styles/table.css";

const ExpedientsSearchTable = () => {
  const navigation = useNavigate();
  const { expedientSearchResult } = useSelector((state) => state.search);
  const viewExpedient = (expedientId) => {
    navigation(`/expediente/${expedientId}`);
  };

  return (
    <>
      {expedientSearchResult.length ? (
        <div style={{ padding: "0px 10px" }}>
          <Table
            responsive
            striped
            bordered
            hover
            id="table-data"
            className={`table ${
              expedientSearchResult.length == 1 ? "short" : ""
            }`}
          >
            <thead>
              <tr>
                <th>Número</th>
                <th>Iniciado</th>
                <th>Tipo de Expediente</th>
                <th>Estado</th>
                <th>Enviado por</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {expedientSearchResult.map((expedient, index) => (
                <tr key={index}>
                  <td>{expedient.numero}</td>
                  <td>{expedient.fechaCaratulacion}</td>
                  <td>{expedient.tipo}</td>
                  <td>{expedient.estado}</td>
                  <td>{`${expedient.usuario.nombre} ${expedient.usuario.apellido}`}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{
                          backgroundColor: "rgba(217, 70, 70, 1)",
                          borderColor: "gray",
                        }}
                        id="dropdown-basic"
                      >
                        <IoSettingsSharp />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => viewExpedient(expedient.id)}
                        >
                          Ver expediente
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination />
        </div>
      ) : (
        <SearchEmpty />
      )}
    </>
  );
};

export default ExpedientsSearchTable;
