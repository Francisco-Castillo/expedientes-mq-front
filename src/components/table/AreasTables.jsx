import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { onLoad } from "../../store/load";
import { clearPages } from "../../store/pages";

import Pagination from "../Pagination";
import LoadColorRing from "../loaders/colorRIng";

import { Dropdown, Table } from "react-bootstrap";

import { IoSettingsSharp } from "react-icons/io5";
import AreaEdit from "../modal/areaEdit";
import useAreas from "../../hooks/useAreas";
import NewArea from "../modal/newArea";

const AreasTable = () => {
  // const [users, setUsers] = useState([]);

  const { areas } = useSelector((state) => state.areas);

  const { totalPages } = useSelector((state) => state.pages);
  const { loadStatus } = useSelector((state) => state.load);

  const { getAreas, deleteArea } = useAreas();

  const dispatch = useDispatch();

  const handleDeleted = async (areaId) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta área?"
    );

    if (isConfirmed) {
      await deleteArea(areaId);
      await getAreas();
    }
  };

  useEffect(() => {
    getAreas();
  }, []);

  useEffect(() => {
    if (loadStatus) {
      const timer = setTimeout(() => {
        dispatch(onLoad(false));
        dispatch(clearPages(0));
        dispatch(clearPages(0));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loadStatus]);

  return (
    <>
      {loadStatus ? (
        <LoadColorRing />
      ) : (
        <div style={{ padding: "0px 10px" }}>
          <NewArea />
          <Table responsive striped bordered hover id="table-data">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Descripcion</th>
                <th style={{ textAlign: "center" }}>Codigo Presupuestario</th>
                <th style={{ textAlign: "center" }}>Nivel</th>
                <th style={{ textAlign: "center" }}>Referencia id</th>
                <th style={{ textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{area.descripcion}</td>
                  <td style={{ textAlign: "center" }}>
                    {area.codigoPresupuestario || "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>{area.nivel}</td>
                  <td style={{ textAlign: "center" }}>
                    {area.referenciaId || "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>
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
                        <AreaEdit
                          areaId={area.id}
                          descripcion={area.descripcion}
                          codigoPresupuestario={area.codigoPresupuestario}
                          nivel={area.nivel}
                          referenciaId={area.referenciaId}
                        />
                        <Dropdown.Item
                          onClick={() => {
                            handleDeleted(area.id);
                          }}
                        >
                          Eliminar
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {totalPages > 1 ? <Pagination /> : null}
        </div>
      )}
    </>
  );
};

export default AreasTable;
