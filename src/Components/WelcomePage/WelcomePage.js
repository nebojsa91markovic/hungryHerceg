import React from 'react';
import './style.css';
import Login from "../Login/Login"
import SignUp from '../SignUp/SignUp';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

const WelcomePage = () => {

    const location = useLocation()
    const history = useHistory()

    const isLogin = () => {

        if (localStorage.getItem("status") === null) {
            return false
        }
        else {
            history.push('/home')
        }
    }
    const showText = () => {
        if (location.pathname === '/') {
            return (
                <h3 className="h3-welcome-page">Easy solution for company food ordering!</h3>

            )
        }
        else return
    }
    return (

        <div className="welcome-wrapper">
            <h1 className="h1-welcome-page">ARE YOU <br></br> HUNGRY?</h1>

            {isLogin()}
            {showText()}

            <Switch>
                <Route component={Login} exact path='/login' />
                <Route component={SignUp} exact path='/signup' />
            </Switch>
        </div>
    );
}

export default WelcomePage;