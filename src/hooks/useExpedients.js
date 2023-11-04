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
    reference,
    formattedDate,
    description,
    codigoTramite,
    typeExpedient,
    setShow
  ) => {
    try {
      await axios.post(`http://localhost:3001/api/expedients/caratular`, {
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

  const getExpedients = async (setExpedients, setTotalPages, currentPage) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedients?page=${currentPage}`
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

  const getExpedientsWhitFiles = async (
    setExpedient,
    setDocuments,
    expedientId
  ) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedients/view/${expedientId}`
      );
      setExpedient(data);
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

  const getExpedient = async (setExpedient, expedientId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedients/view/${expedientId}`
      );
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
    setTotalPages
  ) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/expedients/search?page=${currentPage}&search=${search}`
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

  const updateExpedient = async (state, setShow, expedientId) => {
    try {
      await axios.patch(
        `http://localhost:3001/api/expedients/changeState/${expedientId}`,
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

  const linkFile = async (expedientId, fileId, setShow) => {
    try {
      await axios.post(
        `http://localhost:3001/api/expedients/linkDocument/${expedientId}/${fileId}`
      );
      setShow(false);
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
    getExpedientsWhitFiles,
    getExpedients,
    searchExpedients,
    linkFile,
  };
};

export default useExpedients;
