import React, { useState } from "react";
import Firebase from "../../firebase/firebase";

const Menu = props => {
  const restid = props.match.params.restid;
  const [isLoading, setIsLoading] = useState(true);
  const [menuData, setMenuData] = useState();

  Firebase.getRestaurantMenu(restid)
    .then(response => {
      if (isLoading !== response.loading) {
        setIsLoading(response.loading);
      }
      if (!isLoading && !menuData) {
        setMenuData(response.menu);
      }
    })
    .catch(error => console.log(error));
  console.log(menuData);
  if (!isLoading && menuData) {
    return (
      <div className="container center">
        <h4>Menu of {menuData.restName}</h4>
        <div className="card">
          {menuData.items.map(item => (
            <div key={menuData.items.indexOf(item)}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div className="loader container center"></div>;
};

export default Menu;
