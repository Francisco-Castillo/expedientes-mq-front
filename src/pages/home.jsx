import React from "react";

import "../styles/home.css";
const Home = () => {
  return (
    <section className="sections">
      <ul>
        <li>Expedientes</li>
        <li>Documentos</li>
        <li>Consulta</li>
      </ul>
      <table className="registros-table">
        <thead>
          <tr>
            <th>Iniciado</th>
            <th>Número</th>
            <th>Tipo de Expediente</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Usuario Actual</th>
          </tr>
        </thead>
        <tbody>
          {/* {registros.map((registro, index) => (
            <tr key={index}>
              <td>{registro.numero}</td>
              <td>{registro.referencia}</td>
              <td>{registro.fechaCaratulacion}</td>
              <td>{registro.descripcion}</td>
              <td>{registro.codigoTramite}</td>
              <td>{registro.cantidadFojas}</td>
              <td>{registro.monto}</td>
              <td>{registro.estado}</td>
              <td>
                <button className="ver-btn">Ver</button>
                <button className="editar-btn">Editar</button>
                <button className="eliminar-btn">Eliminar</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </section>
  );
};

export default Home;
