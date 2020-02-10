import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [currentUserId, setCurrentUserId] = useState({
    uid: null,
    admin: false
  });
  const [currentUserData, setCurrentUserData] = useState({
    firstName: "",
    lastName: ""
  });

  const [isLoading, setIsLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,
        currentUserData,
        setCurrentUserData,
        isLoading,
        setIsLoading
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
