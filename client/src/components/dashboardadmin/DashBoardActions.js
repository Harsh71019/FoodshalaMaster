import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-restaurant" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Restaurant
        Profile
      </Link>
      <Link to="/create-menu" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Menu Items
      </Link>
    </div>
  );
};

export default DashboardActions;
