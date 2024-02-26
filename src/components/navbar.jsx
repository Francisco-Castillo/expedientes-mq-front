import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { onLogout } from "../store/auth";
import { clearPages } from "../store/pages";
import { clearTabs } from "../store/tab";
import { clearUserData } from "../store/User/userData";

import mmqicon from "../assets/ICONMMQ.svg";

import { FaPowerOff } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";

import "../styles/navbar.css";

const Navbar = () => {
  const { name, lastName } = useSelector((state) => state.userData.user);

  const dispatch = useDispatch();

  const navigation = useNavigate();

  const logout = () => {
    dispatch(onLogout({}));
    dispatch(clearPages(0));
    dispatch(clearTabs(""));
    dispatch(clearUserData());
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
