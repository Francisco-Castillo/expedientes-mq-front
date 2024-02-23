import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { onLogout } from "../store/auth";
import { clearPages } from "../store/pages";
import { clearTabs } from "../store/tab";

import mmqicon from "../assets/ICONMMQ.svg";

import { FaUserAlt, FaPowerOff } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";

import decodeToken from "../helpers/decodeToken";

import "../styles/navbar.css";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { name, lastName } = decodeToken(token);

  const navigation = useNavigate();

  const logout = () => {
    dispatch(onLogout({}));
    dispatch(clearPages(0));
    dispatch(clearTabs(""));
    navigation("/");
  };

  return (
    <header>
      <div className="container-logo-nav">
        <img className="mmq-icon" src={mmqicon} alt="logo-mmq" />
        <div className="title">
          <span className="title-mmq">Municipalidad de</span>
          <span className="title-mmq">Monte Quemado</span>
        </div>
      </div>
      <h3 className="sistema">Sistema de Gestión de Expedientes</h3>
      <div className="icon-login">
        <div className="icon">
          <HiUserCircle style={{ fontSize: "40px" }} />
          <span id="user-name">{`${name} ${lastName}`}</span>
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
