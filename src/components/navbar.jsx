import mmqicon from "../assets/ICONMMQ.svg";
import usericon from "../assets/USER.svg";
import logoutIcon from "../assets/LOGOUT.svg";

import "../styles/navbar.css";

const Navbar = () => {
  return (
    <header>
      <div className="logo">
        <img src={mmqicon} alt="" />
        <span>Municipalidad de Monte Quemado</span>
      </div>
      <h3>Sistema de gestión de expedientes</h3>
      <div className="icon-login">
        <div className="icon">
          <img src={usericon} alt="" />
          <span>User</span>
        </div>
        <img src={logoutIcon} alt="logout" />
      </div>
    </header>
  );
};

export default Navbar;
