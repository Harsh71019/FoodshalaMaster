import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({
  admin: { loadingAdmin, isAuthenticatedAdmin },
  auth: { loading, isAuthenticated },
}) => {
  
  if (isAuthenticatedAdmin) {
    return <Redirect to="/dashboardadmin" />;
  } else if (isAuthenticated) {
    return <Redirect to="/dashboarduser" />;
  }


  if (isAuthenticated || isAuthenticatedAdmin) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">FoodShala</h1>
          <p className="lead">
            Hungry ? why wait order food from your favorite restaurants!
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});

export default connect(mapStateToProps)(Landing);
