import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createRestaurant } from "../../actions/restaurant";

const CreateRestaurant = ({ createRestaurant, history }) => {
  const [formData, setFormData] = useState({
    restaurantname: "",
    restaurantdescription: "",
    restauranttype: "",
  });

  const { restaurantname, restaurantdescription, restauranttype } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createRestaurant(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Restaurant</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        Restaurant stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group"></div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Restaurant Name"
            name="restaurantname"
            value={restaurantname}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Restaurant Type"
            value={restauranttype}
            onChange={(e) => onChange(e)}
            name="restauranttype"
          />
          <small className="form-text">
            What Cuisine Do You Serve!
          </small>
        </div>
        <div className="form-group">
          <input
            value={restaurantdescription}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Short Restaurant Description"
            name="restaurantdescription"
          />
          <small className="form-text">
            Give us an idea of your Restaurant!
          </small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboardadmin">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateRestaurant.propTypes = {
  createRestaurant: PropTypes.func.isRequired,
};

export default connect(null, { createRestaurant })(
  withRouter(CreateRestaurant)
);
