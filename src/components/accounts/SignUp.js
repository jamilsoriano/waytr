import React, { useState } from "react";
import Firebase from "../../firebase/firebase";
import { Redirect } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [routeRedirect, setRouteRedirect] = useState();

  const newUser = {
    email,
    password,
    firstName,
    lastName
  };

  const signUp = async event => {
    event.preventDefault();
    let response = await Firebase.signUp(newUser);
    console.log(response);
    if (response.hasOwnProperty("message")) {
      console.log(response.message);
    } else {
      setRouteRedirect(true);
    }
  };

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={signUp} className="white">
          <h5 className="grey-text text-darken-3 center">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="new-password"
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">First Name</label>
            <input
              type="text"
              id="firstName"
              autoComplete="new-password"
              onChange={event => setFirstName(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Last Name</label>
            <input
              type="text"
              id="lastName"
              autoComplete="new-password"
              onChange={event => setLastName(event.target.value)}
            />
          </div>
          <div className="input-field">
            <button className="btn purple lighten-1 z-depth-0">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
