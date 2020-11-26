import React, { useState } from "react";
import "./style.css";
import UsersCollection from "../../collections/UsersCollection";
import FavoriteMealsCollection from "../../collections/FavoriteMealsCollection";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorFirstName, setErrorFirstName] = useState('')
  const [errorLastName, setErrorLastName] = useState('')

  const history = useHistory();

  function validateEmail (email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

  const handleCookie = (userId) => {
    setCookie("user", userId, { path: "/" });
  };

  const createFavoriteMeals = (id) => {
    FavoriteMealsCollection.doc(id).set({
      pizza: 0,
      pancakes: 0,
      burgers: 0,
      barbecue: 0,
      burito: 0,
      salad: 0,
      drinks: 0,
      pasta: 0,
    });
  };

  const ErrorSignUp = (email, firstName, lastName, password, setErrorEmail, setErrorFirstName, setErrorLastName, setErrorPassword) => { 
    if(validateEmail(email) === false){ 
      return(
          setErrorEmail("Invalid email")
          )
        }else if (firstName.length < 3){
            return (
              setErrorFirstName("First name must have 3 letters minimum!")
            )
        }else if(lastName.length < 3){
            return (
              setErrorLastName("Last name must have 3 letters minimum!")
            )
        }else if(password.length < 3){
          return (
            setErrorPassword("Invalid password")
          )
        }
  }

  const ConditionsSignUp = (email, firstName, lastName, password) => validateEmail(email) === true
                                                              && firstName.length > 2
                                                              && lastName.length > 2
                                                              && password.length > 2


  const handleSubmit = (event) => {
    event.preventDefault();

    if(ConditionsSignUp === true){
    let newDocRef = UsersCollection.doc();

    newDocRef
      .set(
        {
          email,
          firstName,
          lastName,
          password,
          id: newDocRef.id,
          isActiveted: false,
        },
        { merge: true }
      )
      .then(() => {
        createFavoriteMeals(newDocRef.id);
        handleCookie(newDocRef.id);
        history.push("/home");
      });
    }else{
      ErrorSignUp(email, firstName, lastName, password, setErrorEmail, setErrorFirstName, setErrorLastName, setErrorPassword)
    }
  };

  return (
    <div className="signUp-wrapper">
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <br></br>
        <input
          className="signUp-input"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <p>{errorEmail}</p>
        <br></br>
        <label>First Name:</label>
        <br></br>
        <input
          className="signUp-input"
          type="text"
          onChange={(event) => setFirstName(event.target.value)}
        />
        <p>{errorFirstName}</p>
        <br></br>
        <label>Last Name:</label>
        <br></br>
        <input
          className="signUp-input"
          type="text"
          onChange={(event) => setLastName(event.target.value)}
        />
        <p>{errorLastName}</p>
        <br></br>
        <label>Password:</label>
        <br></br>
        <input
          className="signUp-input"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <p>{errorPassword}</p>
        <br></br>
        <input className="signUp-input-button" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default SignUp;
