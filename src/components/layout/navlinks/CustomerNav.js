import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Firebase from "../../../firebase/firebase";
import { UserContext } from "../../../contexts/UserContext";

const CustomerNav = () => {
  const { currentUserId, currentUserData, setCurrentUserData } = useContext(
    UserContext
  );

  const SignOut = () => {
    Firebase.signOut();
  };
  let userData;
  Firebase.getUserData(currentUserId.uid && currentUserId.uid).then(
    response => {
      if (response.hasOwnProperty("firstName")) {
        userData = response;
        if (!currentUserData.firstName && !currentUserData.lastName) {
          setCurrentUserData({
            firstName: userData.firstName,
            lastName: userData.lastName
          });
        }
      }
    }
  );
  return (
    <ul className="right">
      <li>
        <Link to={"/users/" + currentUserId.uid} className="black-text">
          {currentUserData.firstName}
        </Link>
      </li>
      <li>
        <a href="/" onClick={SignOut} className="black-text">
          Log Out
        </a>
      </li>
    </ul>
  );
};

export default CustomerNav;
