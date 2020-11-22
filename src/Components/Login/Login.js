import React, { useState } from "react";
import ApiBase from "../../services/ApiBase/ApiBase"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./style.css"
import UsersCollection from "../../collections/UsersCollection";


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('1');

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit test')

    let allUsers = [];
    UsersCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        allUsers.push(doc.data());

      });
      console.log(allUsers);
      allUsers.map(user => {
        if (user.email === username && user.password === password) {
          console.log('success')
          localStorage.setItem('status', 'ulogovan')
          history.push("/home");
        }
      })
    });
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <br></br>
        <input className="logIn-input" type="email" onChange={(event) => setUsername(event.target.value)} />
        <br></br>
        <label>Password:</label>
        <br></br>
        <input className="logIn-input" type="password" onChange={(event) => setPassword(event.target.value)} />
        <br></br>
        <input className="logIn-input-button" type="submit" value="LOG IN" />
      </form>
    </div>
  );
};

export default Login;
