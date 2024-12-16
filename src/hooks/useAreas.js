import axios from "axios";

import { setAreas } from "../store/areas";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

const customIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-check" width="30" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M11 19h-6a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4"></path>
  <path d="M15 19l2 2l4 -4"></path>
</svg>`;

const useAreas = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();

  const getAreas = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}areas?orderBy=nivel&orientation=asc&page=0&size=50`
      );
      dispatch(setAreas(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.response.status,
        text: error.response.data.messages[0],
      });
      console.log(error);
    }
  };

  const createArea = async (
    descripcion,
    codigoPresupuestario,
    nivel,
    referenciaId
  ) => {
    try {
      await axios.post(`${BaseUrl}areas`, {
        descripcion: descripcion,
        referenciaId: referenciaId,
        nivel: parseInt(referenciaId) + 1,
        codigoPresupuestario: codigoPresupuestario,
      });

      console.log(referenciaId + 1);
      Swal.fire({
        iconHtml: customIcon,
        text: "Area generado exitosamente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.code,
        text: error.message,
      });
      console.log(error);
    }
  };
  const updateArea = async (
    areaId,
    Newdescripcion,
    NewcodigoPresupuestario,
    newNivel,
    newReferenciaId
  ) => {
    try {
      await axios.put(`${BaseUrl}areas/${areaId}`, {
        descripcion: Newdescripcion,
        referenciaId: newReferenciaId,
        nivel: newNivel,
        codigoPresupuestario: NewcodigoPresupuestario,
      });
      Swal.fire({
        iconHtml: customIcon,
        text: "Area actualizado exitosamente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.code,
        text: error.message,
      });
      console.log(error);
    }
  };
  const deleteArea = async (areaId) => {
    try {
      await axios.delete(`${BaseUrl}areas/${areaId}`);
      Swal.fire({
        iconHtml: customIcon,
        text: "Area borrado exitosamente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        titleText: error.code,
        text: error.message,
      });
      console.log(error);
    }
  };

  return { getAreas, createArea, updateArea, deleteArea };
};

export default useAreas;
