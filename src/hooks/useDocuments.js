import axios from "axios";

import Swal from "sweetalert2";

import customIcon from "../assets/customIcon.svg";

const useDocuments = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;

  const newDocument = async (formData, setShow) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/expedientes/uploadFile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShow(false);

      Swal.fire({
        iconHtml: customIcon,
        text: "Documento subido exitosamente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });

      console.log(response);
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

  const getDocuments = async (setDocuments, currentPage, setTotalPages) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/documents/allDocuments?page=${currentPage}`
      );
      setDocuments(data.items);
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

  const searchFiles = async (search, setResultSearch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/documents/search/?search=${search}`
      );
      setResultSearch(data.items);
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
        `http://localhost:3001/api/expedientes/linkDocument/${expedientId}/${fileId}`
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

  return { newDocument, getDocuments, searchFiles, linkFile };
};

export default useDocuments;
