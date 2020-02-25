import React, { useState } from "react";
import Firebase from "../../firebase/firebase";
import { Redirect } from "react-router-dom";
import uuid from "react-uuid";
import { useAuthState } from "react-firebase-hooks/auth";

const RegisterRestaurant = () => {
  const [user, initialising] = useAuthState(Firebase.auth);
  const [restUID] = useState(uuid());
  const [restName, setRestName] = useState("");
  const [restStreetAddress, setRestStreetAddress] = useState("");
  const [restSuburb, setRestSuburb] = useState("");
  const [restPostcode, setRestPostcode] = useState("");
  const [restPhoneNumber, setRestPhoneNumber] = useState("");
  const [restCuisine, setRestCuisine] = useState("");
  const [routeRedirect, setRouteRedirect] = useState(false);

  const newRestaurant = {
    restUID,
    restName,
    restStreetAddress,
    restSuburb,
    restPostcode,
    restPhoneNumber,
    restCuisine
  };

  const register = event => {
    event.preventDefault();
    Firebase.registerRest(newRestaurant);
    setRouteRedirect(true);
  };

  if (routeRedirect) {
    return <Redirect to="/" />;
  }

  if (!initialising) {
    if (user) {
      user.getIdTokenResult().then(IdTokenResult => {
        user.admin = IdTokenResult.claims.admin;
        if (!user.admin) {
          setRouteRedirect(true);
        }
      });
    } else {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="container">
          <form onSubmit={register} className="white">
            <h5 className="grey-text text-darken-3 center">
              Register Your Restaurant (1/2)
            </h5>
            <div className="input-field">
              <label htmlFor="restName">Restaurant Name</label>
              <input
                type="text"
                id="restName"
                required
                onChange={event => setRestName(event.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="restStreetAddress">Street Address</label>
              <input
                type="text"
                id="restStreetAddress"
                required
                onChange={event => setRestStreetAddress(event.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="restSuburb">Suburb/Town</label>
              <input
                type="text"
                id="restSuburb"
                required
                onChange={event => setRestSuburb(event.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="restPostcode">Postcode</label>
              <input
                type="text"
                id="restPostCode"
                required
                onChange={event => setRestPostcode(event.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="restPhoneNumber">Phone Number</label>
              <input
                type="text"
                id="restPhoneNumber"
                required
                onChange={event => setRestPhoneNumber(event.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="restCuisine">Cuisine</label>
              <input
                type="text"
                id="restCuisine"
                required
                onChange={event => setRestCuisine(event.target.value)}
              />
            </div>
            <div className="input-field center">
              <button className="btn green lighten-1 z-depth-0">Next</button>
            </div>
            <div className="center">
              Already registered?
              <a href="/login"> Sign in</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return <div className="loader container center"></div>;
};

export default RegisterRestaurant;
