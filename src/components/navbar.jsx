import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { onLogout } from "../store/auth";

import mmqicon from "../assets/ICONMMQ.svg";

import { FaUserAlt, FaPowerOff } from "react-icons/fa";

import "../styles/navbar.css";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);

  // const { user } = JSON.parse(atob(token.slice(7).split(".")[1]));

  const dispatch = useDispatch();

  const navigation = useNavigate();

  const logout = () => {
    dispatch(onLogout({}));
    navigation("/");
  };

  return (
    <header>
      <div className="container-logo">
        <div className="logo">
          <img src={mmqicon} alt="" />
        </div>
        <div className="title">
          <span>Municipalidad de</span>
          <span>Monte Quemado</span>
        </div>
      </div>
      <h3>Sistema de gestión de expedientes</h3>
      <div className="icon-login">
        <div className="icon">
          <FaUserAlt style={{ fontSize: "30px" }} />
        </div>
        <button
          onClick={logout}
          type="button"
          className="btn btn-primary"
          style={{ backgroundColor: "inherit", border: "none" }}
        >
          <FaPowerOff style={{ fontSize: "30px" }} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
