import React, { useContext } from "react";
import ProfileData from "./ProfileData";
import { UserContext } from "../../contexts/UserContext";
import Firebase from "../../firebase/firebase";

const ViewProfile = () => {
  const {
    currentUserId,
    currentUserData,
    setCurrentUserData,
    isLoading,
    setIsLoading
  } = useContext(UserContext);

  let userData;
  Firebase.getUserData(currentUserId.uid).then(response => {
    if (isLoading !== response.loading) {
      setIsLoading(response.loading);
    }
    if (response.userData.hasOwnProperty("firstName")) {
      userData = response.userData;
      if (!currentUserData.firstName && !currentUserData.lastName) {
        setCurrentUserData({
          firstName: userData.firstName,
          lastName: userData.lastName
        });
      }
    }
  });

  return (
    <div>
      <ProfileData />
    </div>
  );
};

export default ViewProfile;
