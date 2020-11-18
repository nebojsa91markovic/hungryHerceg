import React from 'react';
import './style.css';
import Login from "../Login/Login"
import SignUp from '../SignUp/SignUp';
import CreateRestaurant from "../CreateRestaurant/CreateRestaurant"
import CreateRestaurantDatabase from "../CreateRestaurantDatabase/CreateRestaurantDatabase"

const WelcomePage = () => {
    return ( <div className="welcome-wrapper">
        <h1>ARE YOU <br></br> HUNGRY?</h1>
        <h3>Easy solution for company food ordering!</h3>
        <Login />
        <SignUp />
        <CreateRestaurant />
        <CreateRestaurantDatabase />
    </div> );
}
 
export default WelcomePage;