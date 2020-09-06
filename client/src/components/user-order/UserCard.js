import React, { useState } from "react";
import PropTypes from "prop-types";
const UserCard = ({ order, amount, resname, index }) => {
  return (
    <div>
      <strong>
        {" "}
        {index}.|| Restaurant Name:{resname}|| Ordered Items:{order},|| Total
        Payable:₹{amount},
      </strong>
    </div>
  );
};

UserCard.propTypes = {};

export default UserCard;

// var json = JSON.stringify(myObject, ['today', 'obj', 'min', 'max', 're'] );
// console.log(json);
