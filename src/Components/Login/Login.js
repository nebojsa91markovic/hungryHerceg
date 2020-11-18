import React, {useState} from "react";
import ApiBase from "../../services/ApiBase/ApiBase"
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('1');

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
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input type="email" onChange={(event) => setUsername(event.target.value)}/>
        <br></br>
        <label>password</label>
        <input type="password" onChange={(event) => setPassword(event.target.value)}/>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
