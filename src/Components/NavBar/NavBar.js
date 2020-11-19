import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

const NavBar = () => {

    const location = useLocation()

    const showButtons = () => {

        if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
            return (
                <div className="userLogin-wrapper">
                    <Link to='/login'>
                        <button className="userLogin-button">Log In</button>
                    </Link>
                    <Link to='/signup'>
                        <button className="userLogin-button">Sign Up</button>
                    </Link>
                </div>
            )
        }
        else return
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