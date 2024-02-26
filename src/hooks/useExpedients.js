import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import getDateTime from "../helpers/getDate";

import { setTotalPages } from "../store/pages";
import { setStatus, setTypes } from "../store/expedients";
import { setNumber } from "../store/expedient";
import { setExpedientSearchResult } from "../store/search";
import { setFiles } from "../store/files";

import Swal from "sweetalert2";

const customIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-check" width="30" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M11 19h-6a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4"></path>
  <path d="M15 19l2 2l4 -4"></path>
</svg>`;

const useExpedients = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;

  const date = getDateTime();

  const { expedientStatus, expedientType, startDate, endDate } = useSelector(
    (state) => state.filters
  );
  const { type, description, budgetCode, reference, number, state } =
    useSelector((state) => state.expedient);
  const { page } = useSelector((state) => state.pages);
  const { search } = useSelector((state) => state.search);
  const { areaName, userId } = useSelector((state) => state.userData.user);

  const dispatch = useDispatch();

  const newExpedient = async (setShow) => {
    try {
      await axios.post(`${BaseUrl}/expedientes/caratular`, {
        numero: `${number}-${budgetCode}`,
        referencia: reference,
        fechaCaratulacion: date,
        descripcion: description,
        cantidadFojas: 8,
        monto: null,
        tipo: type,
        estado: state,
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
        titleText: error.response.status,
        text: error.message,
      });
      console.log(error);
    }
  };

  const getExpedients = async (setExpedients, userId) => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/expedientes/bandeja-entrada/${userId}`
      );

      setExpedients(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.response.status,
        text: error.message,
      });
      console.log(error);
    }
  };

  const getMyExpedients = async (setExpedients, userId) => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/expedientes?caratuladorId=${userId}&page=${page}&orderBy=fechaCaratulacion&orientation=desc`
      );

      await setExpedients(data.items);
      dispatch(setTotalPages(data.totalPages));
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.response.status,
        text: error.message,
      });
      console.log(error);
    }
  };

  const listExpedientTypes = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/expedientes/tipos`);
      dispatch(setTypes(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.response.status,
        text: error.message,
      });
      console.log(error);
    }
  };

  const listExpedientStates = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/expedientes/estados`);
      dispatch(setStatus(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.response.status,
        text: error.message,
      });
      console.log(error);
    }
  };

  const getExpedient = async (setExpedient, expedientId) => {
    try {
      const { data } =
        await axios.get(`${BaseUrl}/expedientes/${expedientId}?includeDocuments=true
      `);
      setExpedient(data);
      dispatch(setFiles(data.documentos));
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.response,
        text: error.message,
      });
      console.log(error);
    }
  };

  const searchExpedients = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/expedientes?universalFilter=${search}&startDate=${startDate}&endDate${endDate}&status=${expedientStatus}&type${expedientType}&page=${page}`
      );

      dispatch(setTotalPages(data.totalPages));
      dispatch(setExpedientSearchResult(data.items));
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.response.status,
        text: error.message,
      });
      console.log(error);
    }
  };

  const updateExpedient = async (setShow, expedientId) => {
    try {
      await axios.put(`${BaseUrl}/${expedientId}/cambiar-estado`, {
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
        titleText: error.response.status,
        text: error.message,
      });
      console.log(error);
    }
  };

  const lastExpedientNumber = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/parametros?name=ULTIMO_NUMERO_DE_EXPEDIENTE`
      );
      const lastNumber = Number(data.valor) + 1;
      dispatch(setNumber(lastNumber));
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.response.status,
        text: error.message,
      });
      console.log(error);
    }
  };

  const expedientPass = async (
    userId,
    userReceiverId,
    userReceiverName,
    userReceiverApellido,
    date,
    expedientId,
    observations,
    setShow
  ) => {
    try {
      const pase = await axios.post(
        `${BaseUrl}/expedientes/${expedientId}/pase`,
        {
          fechaHora: date,
          observaciones: observations,
          expedienteId: expedientId,
          usuarioEmisorId: userId,
          usuarioReceptorId: Number(userReceiverId),
        }
      );
      setShow(false);
      Swal.fire({
        iconHtml: customIcon,
        text: `Expediente enviado exitosamente a ${userReceiverName} ${userReceiverApellido}`,
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.response.status,
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
    getMyExpedients,
  };
};

export default useExpedients;
