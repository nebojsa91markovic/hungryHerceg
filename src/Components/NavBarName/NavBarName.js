import React, { useEffect } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie";
import UsersCollection from "../../collections/UsersCollection"
import './style.css';


const NavBarName = () => {

    const [cookies, setCookie] = useCookies(["user"]);

    useEffect(() => {
        UsersCollection.get(cookies.user).then(response => {
            console.log(response.data());
        })
    }, [])


    return (
        <div>

        </div>
    )
}

export default NavBarName