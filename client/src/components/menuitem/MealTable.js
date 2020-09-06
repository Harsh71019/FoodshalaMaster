import * as PropTypes from "prop-types";
import React from "react";

export function MealTable(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th className="hide-sm">Price</th>
          <th className="hide-sm">Description</th>
          <th />
        </tr>
      </thead>
      <tbody>{props.meals.map(props.render)}</tbody>{" "}
    </table>
  );
}

MealTable.propTypes = {
  meals: PropTypes.any,
  render: PropTypes.func,
};
