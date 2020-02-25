import React, { createContext, useState } from "react";

export const RestaurantInfoContext = createContext();

const RestaurantInfoContextProvider = props => {
  const [restData, setRestData] = useState({});
  const [restDocId, setRestDocId] = useState("");

  return (
    <RestaurantInfoContext.Provider
      value={{ restData, setRestData, restDocId, setRestDocId }}
    >
      {props.children}
    </RestaurantInfoContext.Provider>
  );
};

export default RestaurantInfoContextProvider;
