import React, { useState } from "react";
import Firebase from "../firebase/firebase";

function Admin() {
  const [adminEmail, setAdminEmail] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantID, setRestaurantID] = useState("");
  const [restFeedBack, setRestFeedback] = useState("");
  const [adminFeedBack, setAdminFeedback] = useState("");

  const addAdmin = event => {
    event.preventDefault();
    const addAdminRole = Firebase.functions.httpsCallable("addAdminRole");
    addAdminRole({ email: adminEmail }).then(result => {
      setRestFeedback(result.data.message);
    });
  };

  const addRestaurantManager = event => {
    event.preventDefault();
    const addRestaurantManager = Firebase.functions.httpsCallable(
      "addRestaurantManager"
    );
    addRestaurantManager({
      email: restaurantEmail,
      restaurantID: restaurantID
    }).then(result => {
      setAdminFeedback(result.data.message);
    });
  };
  return (
    <div className="container">
      <div>
        <form onSubmit={addAdmin} className="white">
          <h5 className="grey-text text-darken-3 center">Add Admin</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="new-password"
              required
              onChange={event => setAdminEmail(event.target.value)}
            />
          </div>
          <div className="input-field center">
            <button className="btn green lighten-1 z-depth-0">Add Admin</button>
          </div>
          <p className=" center red-text">{adminFeedBack}</p>
        </form>
      </div>
      <div className="break"></div>
      <div>
        <form onSubmit={addRestaurantManager} className="white">
          <h5 className="grey-text text-darken-3 center">
            Add Restaurant Manager
          </h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={event => setRestaurantEmail(event.target.value)}
            />
          </div>{" "}
          <div className="input-field">
            <label htmlFor="restId">Restaurant ID</label>
            <input
              type="text"
              id="restID"
              required
              onChange={event => setRestaurantID(event.target.value)}
            />
          </div>
          <div className="input-field center">
            <button className="btn green lighten-1 z-depth-0">
              Add Restaurant Manager
            </button>
          </div>
        </form>
        <p className="red-text center">{restFeedBack}</p>
      </div>
    </div>
  );
}

export default Admin;
