import React, { useState, useContext } from "react";
import Firebase from "../../firebase/firebase";
import { RestaurantListContext } from "../../contexts/RestaurantListContext";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const RestaurantList = () => {
  let entireRestList = [];

  const {
    restaurantList,
    setRestaurantList,
    isLoading,
    setIsLoading
  } = useContext(RestaurantListContext);

  const { currentUserId } = useContext(UserContext);

  Firebase.getRestaurantList().then(response => {
    if (!isLoading && response.restCollection.length > 0) {
      entireRestList = response.restCollection;
      if (restaurantList.length === 0) {
        setRestaurantList(entireRestList);
      }
    }
    if (response.loading !== isLoading) {
      setIsLoading(response.loading);
    }
    return entireRestList;
  });

  const [searchInput, setSearchInput] = useState("");
  let filteredRestList;
  if (!searchInput) {
    filteredRestList = restaurantList;
  }
  filteredRestList = restaurantList.filter(restaurant => {
    return restaurant.restName
      .toUpperCase()
      .includes(searchInput.toUpperCase());
  });
  if (!isLoading && restaurantList) {
    return (
      <div>
        <div className="input-field container searchbar">
          <label htmlFor="searchInput">Search for restaurant..</label>
          <input
            type="text"
            id="searchInput"
            onChange={event => setSearchInput(event.target.value)}
          />
        </div>
        <div className="container restPreviewContainer">
          {filteredRestList.map(restaurant => (
            <div
              key={restaurant.restUID}
              className="card sticky-action restaurantPreview"
            >
              <div className="card-image  waves-effect waves-block waves-light">
                <img
                  className="activator"
                  src={require("../../images/test.jpg")}
                  alt=""
                />
              </div>
              <div className="card-content restaurantContent">
                <span className="card-title activator">
                  {restaurant.restName}
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title activator">
                  {restaurant.restName}
                </span>
                <p>
                  {restaurant.restCuisine} Food - located at{" "}
                  {restaurant.restStreetAddress} {restaurant.restSuburb},{" "}
                  {restaurant.restPostcode}
                </p>
                <p>Contact number: {restaurant.restPhoneNumber}</p>
              </div>
              <div className="card-action center">
                <Link to={`/menu/${restaurant.restUID}`} className="green-text">
                  Menu
                </Link>
                <Link
                  to={
                    !currentUserId.uid
                      ? `/login`
                      : `/order?restaurantId=${restaurant.restUID}&restName=${restaurant.restName}&name=${currentUserId.displayName}&uid=${currentUserId.uid}`
                  }
                  className="green-text"
                >
                  Book
                </Link>
                <Link
                  to={
                    !currentUserId.uid
                      ? `/login`
                      : `/order?restaurantId=${restaurant.restUID}&restName=${restaurant.restName}&name=${currentUserId.displayName}&uid=${currentUserId.uid}`
                  }
                  className="green-text"
                >
                  Seated
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div className="loader container center"></div>;
};

export default RestaurantList;
