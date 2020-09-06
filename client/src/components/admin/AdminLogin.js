import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginAdmin } from "../../actions/admin";

const AdminLogin = ({ loginAdmin, isAuthenticatedAdmin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    loginAdmin(email, password);
  };

  // Redirected if logged in

  if (isAuthenticatedAdmin) {
    return <Redirect to="/dashboardadmin" />;
  }
  return (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Login Admin</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login Into Your Account as Admin
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/adminregister">Sign Up</Link>
      </p>{" "}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticatedAdmin: state.admin.isAuthenticatedAdmin,
});

AdminLogin.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  isAuthenticatedAdmin: PropTypes.bool,
};

export default connect(mapStateToProps, { loginAdmin })(AdminLogin);
