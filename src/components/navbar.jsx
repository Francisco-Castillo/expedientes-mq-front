import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { onLogout } from "../store/auth";

import mmqicon from "../assets/ICONMMQ.svg";
import usericon from "../assets/USER.svg";
import logoutIcon from "../assets/LOGOUT.svg";

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
          <img src={usericon} alt="" />
          {/* <span>{`${user.name} ${user.lastName}`}</span> */}
        </div>
        <button
          onClick={logout}
          type="button"
          className="btn btn-primary"
          style={{ backgroundColor: "inherit", border: "none" }}
        >
          <img src={logoutIcon} alt="logout" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;