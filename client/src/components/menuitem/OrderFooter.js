import * as PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
export function OrderFooter(props) {
  const { disabled, onSubmit, orderTotal } = props;
  return (
    <div>
      <div>
        <a className=" btn">
          Order Total: {orderTotal ? `₹${orderTotal}` : 0}
        </a>
      </div>
      {orderTotal > 0 && (
        <button
          className={`btn waves-effect waves-light ${
            disabled ? "disabled" : null
          }`}
          type="submit"
          name="action"
          onClick={onSubmit}
        >
          Order Now{"  "}
          <i
            className="fas fa-paper-plane">
            {" "}
            send
          </i>
        </button>
      )}
    </div>
  );
}

OrderFooter.propTypes = {
  orderTotal: PropTypes.any,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
};
