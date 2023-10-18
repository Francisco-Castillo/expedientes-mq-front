import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { onLogin } from "../store/auth";
import { useNavigate } from "react-router-dom";

import svg from "../assets/MMQ.svg";

import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const { token } = useSelector((state) => state);
  const navigation = useNavigate();

  const BaseUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BaseUrl}login`, {
        email,
        password,
      });

      dispatch(onLogin(data));
      navigation("/home");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="container-login">
          <h1 id="title-login">Sistema de gestión de expedientes</h1>
          <h2 id="title-welcome">¡Bienvenido!</h2>
          <form action="" id="login" onSubmit={handleLogin}>
            <label htmlFor="">Usuario</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="">Contraseña</label>
            <input
              type="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <button id="btn-login" type="submit">
              Ingresar
            </button>
          </form>
        </div>
        <div>
          <img id="escudo" src={svg} alt="" />
          <h2 id="mmq">Municipalidad de Monte Quemado</h2>
        </div>
      </div>
    </>
  );
};

export default Login;
