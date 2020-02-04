import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const ViewProfile = () => {
  const { currentUserData } = useContext(UserContext);
  const { firstName, lastName } = currentUserData;
  return (
    <div className="container center motto">
      <h2>
        Welcome {firstName} {lastName}! :)
      </h2>
    </div>
  );
};

export default ViewProfile;
