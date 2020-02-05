import React from "react";
import { Link } from "react-router-dom";

const LoggedOutNav = () => {
  return (
    <li>
      <Link to="/login" className="black-text">
        Log In
      </Link>
    </li>
  );
};

export default LoggedOutNav;
