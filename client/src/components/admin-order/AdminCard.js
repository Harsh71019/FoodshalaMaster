import React, { useState } from "react";
import PropTypes from "prop-types";
const AdminCard = ({ order, amount, placed, index }) => {
  const [meal, setMeal] = useState()

  return (
    <div>
     {order},{amount}
    </div>
  );
};

AdminCard.propTypes = {};

export default AdminCard;
