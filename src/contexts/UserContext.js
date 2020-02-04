import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [currentUserId, setCurrentUserId] = useState({
    uid: null
  });
  const [currentUserData, setCurrentUserData] = useState({
    firstName: "",
    lastName: ""
  });

  return (
    <UserContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,
        currentUserData,
        setCurrentUserData
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
