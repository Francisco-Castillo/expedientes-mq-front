import React, { useState } from "react";

import { useSelector } from "react-redux/es/hooks/useSelector";

import Loader from "../components/loaders/loader";

import useUsers from "../hooks/useUsers";

import svg from "../assets/MMQ.svg";

import "../styles/login.css";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const { status } = useSelector((state) => state.load);

  const { login } = useUsers();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {status ? (
        <Loader />
      ) : (
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
                <button id="btn-login" type="submit">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
          <div className="container-logo">
            <img id="escudo" src={svg} alt="" />
            <h2 id="mmq">Municipalidad de Monte Quemado</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
