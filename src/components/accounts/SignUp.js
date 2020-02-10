import React, { useState } from "react";
import Firebase from "../../firebase/firebase";

const SignUp = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [routeRedirect, setRouteRedirect] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const newUser = {
    email,
    password,
    firstName,
    lastName
  };

  const signUp = async event => {
    event.preventDefault();
    let response = await Firebase.signUp(newUser);
    if (response.hasOwnProperty("message")) {
      setErrorMessage(response.message);
    } else {
      setRouteRedirect(true);
      props.history.push("/");
    }
  };

  const redirect = routeRedirect;
  if (redirect) {
    props.history.push("/");
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
              required
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              required
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">First Name</label>
            <input
              type="text"
              id="firstName"
              autoComplete="new-password"
              required
              onChange={event => setFirstName(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Last Name</label>
            <input
              type="text"
              id="lastName"
              autoComplete="new-password"
              required
              onChange={event => setLastName(event.target.value)}
            />
          </div>
          <div className="input-field center">
            <button className="btn green lighten-1 z-depth-0">
              Create Account
            </button>
            <p className="error red-text center">{errorMessage}</p>
          </div>
          <div className="center">
            <a href="/login">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
