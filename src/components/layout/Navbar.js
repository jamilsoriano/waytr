import React from "react";
import { Link } from "react-router-dom";
import CustomerNav from "./navlinks/CustomerNav";
import LoggedOutNav from "./navlinks/LoggedOutNav";
import RestaurantNav from "./navlinks/RestaurantNav";

const Navbar = user => {
  let updatedLinks;
  if (user.user) {
    updatedLinks = user.user.restaurantManager ? (
      <RestaurantNav user={user.user} />
    ) : (
      <ul>
        {" "}
        <li>
          <Link to="/restaurants" className="black-text restaurantNav">
            Restaurants
          </Link>
        </li>
        <CustomerNav user={user.user} />
      </ul>
    );
  } else {
    updatedLinks = (
      <ul>
        {" "}
        <li>
          <Link to="/restaurants" className="black-text restaurantNav">
            Restaurants
          </Link>
        </li>
        <LoggedOutNav />
      </ul>
    );
  }
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper z-depth-0">
        <div className="container">
          <Link to="/" className="brand-logo left black-text">
            WAYTR
          </Link>
        </div>
        <div>
          <ul className="right">{updatedLinks}</ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
