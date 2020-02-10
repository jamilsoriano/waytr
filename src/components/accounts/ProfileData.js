import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const ProfileData = () => {
  const { currentUserData, isLoading } = useContext(UserContext);
  const { firstName, lastName } = currentUserData;
  if (!isLoading) {
    return (
      <div className="container center">
        <h2>
          Welcome {firstName} {lastName}!
        </h2>
      </div>
    );
  } else {
    return <div className="loader container center"></div>;
  }
};

export default ProfileData;
