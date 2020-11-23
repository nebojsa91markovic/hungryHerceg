import React, { useState } from "react";
import "./style.css"
import UsersCollection from "../../collections/UsersCollection";
import FavoriteMealsCollection from "../../collections/FavoriteMealsCollection";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";



const SignUp = () => {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(["user"]);

  const history = useHistory()

  const handleCookie = (userId) => {
    setCookie("user", userId, { path: "/" });
  }

  const createFavoriteMeals = (id) => {
    FavoriteMealsCollection.doc(id).set({
      pizza: 0,
      palacinke: 0,
      burgeri: 0,
      burito: 0,
      salate: 0,
    })
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log('submit test')

    const data = {
      email,
      firstName,
      lastName,
      password,
    }

    let newDocRef = UsersCollection.doc()

    newDocRef.set({
      email,
      firstName,
      lastName,
      password,
      id: newDocRef.id
    }, { merge: true })
      .then(() => {
        console.log('user upisan')
        createFavoriteMeals(newDocRef.id);
        handleCookie(newDocRef.id);
        history.push('/home')
      })
  }
  return (<div className="signUp-wrapper">
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <br></br>
      <input className="signUp-input" type="email" onChange={(event) => setEmail(event.target.value)} />
      <br></br>
      <label>First Name:</label>
      <br></br>
      <input className="signUp-input" type="text" onChange={(event) => setFirstName(event.target.value)} />
      <br></br>
      <label>Last Name:</label>
      <br></br>
      <input className="signUp-input" type="text" onChange={(event) => setLastName(event.target.value)} />
      <br></br>
      <label>Password:</label>
      <br></br>
      <input className="signUp-input" type="password" onChange={(event) => setPassword(event.target.value)} />
      <br></br>
      <input className="signUp-input-button" type="submit" value="Register" />
    </form>
  </div>);
}

export default SignUp;