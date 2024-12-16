import { useSelector } from "react-redux";

import SearchEmpty from "../card/searchEmpty";
import Pagination from "../Pagination";

import Table from "react-bootstrap/Table";

import "../../styles/table.css";

const ExpedientsSearchTable = () => {
  const { expedientSearchResult } = useSelector((state) => state.search);

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
                <th>Ubicación</th>
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
