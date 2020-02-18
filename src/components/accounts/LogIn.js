import React, { useState } from "react";
import Firebase from "../../firebase/firebase";
import { Redirect } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [routeRedirect, setRouteRedirect] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const logIn = async event => {
    event.preventDefault();
    let response = await Firebase.loginEmail(email, password);
    if (response.hasOwnProperty("message")) {
      setErrorMessage(response.message);
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
      <div className="container formcont">
        <form onSubmit={logIn} className="white">
          <h5 className="grey-text text-darken-3 center">Log In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="input-field center">
            <button className="btn green lighten-1 z-depth-0">Log In</button>
          </div>
          <p className="error red-text center">{errorMessage}</p>
          <div className="center">
            <a href="/signup">Don't have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
