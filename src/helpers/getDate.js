const getDate = () => {
  let fechaActual = new Date();

  let anio = fechaActual.getFullYear();
  let mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2); //
  let dia = ("0" + fechaActual.getDate()).slice(-2);
  let fechaFormateada = `${anio}-${mes}-${dia}`;
  return fechaFormateada;
};

export default getDate;
