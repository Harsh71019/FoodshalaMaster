import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { getRestaurants } from "../../actions/restaurant";
import RestaurantItem from "./RestaurantItem";
import "./Restaurant.css";

const Restaurants = ({
  getRestaurants,
  restaurant: { loading, restaurants },
}) => {
  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary"> Restaurants </h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>
            Browse and Order with our large collections of restaurants!
          </p>
          <div className="res-name">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <RestaurantItem key={restaurant._id} restaurant={restaurant} />
              ))
            ) : (
              <h4> No Restaurant found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Restaurants.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, { getRestaurants })(Restaurants);
