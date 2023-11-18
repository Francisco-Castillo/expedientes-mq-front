import axios from "axios";
import Swal from "sweetalert2";

import React from "react";

const useAreas = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;

  const getAreas = async (setAreas) => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/areas?orderBy=nivel&orientation=asc`
      );
      setAreas(data);
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
  return { getAreas };
};

export default useAreas;
