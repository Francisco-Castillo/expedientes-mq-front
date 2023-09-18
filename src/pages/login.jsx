import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { onLogin } from "../store/auth";

import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const { token } = useSelector((state) => state);
  const navigation = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      dispatch(onLogin(data));
      navigation("/new/expedient");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-login">
        <form action="" id="login" onSubmit={handleLogin}>
          <label htmlFor="">Usuario</label>
          <input
            type="text"
            placeholder="ingrese su nombre de usuario"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            placeholder="ingrese su contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Ingresar</button>
        </form>
        {/* {authStatus === "authenticated" && (
          <p>¡Has iniciado sesión con éxito!</p>
        )} */}
      </div>
    </>
  );
};

export default Login;
