import React, { useState, useContext } from "react";
import Firebase from "../../firebase/firebase";
import { RestaurantListContext } from "../../contexts/RestaurantListContext";

const RestaurantList = () => {
  let entireRestList = [];

  const {
    restaurantList,
    setRestaurantList,
    isLoading,
    setIsLoading
  } = useContext(RestaurantListContext);

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
                <a href="/" className="green-text">
                  Menu
                </a>
                <a href="/" className="green-text">
                  Book
                </a>
                <a href="/" className="green-text">
                  Seated
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="loader container center"></div>;
  }
};

export default RestaurantList;
