import React, { useState } from "react";
import PropTypes from "prop-types";
const AdminCard = ({ order, amount, placed, index }) => {
  const [meal, setMeal] = useState();

  return (
    <div>
      <strong>
        {index}.|| UserName:|| Ordered Items:{order},|| Total Payable:₹{amount},
      </strong>
    </div>
  );
};

AdminCard.propTypes = {};

export default AdminCard;
