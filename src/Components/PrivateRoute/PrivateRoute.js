import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {


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