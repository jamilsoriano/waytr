import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CustomerNav from "./navlinks/CustomerNav";
import LoggedOutNav from "./navlinks/LoggedOutNav";
import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const { currentUserId } = useContext(UserContext);

  let updatedLinks;
  if (currentUserId.uid) {
    updatedLinks = <CustomerNav />;
  } else {
    updatedLinks = <LoggedOutNav />;
  }
  return (
    <nav className="nav-wrapper green lighten-3">
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
