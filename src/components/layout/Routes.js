import React from "react";
import LogIn from "../accounts/LogIn";
import { Switch, Route } from "react-router-dom";
import SignUp from "../accounts/SignUp";
import Main from "../homepage/Main";
import RestaurantList from "../restaurants/RestaurantList";
import ViewProfile from "../accounts/ViewProfile";
import RegisterRestaurant from "../restaurants/RegisterRestaurant";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main}></Route>
      <Route exact path="/login" component={LogIn}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/restaurants" component={RestaurantList}></Route>
      <Route path="/register-restaurant" component={RegisterRestaurant}></Route>
      <Route path="/users/:userid" component={ViewProfile}></Route>
    </Switch>
  );
};

export default Routes;
