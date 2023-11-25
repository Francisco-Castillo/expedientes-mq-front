import React from "react";

const filterbuttons = () => {
  return (
    <>
      <div class="filters">
        <label for="state-filter">Estado:</label>
        <select id="state-filter">
          <option value="todos">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en-proceso">En proceso</option>
          <option value="completado">Completado</option>
        </select>

        <label for="type-filter">Tipo:</label>
        <select id="type-filter">
          <option value="todos">Todos</option>
          <option value="tipo1">Tipo 1</option>
          <option value="tipo2">Tipo 2</option>
          <option value="tipo3">Tipo 3</option>
        </select>

        <label for="date-filter">Fecha:</label>
        {/* <input type="date" id="date-filter"> */}
      </div>
    </>
  );
};

export default filterbuttons;
