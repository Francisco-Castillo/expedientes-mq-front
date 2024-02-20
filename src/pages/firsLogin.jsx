import React, { useState } from "react";

import useUsers from "../hooks/useUsers";

import svg from "../assets/MMQ.svg";

import "../styles/login.css";
const FirsLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { updatePassword, login } = useUsers();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(password, email);
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-login">
      <div className="container-form">
        <h1 id="title-sistema">Sistema de gestión de expedientes</h1>

        <h2 id="title-welcome">¡Actualice su contraseña</h2>
        <h2 id="title-welcome">Para poder Continuar!</h2>

        <form action="" id="form-login" onSubmit={handleUpdate}>
          <div className="container-input">
            <label htmlFor="">Email</label>
            <input
              className="input-login"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="container-input">
            <label htmlFor="">Ingrese su nueva Contraseña</label>
            <input
              className="input-login"
              type="password"
              value={password}
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

export default FirsLogin;
