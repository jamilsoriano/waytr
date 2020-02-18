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

  if (!isLoading && menuData) {
    if (Object.keys(menuData).length > 0) {
      return (
        <div className="container center">
          <h4>Menu of {menuData.restName}</h4>
          <div className="card">
            {menuData.items.map(item => (
              <div key={menuData.items.indexOf(item)} className="card-content">
                <p>{menuData.items[menuData.items.indexOf(item)]}</p>
                <p>{menuData.descriptions[menuData.items.indexOf(item)]}</p>
                <p>${menuData.prices[menuData.items.indexOf(item)]}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="container center">
        <h3>Error 404: Unable to find restaurant/menu</h3>
      </div>
    );
  }
  return <div className="loader container center"></div>;
};

export default Menu;
