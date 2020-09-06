import React from "react";
const AdminCard = ({ order, amount, placed, index }) => {

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
