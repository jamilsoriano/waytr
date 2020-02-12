import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Order = ({ location }) => {
  const [, setName] = useState("");
  const [, setRestaurantId] = useState("");
  const [restName, setRestName] = useState("");
  const [, setUid] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { restaurantId, restName, uid, name } = queryString.parse(
      location.search
    );
    socket = io(ENDPOINT);

    setName(name);
    setRestaurantId(restaurantId);
    setRestName(restName);
    setUid(uid);
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

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="container">
      <div>
        <h4 className="center">Eating at {restName}</h4>
      </div>
      {messages.map((message, i) => (
        <div key={i}>
          <p>
            {message.text} - {message.user}
          </p>
        </div>
      ))}
      <form onSubmit={sendMessage}>
        <input
          value={message}
          placeholder="Enter your order.."
          onChange={event => setMessage(event.target.value)}
        />
      </form>
      <div className="center">
        <a href="/" className="btn green">
          Exit Order
        </a>
      </div>
    </div>
  );
};

export default Order;
