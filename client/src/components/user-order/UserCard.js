import React, { useState } from "react";
import PropTypes from "prop-types";
const UserCard = ({ order, amount, placed, index }) => {
  const [meal, setMeal] = useState();

  return (
    <div>
      {order},{amount}
    </div>
  );
};

UserCard.propTypes = {};

export default UserCard;

// var json = JSON.stringify(myObject, ['today', 'obj', 'min', 'max', 're'] );
// console.log(json);
