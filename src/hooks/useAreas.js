import axios from "axios";

import { setAreas } from "../store/areas";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

const useAreas = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();

  const getAreas = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/areas?orderBy=nivel&orientation=asc`
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
  return { getAreas };
};

export default useAreas;
