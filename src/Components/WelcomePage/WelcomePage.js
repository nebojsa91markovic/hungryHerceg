import React from 'react';
import './style.css';
import Login from "../Login/Login"
import SignUp from '../SignUp/SignUp';
import { Route, Switch, useLocation } from 'react-router-dom';

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
    return (

        <div className="welcome-wrapper">
            <h1>ARE YOU <br></br> HUNGRY?</h1>

            {showText()}

            <Switch>
                <Route component={Login} exact path='/login' />
                <Route component={SignUp} exact path='/signup' />
            </Switch>
        </div>
    );
}

export default WelcomePage;