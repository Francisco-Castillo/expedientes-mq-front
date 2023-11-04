import axios from "axios";
import Swal from "sweetalert2";

const useUsers = () => {
  const customIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-check" width="30" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M11 19h-6a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4"></path>
      <path d="M15 19l2 2l4 -4"></path>
    </svg>`;

  const newUser = async (name, lastName, DNI, email, dependence, setShow) => {
    try {
      await axios.post(`http://localhost:3001/api/users/register`, {
        nombre: name,
        apellido: lastName,
        email: email,
        dni: DNI,
        dependencia: dependence,
        password: "Test01**",
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

  const getUsers = async (setUsers, setTotalPages, currentPage) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/users/all?page=${currentPage}`
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

  const getUser = async (setUser, userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/users/${userId}`
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

  const updateUser = async (
    name,
    lastName,
    DNI,
    email,
    dependence,
    userId,
    setShow
  ) => {
    try {
      await axios.patch(
        `http://localhost:3001/api/users/updateUser/${userId}`,
        {
          nombre: name,
          apellido: lastName,
          email: email,
          dni: DNI,
          dependencia: dependence,
        }
      );

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

  return { getUsers, newUser, updateUser, getUser };
};

export default useUsers;
