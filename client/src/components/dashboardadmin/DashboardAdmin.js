import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentRestaurant } from "../../actions/restaurant";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashBoardActions";
import MenuItems from "./MenuItems";

const DashboardAdmin = ({
  getCurrentRestaurant,
  restaurant: { restaurant, loading },
  admin: { admin },
}) => {
  useEffect(() => {
    getCurrentRestaurant();
  }, [getCurrentRestaurant]);
  return loading && restaurant === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary"> Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {admin && admin.name}</i>
      </p>
      {restaurant !== null ? (
        <Fragment>
          <p>Your Restaurant Name: <strong>{restaurant.restaurantname}</strong></p>
          <p>Your Restaurant Type: <strong>{restaurant.restauranttype}</strong></p>
          <p>Your Restaurant Description: <strong>{restaurant.restaurantdescription}</strong></p>
          <DashboardActions />
          <MenuItems items={restaurant.item} />
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not yet setup a Restaurant Profile please create a
            Restaurant Profile to get started!
          </p>
          <Link to="/create-restaurant" className="btn btn-primary my-1">
            Create Restaurant Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

DashboardAdmin.propTypes = {
  admin: PropTypes.object.isRequired,
  restaurant: PropTypes.object.isRequired,
  getCurrentRestaurant: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, { getCurrentRestaurant })(
  DashboardAdmin
);
