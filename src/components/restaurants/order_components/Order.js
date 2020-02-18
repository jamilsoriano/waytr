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
  const [messages, setMessages] = useState([]);
  const [prices, setPrices] = useState([]);
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
      setMessages([...messages, message]);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages]);

  const sendOrder = event => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const removeMessage = event => {
    let i = event.target.value;
    let filteredArray = messages.filter(message => {
      return message !== messages[i];
    });
    setMessages(filteredArray);
  };

  const callStaff = event => {
    event.preventDefault();
    let i = "staff";
    socket.emit("sendMessage", i, () => setMessage(""));
  };

  const getBill = event => {
    event.preventDefault();
    let i = "bill";
    socket.emit("sendMessage", i, () => setMessage(""));
  };

  const toggleMenu = event => {
    event.preventDefault();
    setMenuView(!menuView);
  };

  let orderView = menuView ? (
    <MenuOrder toggleMenu={toggleMenu} restid={restaurantId} />
  ) : (
    <div className="container">
      <div>
        <h4 className="center">
          Eating at {restName} Table Number: {tableNum}{" "}
        </h4>
      </div>
      {messages.map((message, i) => (
        <div key={i}>
          <p>
            {message.text} - {message.user}{" "}
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
      <div className="center">Total: {total}</div>
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
          onClick={getBill}
          className="btn orderButtons waves-effect waves-light green"
        >
          Get bill
        </button>
        <button
          onClick={callStaff}
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
