import axios from "axios";

import Swal from "sweetalert2";

const customIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-check" width="30" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M11 19h-6a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4"></path>
  <path d="M15 19l2 2l4 -4"></path>
</svg>`;

const useDocuments = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;

  const newDocument = async (formData, setShow) => {
    try {
      await axios.post(`${BaseUrl}documentos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShow(false);
      Swal.fire({
        iconHtml: customIcon,
        text: "Documento subido exitosamente!",
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

  const viewDocument = async (documentName) => {
    try {
      await axios.get(`${BaseUrl}documentos/${documentName}`);
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

  const ListDocumentTypes = async (setTypes) => {
    try {
      const { data } = await axios.get(`${BaseUrl}tipos-documentos`);
      setTypes(data);
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

  return { newDocument, viewDocument, ListDocumentTypes };
};

export default useDocuments;
