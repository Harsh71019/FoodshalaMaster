import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItems } from "../../actions/restaurant";
import { withRouter, Link } from "react-router-dom";

const AddItems = ({ addItems, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    isveg: "",
  });
  const { name, price, description, isveg } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Menu Item</h1>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addItems(formData, history);
        }}
      >
        <div className="form-group">
          <input
            value={name}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Name of Dish to be added to menu!"
            name="name"
            required
          />
        </div>

        <div className="form-group">
          <input
            value={price}
            onChange={(e) => onChange(e)}
            type="number"
            placeholder="* Please Enter Price of Dish"
            name="price"
            required
          />
        </div>

        <div className="form-group">
          <input
            value={description}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Please Enter the Description of the Dish"
            name="description"
          />
        </div>

        <div className="form-group">
          <input
            value={isveg}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Please Enter the whether the dish is Veg or Non-Veg"
            name="isveg"
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboardadmin">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddItems.propTypes = {
  addItems: PropTypes.func.isRequired,
};

export default connect(null, { addItems })(withRouter(AddItems));
