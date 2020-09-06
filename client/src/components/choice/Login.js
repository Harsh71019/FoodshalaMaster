import React from "react";
import "./Choice.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Login = ({
  admin: { loadingAdmin, isAuthenticatedAdmin },
  auth: { loading, isAuthenticated },
}) => {
  if (isAuthenticatedAdmin) {
    return <Redirect to="/dashboardadmin" />;
  } else if (isAuthenticated) {
    return <Redirect to="/dashboarduser" />;
  }

  return (
    <div className="center">
      <Link to="/userlogin">
        <button className="btn btn-primary"> Login as User </button>
      </Link>

      <Link to="/adminlogin">
        <button className="btn btn-light"> Login as Admin </button>
      </Link>
    </div>
  );
};

Login.propTypes = {
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});

export default connect(mapStateToProps)(Login);
