import React from "react";
import LogIn from "../accounts/LogIn";
import { Switch, Route } from "react-router-dom";
import SignUp from "../accounts/SignUp";
import Main from "../homepage/Main";
import RestaurantListPage from "../restaurants/RestaurantListPage";
import ViewProfile from "../accounts/ViewProfile";
import RegisterRestaurant from "../restaurants/RegisterRestaurant";
import Admin from "../../admin/admin";
import Order from "../restaurants/order_components/Order";
import Menu from "../restaurants/Menu";
import NoMatch from "../homepage/NoMatch";

const Routes = user => {
  return (
    <Switch>
      <Route path="/order" component={Order}></Route>
      <Route exact path="/" component={Main}></Route>
      <Route exact path="/login" component={LogIn}></Route>
      <Route exact path="/admin" component={Admin}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/restaurants" component={RestaurantListPage}></Route>
      <Route
        exact
        path="/register-restaurant"
        component={RegisterRestaurant}
      ></Route>
      <Route path="/users/:userid" component={ViewProfile}></Route>
      <Route path="/menu/:restid" component={Menu} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default Routes;
