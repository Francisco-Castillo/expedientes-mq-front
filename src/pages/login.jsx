import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { onLogin } from "../store/auth";
import { useNavigate } from "react-router-dom";

import svg from "../assets/MMQ.svg";

import "../styles/login.css";

import svg from "../assets/MMQ.svg";

import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const BaseUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await axios.post(`${BaseUrl}login`, {
      //   email,
      //   password,
      // });
      const { data } = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(onLogin(data));
      navigation("/home");
    } catch (error) {
      console.log(error);
    }
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
              onChange={(e) => setEmail(e.target.value)}
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
