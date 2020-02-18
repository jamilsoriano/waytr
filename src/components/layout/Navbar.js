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
    <div className="navbar-fixed">
      <nav className="nav-wrapper white lighten-2 z-depth-0">
        <div className="container">
          <Link to="/" className="brand-logo center black-text">
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
    </div>
  );
};

export default Navbar;
