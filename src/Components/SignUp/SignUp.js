import React, { useState } from "react";
import ApiBase from "../../services/ApiBase/ApiBase"
import axios from 'axios';
import "./style.css"
import UsersCollection from "../../collections/UsersCollection";



const SignUp = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log('submit test')

    const data = {
      email,
      firstName,
      lastName,
      password,
    }

    UsersCollection.doc().set(data, {merge: true})
    .then(() => {
      console.log('user upisan')
      })
  }
 return ( <div className="signUp-wrapper">
        <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <br></br>
        <input className="signUp-input" type="email" onChange={(event) => setEmail(event.target.value)}/>
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
    </div> );
}

export default SignUp;