import React, { useState, useEffect, useRef } from "react";
import Firebase from "../../firebase/firebase";

let updatedRestList = [];

Firebase.getRestaurantList().then(restList => {
  restList.docs.forEach(restaurant => {
    updatedRestList = [...updatedRestList, restaurant.data()];
  });
});

const RestaurantList = () => {
  const [searchInput, setSearchInput] = useState("");
  let restList = useRef({});
  useEffect(() => {
    if (!searchInput) {
      restList.current = updatedRestList;
    }
    restList.current = updatedRestList.filter(restaurant => {
      return restaurant.restName
        .toUpperCase()
        .includes(searchInput.toUpperCase());
    });
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
        {updatedRestList.map(restaurant => (
          <div key={restaurant.restUID} className="card restaurantPreview">
            <div className="card-image">
              <img src={require("../../images/test.jpg")} alt="" />
            </div>
            <div className="card-content restaurantContent">
              <span className="card-title">{restaurant.restName}</span>
              <p>
                {restaurant.restStreetAddress} {restaurant.restSuburb}{" "}
                {restaurant.restPostcode}
              </p>
            </div>
            <div className="card-action">
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
