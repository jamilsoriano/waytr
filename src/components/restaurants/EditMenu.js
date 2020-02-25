import React, { useState, useContext } from "react";
import Firebase from "../../firebase/firebase";
import { RestaurantInfoContext } from "../../contexts/RestaurantInfoContext";

const EditMenu = props => {
  const { restData } = useContext(RestaurantInfoContext);
  const restid = props.match.params.restaurantId;
  const [isLoading, setIsLoading] = useState(true);
  const [newMenuData, setNewMenuData] = useState({
    allergens: [],
    category: [],
    descriptions: [],
    items: [],
    prices: []
  });
  console.log(restData);
  Firebase.getRestaurantMenu(restid)
    .then(response => {
      if (isLoading !== response.loading) {
        setIsLoading(response.loading);
      }
      if (
        !isLoading &&
        newMenuData.items.length === 0 &&
        response.menu.hasOwnProperty("items")
      ) {
        setNewMenuData(response.menu);
      }
    })
    .catch(error => console.log(error));

  const AddNewItem = () => {
    setNewMenuData({
      allergens: [...newMenuData.allergens, ""],
      category: [...newMenuData.category, ""],
      descriptions: [...newMenuData.descriptions, ""],
      items: [...newMenuData.items, ""],
      prices: [...newMenuData.prices, ""]
    });
  };

  const SaveChanges = () => {
    Firebase.db
      .collection("menu")
      .doc(restid)
      .update({
        allergens: newMenuData.allergens,
        category: newMenuData.category,
        descriptions: newMenuData.descriptions,
        items: newMenuData.items,
        prices: newMenuData.prices,
        restName: restData.restName
      });
    props.history.push("/manage_restaurants/" + restid);
  };

  const DeleteItem = i => {
    let removedMenu = newMenuData;
    removedMenu.allergens.splice(i, 1);
    removedMenu.category.splice(i, 1);
    removedMenu.descriptions.splice(i, 1);
    removedMenu.items.splice(i, 1);
    removedMenu.prices.splice(i, 1);
    setNewMenuData(removedMenu);
    SaveChanges();
  };

  if (!isLoading && newMenuData) {
    return (
      <div className=" container center">
        <table className="centered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Price ($)</th>
              <th>Categories</th>
              <th>Allergens</th>
            </tr>
          </thead>
          <tbody>
            {newMenuData.items.map((item, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    required
                    defaultValue={newMenuData.items[i]}
                    onChange={event => {
                      let item = newMenuData.items;
                      item.splice(i, 1, event.target.value);
                      setNewMenuData({
                        ...newMenuData,
                        items: item
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    required
                    defaultValue={newMenuData.descriptions[i]}
                    onChange={event => {
                      let descriptions = newMenuData.descriptions;
                      descriptions.splice(i, 1, event.target.value);
                      setNewMenuData({
                        ...newMenuData,
                        descriptions
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    required
                    defaultValue={newMenuData.prices[i]}
                    onChange={event => {
                      let prices = newMenuData.prices;
                      prices.splice(i, 1, event.target.value);
                      setNewMenuData({
                        ...newMenuData,
                        prices
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    required
                    defaultValue={newMenuData.category[i]}
                    onChange={event => {
                      let category = newMenuData.category;
                      category.splice(i, 1, event.target.value);
                      setNewMenuData({
                        ...newMenuData,
                        category
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    required
                    defaultValue={newMenuData.allergens[i]}
                    onChange={event => {
                      let allergens = newMenuData.allergens;
                      allergens.splice(i, 1, event.target.value);
                      setNewMenuData({
                        ...newMenuData,
                        allergens
                      });
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => DeleteItem(i)}
                    className="btn-small green"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={AddNewItem} className="btn green orderButtons">
          Add New Item
        </button>
        <button onClick={SaveChanges} className="btn green orderButtons">
          Save Changes
        </button>
      </div>
    );
  } else {
    return <div className="loader container center"></div>;
  }
};

export default EditMenu;
