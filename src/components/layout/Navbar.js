import React from "react";
import { Link } from "react-router-dom";
import CustomerNav from "./navlinks/CustomerNav";
import LoggedOutNav from "./navlinks/LoggedOutNav";

const Navbar = user => {
  let updatedLinks;
  if (user.user) {
    updatedLinks = <CustomerNav user={user.user} />;
  } else {
    updatedLinks = <LoggedOutNav />;
  }
  return (
    <nav className="nav-wrapper red lighten-2">
      <div className="container">
        <Link to="/" className="brand-logo left black-text">
          WAYTR
        </Link>
      </div>
      <div>
        <ul className="right">
          <li>
            <Link to="/restaurants" className="black-text restaurantNav">
              Restaurants
            </Link>
          </li>
          {updatedLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
