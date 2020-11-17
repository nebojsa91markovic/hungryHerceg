import React from 'react';

const SignUp = () => {
    return ( <div className="signUp-wrapper">
        <form>
        <label>email</label>
        <input type="email" />
        <br></br>
        <label>First Name</label>
        <input type="text" />
        <br></br>
        <label>Surname</label>
        <input type="text" />
        <br></br>
        <label>password</label>
        <input type="password" />
        <input type="submit" />
      </form>
    </div> );
}
 
export default SignUp;