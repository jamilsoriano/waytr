import React, { useState } from "react";
import Firebase from "../../firebase/firebase";

let updatedRestList = [];

Firebase.getRestaurantList().then(restList => {
  restList.docs.forEach(restaurant => {
    updatedRestList = [...updatedRestList, restaurant.data()];
  });
});

const RestaurantList = () => {
  const [searchInput, setSearchInput] = useState("");
  let restList;
  if (!searchInput) {
    restList = updatedRestList;
  }
  restList = updatedRestList.filter(restaurant => {
    return restaurant.restName
      .toUpperCase()
      .includes(searchInput.toUpperCase());
  });
  console.log(restList);

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
        {restList.map(restaurant => (
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
