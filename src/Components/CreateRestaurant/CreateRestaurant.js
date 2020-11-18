import React, {useState} from "react";
import ApiBase from "../../services/ApiBase/ApiBase";
import ApiKey from "../../services/ApiKey/ApiKey"
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('1');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('test submit restaurant')
    console.log(ApiKey)
    const data = {
      name,
      address,
    }
    
    const config = {
      headers: {
        "Authorization": "Bearer " + ApiKey
      }
      }; 
      

    axios.post(`${ApiBase}restaurants`, data, config)
    .then(response => {
      console.log('test', response.data)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input type="text" onChange={(event) => setName(event.target.value)}/>
        <br></br>
        <label>address</label>
        <input type="text" onChange={(event) => setAddress(event.target.value)}/>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
