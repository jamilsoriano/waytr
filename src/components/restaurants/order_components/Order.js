import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import MenuOrder from "./MenuOrder";
import Firebase from "../../../firebase/firebase";

let socket;

const Order = ({ location }) => {
  const [, setName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [restName, setRestName] = useState("");
  const [uid, setUid] = useState("");
  const [tableNum, setTableNum] = useState("");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const [menuView, setMenuView] = useState(false);
  const ENDPOINT = "localhost:5000";

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
    socket.emit(
      "join",
      { uid, name, restaurantId, restName, tableNum },
      () => {}
    );

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      console.log("staff has been notified");
    });
    socket.on("order", order => {
      setOrders(order);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [orders]);

  const sendOrder = event => {
    event.preventDefault();
    if (orders.length > 0) {
      Firebase.sendOrder({
        orders,
        restaurantId,
        restName,
        tableNum,
        uid,
        orderDateTime: new Date()
      }).then(() => {
        setOrders([]);
      });
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const removeMessage = event => {
    let i = event.target.value;
    let updatedOrders = orders.filter(order => {
      return order !== orders[i];
    });
    setOrders(updatedOrders);
    socket.emit("sendTempOrder", updatedOrders, () => {});
  };

  const service = event => {
    event.preventDefault();
    let i = event.target.value;
    socket.emit("staffRequest", i, () => setMessage(""));
  };

  const toggleMenu = event => {
    event.preventDefault();
    setMenuView(!menuView);
  };

  var total = 0.0;
  orders.map(order => (total = total + order.price * order.quantity));

  let orderView = menuView ? (
    <MenuOrder
      toggleMenu={toggleMenu}
      restid={restaurantId}
      orders={orders}
      socket={socket}
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
            x{order.quantity} | ${order.price} | {order.item}
            <button onClick={removeMessage} value={i} className="text">
              x
            </button>
          </p>
        </div>
      ))}
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
