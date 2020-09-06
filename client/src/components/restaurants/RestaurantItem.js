import React from "react";
import PropTypes from "prop-types";
import "./Restaurant.css";

const RestaurantItem = ({ restaurant }) => {
  return (
    <div className="card">
      <div className="container">
        <h2>
          <b> {restaurant.restaurantname}</b>
        </h2>
        <h4>Cuisine: {restaurant.restauranttype}</h4>
        <p>{restaurant.restaurantdescription}</p>
      </div>
    </div>
  );
};

RestaurantItem.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default RestaurantItem;
