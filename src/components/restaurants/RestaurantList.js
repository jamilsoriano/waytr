import React, { useState } from "react";
import Firebase from "../../firebase/firebase";

let entireRestList = [];

Firebase.getRestaurantList().then(restList => {
  restList.docs.forEach(restaurant => {
    entireRestList = [...entireRestList, restaurant.data()];
  });
});

const RestaurantList = () => {
  const [searchInput, setSearchInput] = useState("");
  let filteredRestList;
  if (!searchInput) {
    filteredRestList = entireRestList;
  }
  filteredRestList = entireRestList.filter(restaurant => {
    return restaurant.restName
      .toUpperCase()
      .includes(searchInput.toUpperCase());
  });
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
};

export default RestaurantList;
