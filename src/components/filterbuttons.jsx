import React, { Component } from "react";

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateFilter: "",
      typeFilter: "",
      dateFilter: "",
    };
  }

  handleStateChange = (e) => {
    this.setState({ stateFilter: e.target.value });
  };

  handleTypeChange = (e) => {
    this.setState({ typeFilter: e.target.value });
  };

  handleDateChange = (e) => {
    this.setState({ dateFilter: e.target.value });
  };

  filterExpedientes = () => {

    console.log("Filtrar por estado:", this.state.stateFilter);
    console.log("Filtrar por tipo de expediente:", this.state.typeFilter);
    console.log("Filtrar por fecha:", this.state.dateFilter);
  };

  render() {
    return (
      <div>
        <select onChange={this.handleStateChange}>
          <option value="">Estado</option>
          <option value="Iniciado">Iniciado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completado">Completado</option>
          <option value="Suspendido">Suspendido</option>
        </select>

        <select onChange={this.handleTypeChange}>
          <option value="">Tipo de Expediente</option>
          <option value="Subsidio">Subsidio</option>
          <option value="Pago">Pago</option>
          <option value="Compra">Compra</option>
          <option value="Personal">Personal</option>
          <option value="Solicitud de servicio">Solicitud de servicio</option>
        </select>

        <input type="date" onChange={this.handleDateChange} />

        <button onClick={this.filterExpedientes}>Filtrar</button>
      </div>
    );
  }
}

export default FilterButton;
