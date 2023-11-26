import axios from "axios";
import Swal from "sweetalert2";

const customIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-check" width="30" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M11 19h-6a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4"></path>
  <path d="M15 19l2 2l4 -4"></path>
</svg>`;

const useExpedients = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;

  const newExpedient = async (
    expedientNumber,
    codigoPresupuestario,
    reference,
    date,
    description,
    codigoTramite,
    typeExpedient,
    userId,
    areaName,
    setShow
  ) => {
    try {
      await axios.post(`${BaseUrl}/expedientes/caratular`, {
        numero: `${expedientNumber}-${codigoPresupuestario}`,
        referencia: reference,
        fechaCaratulacion: date,
        descripcion: description,
        codigoTramite: codigoTramite,
        cantidadFojas: 8,
        monto: null,
        tipo: typeExpedient,
        estado: "Iniciado",
        iniciador: areaName,
        usuario: {
          id: userId,
        },
      });
      setShow(false);
      Swal.fire({
        iconHtml: customIcon,
        text: "Expediente generado exitosamente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
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

  const getExpedients = async (setExpedients, setTotalPages, currentPage) => {
    try {
      if (currentPage > 1) {
        const { data } = await axios.get(
          `${BaseUrl}/expedientes?page=${currentPage}&orderBy=fechaCaratulacion&orientation=desc`
        );

        setExpedients(data.items);
        setTotalPages(data.totalPages);
      } else {
        const { data } = await axios.get(
          `${BaseUrl}/expedientes?orderBy=fechaCaratulacion&orientation=desc`
        );

        setExpedients(data.items);
        setTotalPages(data.totalPages);
      }
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

  const listExpedientTypes = async (setExpedientTypes) => {
    try {
      const { data } = await axios.get(`${BaseUrl}/expedientes/tipos`);
      setExpedientTypes(data);
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

  const listExpedientStates = async (setExpedientStates) => {
    try {
      const { data } = await axios.get(`${BaseUrl}/expedientes/estados`);
      setExpedientStates(data);
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

  const getExpedient = async (setExpedient, expedientId) => {
    try {
      const { data } = await axios.get(`${BaseUrl}/expedientes/${expedientId}`);
      setExpedient(data);
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

  const searchExpedients = async (
    setResultSearch,
    currentPage,
    search,
    setTotalPages,
    filterStartDate,
    filterEndDate,
    filterState,
    filterExpedientType
  ) => {
    try {
      if (currentPage > 1) {
        const { data } = await axios.get(
          `${BaseUrl}/expedientes?universalFilter=${search}&startDate=${filterStartDate}&endDate${filterEndDate}&status=${filterState}&type${filterExpedientType}&page=${currentPage}`
        );

        const serverTotalPages = data.totalPages;

        setTotalPages(serverTotalPages);
        setResultSearch(data.items);
      } else {
        const { data } = await axios.get(
          `${BaseUrl}/expedientes?universalFilter=${search}&startDate=${filterStartDate}&endDate${filterEndDate}&status=${filterState}&type${filterExpedientType}`
        );

        const serverTotalPages = data.totalPages;

        setTotalPages(serverTotalPages);
        setResultSearch(data.items);
      }
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

  const updateExpedient = async (state, setShow, expedientId) => {
    try {
      await axios.patch(`${BaseUrl}/${expedientId}/cambiar-estado`, {
        status: state,
      });

      setShow(false);

      Swal.fire({
        iconHtml: customIcon,
        text: "Estado actualizado exitosamente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
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

  const lastExpedientNumber = async (setExpedientNumber) => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/parametros?name=ULTIMO_NUMERO_DE_EXPEDIENTE`
      );
      const lastNumber = Number(data.valor) + 1;
      setExpedientNumber(lastNumber);
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

  const expedientPass = async ({
    userId,
    userReceiver,
    date,
    expedientId,
    observations,
    setShow,
  }) => {
    try {
      await axios.post(`${BaseUrl}/expedientes/${expedientId}/pase`, {
        fechaHora: date,
        observaciones: observations,
        expedienteId: expedientId,
        usuarioEmisorId: userId,
        usuarioReceptorId: userReceiver.id,
      });

      setShow(false);
      Swal.fire({
        iconHtml: customIcon,
        text: `Expediente enviado exitosamente a ${userReceiver.nombre} ${userReceiver.apellido}`,
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
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

  return {
    newExpedient,
    updateExpedient,
    getExpedient,
    listExpedientTypes,
    getExpedients,
    searchExpedients,
    lastExpedientNumber,
    listExpedientStates,
    expedientPass,
  };
};

export default useExpedients;
