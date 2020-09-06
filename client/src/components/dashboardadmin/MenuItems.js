import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteItems } from "../../actions/restaurant";

const MenuItems = ({ deleteItems, items }) => {
  const itemMenu = items.map((item) => (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.description}</td>
      <td>
        <button
          onClick={() => deleteItems(item._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Menu Items </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hide-sm">Price</th>
            <th className="hide-sm">Description</th>
            <th />
          </tr>
        </thead>
        <tbody>{itemMenu}</tbody>
      </table>
    </Fragment>
  );
};

MenuItems.propTypes = {
  deleteItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default connect(null, { deleteItems })(MenuItems);
