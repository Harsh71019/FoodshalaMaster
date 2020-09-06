import React from "react";
import "./Choice.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Register = ({
  admin: { loadingAdmin, isAuthenticatedAdmin },
  auth: { loading, isAuthenticated },
}) => {
  if (isAuthenticatedAdmin) {
    return <Redirect to="/dashboardadmin" />;
  } else if (isAuthenticated) {
    return <Redirect to="/dashboarduser" />;
  }
  return (
    <div>
      <div className="center">
        <div className="buttons">
          <Link to="/userregister">
            <button className="btn btn-primary"> Sign-Up as User </button>
          </Link>

          <Link to="/adminregister">
            <button className="btn btn-light"> Sign-Up as Admin </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});

export default connect(mapStateToProps)(Register);
