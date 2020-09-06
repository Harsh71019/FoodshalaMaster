import * as PropTypes from "prop-types";
import React from "react";
import "./menu-items.css";

export function MealCard(props) {
  const {
    onItemAdd,
    meal: { description, name, price, total },
    onItemRemove,
  } = props;
  return (
    <div>
      <div>
        <div>
          <span>
            {name} - ₹{price}
          </span>
          <p>{description}</p>
        </div>
        <div>
          <a>
            <i onClick={onItemAdd} className="fas fa-plus-circle">add</i>
            {total || 0}
            <i className="fas fa-minus-circle" onClick={onItemRemove}>remove</i>
          </a>
        </div>
      </div>
    </div>
  );
}

MealCard.propTypes = {
  meal: PropTypes.any,
  onItemAdd: PropTypes.func,
  onItemRemove: PropTypes.func,
};
