import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutAdmin } from "../../actions/admin";
import { logout } from "../../actions/auth";
const Navbar = ({
  logout,
  logoutAdmin,
  admin: { loadingAdmin, isAuthenticatedAdmin },
  auth: { loading, isAuthenticated },
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/restaurant-view">Order from Restaurants</Link>
      </li>
      <li>
        <Link to="/userorder">Your Orders</Link>
      </li>

      <li>
        <Link to="/userlogin">
          <a onClick={logout} href="!#">
            <i className="fas fa-sign-out-alt"></i>
            {""} <span className="hide-sm">Logout</span>
          </a>
        </Link>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul>
      <li>
        <Link to="/adminorder">Customer Orders</Link>
      </li>
      <li>
        <Link to="/dashboardadmin">
          {" "}
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/adminlogin">
          <a href="!#" onClick={logoutAdmin}>
            <i className="fas fa-sign-out-alt"></i>
            {""} <span className="hide-sm">Logout</span>
          </a>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/restaurants">Restaurants</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-heart"></i> Foodshala
        </Link>
      </h1>

      {(() => {
        if (!loading && isAuthenticated) {
          return <Fragment>{authLinks}</Fragment>;
        } else if (!loadingAdmin && isAuthenticatedAdmin) {
          return <Fragment>{adminLinks}</Fragment>;
        } else {
          return <Fragment>{guestLinks}</Fragment>;
        }
      })()}
      {/* 
      {!loadingAdmin && (
        <Fragment>{isAuthenticatedAdmin ? adminLinks : guestLinks}</Fragment>
      )}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )} */}
    </nav>
  );
};

Navbar.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutAdmin, logout })(Navbar);
