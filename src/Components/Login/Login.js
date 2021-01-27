import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import UsersCollection from "../../collections/UsersCollection";
import { useCookies } from "react-cookie";

const Login = () => {
  const [cookies, setCookie] = useCookies(["user"]);

  const handleCookie = (userId) => {
    setCookie("user", userId, { path: "/" });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("1");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const history = useHistory();

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const ErrorLogin = (
    username,
    password,
    setErrorUsername,
    setErrorPassword
  ) => {
    if (validateEmail(username) === false) {
      return setErrorUsername("Invalid username");
    } else if (password.length < 3) {
      return setErrorPassword("Invalid password");
    }
  };

  const ConditionsLogin = (username, password) =>
    validateEmail(username) === true && password.length > 2;

  const handleSubmit = (event) => {
    event.preventDefault();

    let allUsers = [];

    if (ConditionsLogin(username, password)) {
      UsersCollection.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          allUsers.push(doc.data());
        });
        allUsers.map((user) => {
          if (user.email === username && user.password === password) {
            handleCookie(user.id);
            localStorage.setItem("status", "ulogovan");
            history.push("/home");
          }
        });
      });
    } else {
      return ErrorLogin(username, password, setErrorUsername, setErrorPassword);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <br></br>
        <input
          className="logIn-input"
          type="email"
          onChange={(event) => setUsername(event.target.value)}
        />
        <p>{errorUsername}</p>
        <br></br>
        <label>Password:</label>
        <br></br>
        <input
          className="logIn-input"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <p>{errorPassword}</p>
        <br></br>
        <input className="logIn-input-button" type="submit" value="LOG IN" />
      </form>
    </div>
  );
};

export default Login;
