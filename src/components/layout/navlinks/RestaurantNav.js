import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Firebase from "../../../firebase/firebase";
import { RestaurantInfoContext } from "../../../contexts/RestaurantInfoContext";

const RestaurantNav = user => {
  const { restData, setRestData, setRestDocId } = useContext(
    RestaurantInfoContext
  );
  const SignOut = () => {
    Firebase.signOut();
  };
  useEffect(() => {
    Firebase.db
      .collection("restaurants")
      .where("restUID", "==", user.user.restaurantManager)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(restaurant => {
          setRestData(restaurant.doc.data());
          setRestDocId(restaurant.doc.id);
        });
      });
  }, [setRestData, user.user.restaurantManager, setRestDocId]);

  if (restData.restName) {
    return (
      <ul className="right">
        <li>
          <Link
            to={"/manage_restaurants/" + user.user.restaurantManager}
            className="black-text"
          >
            {restData.restName}
          </Link>
        </li>
        <li>
          <Link to={"/users/" + user.user.uid} className="black-text">
            {user.user.displayName}
          </Link>
        </li>
        <li>
          <a href="/" onClick={SignOut} className="black-text">
            Log Out
          </a>
        </li>
      </ul>
    );
  } else {
    return (
      <ul>
        <li>
          <p className="black-text">Loading...</p>
        </li>
      </ul>
    );
  }
};

export default RestaurantNav;
