import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import MenuOrder from "./MenuOrder";

let socket;

const Order = ({ location }) => {
  const [, setName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [restName, setRestName] = useState("");
  const [, setUid] = useState("");
  const [tableNum, setTableNum] = useState("");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const [prices] = useState([]);
  const [menuView, setMenuView] = useState(false);
  const ENDPOINT = "localhost:5000";

  let total = prices.reduce((partial_sum, a) => partial_sum + a, 0);

  useEffect(() => {
    const { restaurantId, tableNum, restName, uid, name } = queryString.parse(
      location.search
    );
    socket = io(ENDPOINT);

    setName(name);
    setRestaurantId(restaurantId);
    setRestName(restName);
    setUid(uid);
    setTableNum(tableNum);
    socket.emit("join", { uid, name, restaurantId, restName }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setOrders([...orders, message]);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [orders]);

  const sendOrder = event => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const removeMessage = event => {
    let i = event.target.value;
    let filteredArray = orders.filter(message => {
      return message !== orders[i];
    });
    setOrders(filteredArray);
  };

  const service = event => {
    event.preventDefault();
    let i = event.target.value;
    socket.emit("sendMessage", i, () => setMessage(""));
  };

  const toggleMenu = event => {
    event.preventDefault();
    setMenuView(!menuView);
  };

  let orderView = menuView ? (
    <MenuOrder
      toggleMenu={toggleMenu}
      restid={restaurantId}
      setOrders={setOrders}
      orders={orders}
    />
  ) : (
    <div className="container">
      <div>
        <h4 className="center">
          Eating at {restName} Table Number: {tableNum}{" "}
        </h4>
      </div>
      {orders.map((order, i) => (
        <div key={i}>
          <p>
            {order.item} {order.quantity} {order.price}
            <button onClick={removeMessage} value={i} className="text">
              x
            </button>
          </p>
        </div>
      ))}
      <input
        value={message}
        placeholder="Enter your order.."
        onChange={event => setMessage(event.target.value)}
      />
      <div className="center">Total: ${total}</div>
      <div className="center">
        <button
          onClick={sendOrder}
          className="btn orderButtons waves-effect waves-light green"
        >
          Send order
        </button>
        <button
          onClick={toggleMenu}
          className="btn orderButtons waves-effect waves-light green"
        >
          Menu
        </button>
        <button
          value="bill"
          onClick={service}
          className="btn orderButtons waves-effect waves-light green"
        >
          Get bill
        </button>
        <button
          value="staff"
          onClick={service}
          className="btn orderButtons waves-effect waves-light green"
        >
          Call staff
        </button>
      </div>
      <div className="center">
        <a href="/" className="btn green exit">
          Exit Order
        </a>
      </div>
    </div>
  );
  return orderView;
};

export default Order;
