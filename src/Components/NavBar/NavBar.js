import React from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import './style.css';

const NavBar = () => {

    const location = useLocation()
    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('status')
        history.push('/')
    }

    const showButtons = () => {

        if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
            return (
                <div className="userLogin-wrapper">
                    <Link to='/login'>
                        <button className="userLogin-button">LOG IN</button>
                    </Link>
                    <Link to='/signup'>
                        <button className="userLogin-button">SIGN UP</button>
                    </Link>
                </div>
            )
        }
        else return (

            <div className="userLogin-wrapper">
                <Link to='/'>
                    <button onClick={handleLogout} className="userLogin-button">LOG OUT</button>
                </Link>
            </div>
        )
    }

    return (

        <div className="navBar">
            <Link to='/home'>
                <div className="logo"></div>
            </Link>
            {showButtons()}
            {/* kad nije ulogovan */}

            {/* kad je ulogovan */}
            {/* <div className="userInfo-wrapper">
            <button>Settings</button>
            <span>Welcome, $John Doe$</span>
        </div> */}
        </div >
    );
}

export default NavBar;