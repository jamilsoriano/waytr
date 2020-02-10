import React, { useState } from "react";
import Firebase from "../firebase/firebase";

function Admin() {
  const [adminEmail, setAdminEmail] = useState("");

  const addAdmin = event => {
    event.preventDefault();
    const addAdminRole = Firebase.functions.httpsCallable("addAdminRole");
    addAdminRole({ email: adminEmail }).then(result => {
      console.log(result);
    });
  };

  return (
    <div className="container">
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
      </form>
    </div>
  );
}

export default Admin;
