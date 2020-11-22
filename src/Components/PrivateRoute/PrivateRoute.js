import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useCookies } from "react-cookie";
import UsersCollection from "../../collections/UsersCollection";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    console.log(cookies.user)


    const isLogin = () => {

        if (localStorage.getItem("status") === null) {
            return false
        }
        else return true
    }

    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                :
                <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;