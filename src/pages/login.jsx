import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { onLogin } from "../store/auth";

import { useNavigate } from "react-router-dom";

import useUsers from "../hooks/useUsers";

import svg from "../assets/MMQ.svg";

import "../styles/login.css";

import "../styles/login.css";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { login } = useUsers();

  const navigation = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(username, password, dispatch, onLogin, navigation);
  };

  return (
    <div className="container-login">
      <div className="container-form">
        <h1 id="title-sistema">Sistema de gestión de expedientes</h1>

        <h2 id="title-welcome">¡Bienvenido!</h2>

        <form action="" id="form-login" onSubmit={handleLogin}>
          <div className="container-input">
            <label htmlFor="">Usuario</label>
            <input
              className="input-login"
              type="text"
              placeholder=""
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="container-input">
            <label htmlFor="">Contraseña</label>
            <input
              className="input-login"
              type="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button id="btn-login" type="submit">
            Ingresar
          </button>
        </form>
      </div>
      <div className="container-logo">
        <img id="escudo" src={svg} alt="" />
        <h2 id="mmq">Municipalidad de Monte Quemado</h2>
      </div>
    </div>
  );
};

export default Login;
