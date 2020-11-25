import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import UsersCollection from "../../collections/UsersCollection"
import './style.css';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'


const NavBarName = () => {

    const [cookies, removeCookie] = useCookies(["user"]);
    const [user, setUser] = useState({})
    const [isClicked, setIsClicked] = useState(false)
    const history = useHistory();

    useEffect(() => {
        UsersCollection.doc(cookies.user).get().then(response => {
            setUser(response.data())
            console.log(user);
        })
    }, [])

    const handleLogout = () => {
        removeCookie("user");
        history.push("/");
    };

    const handleBackButton = () => {
        if (window.innerWidth <= 600)
            return (
                <button className="dropdown-links" onClick={toggleMenu}><AiFillCaretUp /></button >
            )
    }
    const toggleMenu = () => {
        setIsClicked(!isClicked)
    }

    return (
        <div className="navbar-name">
            <button onClick={toggleMenu}>{user.firstName} {user.lastName} <AiFillCaretDown /></button>

            {isClicked ?
                <div ref={menuRef} className="dropdown-list">
                    <Link to="/settings"><button className="dropdown-links" onClick={toggleMenu}>SETTINGS</button></Link>
                    <button className="dropdown-links" onClick={handleLogout}>LOG OUT</button>
                    {handleBackButton()}
                </div>
                :
                null
            }
        </div>
    )
}

export default NavBarName