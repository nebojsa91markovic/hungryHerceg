import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {

    const isLogin = () => {

        if (localStorage.getItem("userToken") === null) {
            return false
        }
        else return true
    }

    return (
        <Route render={props => (
            isLogin() ?
                <Component {...props} />
                :
                <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;