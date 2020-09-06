import React, { Fragment } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Register from "./components/choice/Register";
import Login from "./components/choice/Login";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminRegister";
import setAdminToken from "./utils/setAdminToken";
import setAuthToken from "./utils/setAuthToken";
import UserRegister from "./components/auth/UserRegister";
import UserLogin from "./components/auth/UserLogin";
import Restaurants from "./components/restaurants/Restaurants";
import PrivateRoute from "./components/route/PrivateRoute";
import PrivateRouteAdmin from "./components/route/PrivateRouteAdmin";
import DashboardAdmin from "./components/dashboardadmin/DashboardAdmin";
import CreateRestaurant from "./components/restaurant-form/CreateRestaurant";
import EditRestaurant from "./components/restaurant-form/EditRestaurant";
import CreateItem from "./components/restaurant-form/AddItems";
import RestaurantUser from "./components/user-restaurant/RestaurantUser";
import Meals from "./components/menuitem/Meals";
import AdminOrder from "./components/admin-order/AdminOrder";
import UserOrder from "./components//user-order/UserOrder";

if (localStorage.admintoken) {
  setAdminToken(localStorage.admintoken);
}

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/adminlogin" component={AdminLogin} />
              <Route exact path="/adminregister" component={AdminRegister} />
              <Route exact path="/userlogin" component={UserLogin} />
              <Route exact path="/userregister" component={UserRegister} />
              <Route exact path="/restaurants" component={Restaurants} />

              {/* ////////////////////////////Admin Routes/////////////////////////////////////////// */}

              <PrivateRouteAdmin
                exact
                path="/dashboardadmin"
                component={DashboardAdmin}
              />
              <PrivateRouteAdmin
                exact
                path="/create-restaurant"
                component={CreateRestaurant}
              />
              <PrivateRouteAdmin
                exact
                path="/edit-restaurant"
                component={EditRestaurant}
              />
              <PrivateRouteAdmin
                exact
                path="/create-menu"
                component={CreateItem}
              />
              <PrivateRouteAdmin
                exact
                path="/adminorder"
                component={AdminOrder}
              />

              {/* ////////////////////////////User Routes/////////////////////////////////////////// */}

              <PrivateRoute
                exact
                path="/restaurant-view"
                component={RestaurantUser}
              />

              <PrivateRoute exact path="/menu/admin/:id" component={Meals} />
              <PrivateRoute exact path="/userorder" component={UserOrder} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
