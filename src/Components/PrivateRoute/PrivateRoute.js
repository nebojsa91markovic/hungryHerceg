import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [cookies] = useCookies(["user"]);

  const isLogin = () => {
    if (cookies.user === undefined && cookies.user === "undefined") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
