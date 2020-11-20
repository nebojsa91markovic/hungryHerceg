import React, { useState } from "react";
import ApiBase from "../../services/ApiBase/ApiBase"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./style.css"

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('1');

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit test')
    const data = {
      username,
      password,
    }

    axios.post(`${ApiBase}auth`, data)
      .then(response => {
        console.log('test', response.data)
        localStorage.setItem('userToken', response.data.access_token)

        history.push("/home");
      })
      .catch(err => console.log(err))
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
        <input  className="logIn-input-button" type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default Login;
