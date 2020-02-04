import React from "react";
import { Link } from "react-router-dom";

const LoggedOutNav = props => {
  return (
    <ul className="right">
      <li>
        <Link to="/login" className="black-text">
          Log In
        </Link>
      </li>
    </ul>
  );
};

export default LoggedOutNav;
