import axios from "axios";
import Swal from "sweetalert2";

const useUsers = () => {
  const customIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-check" width="30" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M11 19h-6a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4"></path>
      <path d="M15 19l2 2l4 -4"></path>
    </svg>`;

  const BaseUrl = import.meta.env.VITE_API_URL;

  const newUser = async (name, lastName, DNI, email, areaId, setShow) => {
    try {
      await axios.post(`${BaseUrl}/usuarios`, {
        nombre: name,
        apellido: lastName,
        email: email,
        documento: DNI,
        area: {
          id: areaId,
        },
        password: "test",
      });

      setShow(false);
      Swal.fire({
        iconHtml: customIcon,
        text: "Usuario Creado exitosamente!",
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

  const login = async (username, password, navigation, onLogin, dispatch) => {
    try {
      const { data } = await axios.post(`${BaseUrl}/login`, {
        username: username,
        password,
      });
      dispatch(onLogin(data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.messages[0]);
        console.log(error.response.status);

        if (error.response.data.messages[0] === "Debe cambiar su contraseña.") {
          navigation("/updatePassword");
        }
      } else if (error.message) {
        console.log("Mensaje de error:", error.message);
      }
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        text: error.message,
      });

      console.log(error);
    }
  };

  const getUsers = async (setUsers, setTotalPages, currentPage) => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/usuarios?page=${currentPage}`
      );

      setUsers(data.items);
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

  const getUser = async (setUser, userEmail) => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/usuarios/user-info?email=${userEmail}`
      );

      setUser(data);
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

  const updateUser = async (name, lastName, DNI, userId, setShow) => {
    try {
      await axios.get(`${BaseUrl}/usuarios/cambiar-info`, {
        nombre: name,
        apellido: lastName,
        documento: DNI,
        id: userId,
      });

      setShow(false);

      Swal.fire({
        iconHtml: customIcon,
        text: "Usuario editado exitosamente!",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "rgba(235, 87, 87, 1)",
        title: "Oops...",
        text: error.message,
      });

      console.log(error.message);
    }
  };

  const updatePassword = async (password, email) => {
    try {
      await axios.put(`${BaseUrl}/usuarios/cambiar-password`, {
        email,
        password,
      });

      Swal.fire({
        iconHtml: customIcon,
        text: "Contraseña actualizada exitosamente!",
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

  const changeState = async (uid, estado) => {
    console.log(uid, estado);
    try {
      await axios.put(`${BaseUrl}/usuarios/cambiar-estado`, {
        id: String(uid),
        estado: estado,
      });

      Swal.fire({
        iconHtml: customIcon,
        text: "Estado del Usuario actualizado exitosamente!",
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

  const searchUser = async (searchTerm, setSearchResults) => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/usuarios?universalFilter=${searchTerm}`
      );
      setSearchResults(data.items);
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
    getUsers,
    newUser,
    updateUser,
    getUser,
    login,
    updatePassword,
    changeState,
    searchUser,
  };
};

export default useUsers;
