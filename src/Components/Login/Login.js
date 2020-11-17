import React from "react";

const Login = () => {
  return (
    <div className="login-wrapper">
      <form>
        <label>email</label>
        <input type="email" />
        <br></br>
        <label>password</label>
        <input type="password" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
