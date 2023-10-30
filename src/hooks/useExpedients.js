import axios from "axios";
import Swal from "sweetalert2";

import customIcon from "../assets/customIcon.svg";

const useExpedients = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;

  const newExpedient = async (
    reference,
    formattedDate,
    description,
    codigoTramite,
    typeExpedient,
    setShow
  ) => {
    try {
      await axios.post(`http://localhost:3001/api/expedientes/caratular`, {
        numeroExpediente: "1002-TES-2023",
        referencia: reference,
        fechaCaratulacion: formattedDate,
        descripcion: description,
        codigoTramite: codigoTramite,
        estado: "iniciado",
        tipoExpediente: typeExpedient,
        // usuario: user.name + user.lastName,
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

  const updateExpedient = async (state, setShow, expedientId) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3001/api/expedientes/changeState/${expedientId}`,
        { estado: state }
      );

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

  const getExpedients = async (setExpedients, setTotalPages, currentPage) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedientes?page=${currentPage}`
      );
      setExpedients(data.items);
      setTotalPages(data.totalPages);
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

  const getExpedient = async (setExpedient, setDocuments, expedientId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedientes/view/${expedientId}`
      );
      setExpedient(data.item);
      setDocuments(data.Files);
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
    setTotalPages
  ) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedientes?page=${currentPage}&search=${search}`
      );
      setResultSearch(data.items);
      const serverTotalPages = data.totalPages;
      setTotalPages(serverTotalPages);
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
    getExpedients,
    searchExpedients,
  };
};

export default useExpedients;
