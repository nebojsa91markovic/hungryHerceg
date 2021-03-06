import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./style.css";
import NavBarName from "../NavBarName/NavBarName";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const location = useLocation();
  const [cookies] = useCookies(["user"]);
  const history = useHistory();

  const handleHomeUrl = (event) => {
    event.preventDefault();
    if (cookies.user !== undefined && cookies.user !== "undefined")
      history.push("/home");
  };

  const showButtons = () => {
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/signup"
    ) {
      return (
        <div className="userLogin-wrapper">
          <Link to="/login">
            <button className="userLogin-button">LOG IN</button>
          </Link>
          <Link to="/signup">
            <button className="userLogin-button">SIGN UP</button>
          </Link>
        </div>
      );
    } else
      return (
        <>
          <NavBarName />
        </>
      );
  };

  return (
    <div className="navBar">
      <div className="logo" onClick={handleHomeUrl}></div>
      {showButtons()}
    </div>
  );
};

export default NavBar;
