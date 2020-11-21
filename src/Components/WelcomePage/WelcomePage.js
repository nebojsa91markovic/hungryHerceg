import React from 'react';
import './style.css';
import Login from "../Login/Login"
import SignUp from '../SignUp/SignUp';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

const WelcomePage = () => {

    const location = useLocation();

    const showText = () => {
        if (location.pathname === '/') {
            return (
                <h3>Easy solution for company food ordering!</h3>
            )
        }
        else return
    }

    const isLogin = () => {

        if (localStorage.getItem("status") === null) {
            return false
        }
        else {
            return (
                <Redirect to="/home" />
            )
        }
    }


    return (

        <div className="welcome-wrapper">
            <h1>ARE YOU <br></br> HUNGRY?</h1>

            {showText()}
            {isLogin()}
            <Switch>
                <Route component={Login} exact path='/login' />
                <Route component={SignUp} exact path='/signup' />
            </Switch>
        </div>
    );
}

export default WelcomePage;