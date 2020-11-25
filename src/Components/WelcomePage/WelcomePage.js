import React from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./style.css";

const WelcomePage = () => {
  const [cookies, setCookie] = useCookies(["user"]);

  const location = useLocation();
  const history = useHistory();

  const isLogin = () => {
    console.log(cookies.user);
    setTimeout(() => {
      if (cookies.user !== undefined && cookies.user !== "undefined")
        history.push("/home");
    }, 500);

    // if (cookies.user === undefined) {
    //   return false;
    // } else {
    //   history.push("/home");
    // }
  };

  const showText = () => {
    if (location.pathname === "/") {
      return (
        <h3 className="h3-welcome-page">
          Easy solution for company food ordering!
        </h3>
      );
    } else return;
  };

  return (
    <div className="welcome-wrapper">
      <h1 className="h1-welcome-page">
        ARE YOU <br></br> HUNGRY?
      </h1>

      {isLogin()}
      {showText()}
      {/* {isLogin()} */}
      <Switch>
        <Route component={Login} exact path="/login" />
        <Route component={SignUp} exact path="/signup" />
      </Switch>
    </div>
  );
};

export default WelcomePage;
