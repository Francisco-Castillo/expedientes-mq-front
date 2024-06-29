const getDateTime = () => {
  let fechaActual = new Date();

  let anio = fechaActual.getFullYear();
  let mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  let dia = ("0" + fechaActual.getDate()).slice(-2);

  let horas = ("0" + fechaActual.getHours()).slice(-2);
  let minutos = ("0" + fechaActual.getMinutes()).slice(-2);
  let segundos = ("0" + fechaActual.getSeconds()).slice(-2);

  let fechaFormateada = `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
  return fechaFormateada;
};

export default getDateTime;
