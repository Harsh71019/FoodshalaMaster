import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Restaurant.css";
const RestaurantCard = ({
  restaurant: { _id, restaurantname, restauranttype, restaurantdescription,admin },
}) => {
  return (
    <div>
      <div className="main">
        <div className="card">
          <div className="container">
            <h2>
              <b> {restaurantname}</b>
            </h2>
            <p> {restauranttype}</p>
            <p>{restaurantdescription}</p>
            <button className="btn btn-light position-button">
              <Link to={`/menu/admin/${admin}`}>Order Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default RestaurantCard;
