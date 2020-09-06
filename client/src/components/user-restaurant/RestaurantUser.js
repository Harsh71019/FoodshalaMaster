import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RestaurantCard from "./RestaurantCard";
import { getRestaurants } from "../../actions/restaurant";

const RestaurantUser = ({
  getRestaurants,
  restaurant: { loading, restaurants },
}) => {
  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);
  if (restaurants.length === 0 && !loading)
    return <div className="center">No Restaurants Found.</div>;
  return (
    <div>
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
                  <RestaurantCard
                    key={restaurant._id}
                    restaurant={restaurant}
                  />
                ))
              ) : (
                <h4> No Restaurant found...</h4>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

RestaurantUser.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, { getRestaurants })(RestaurantUser);
