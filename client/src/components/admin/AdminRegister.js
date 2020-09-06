import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerAdmin } from "../../actions/admin";
import { setAlert } from "../../actions/alert";

const AdminRegister = ({
  registerAdmin,
  admin: { loadingAdmin, isAuthenticatedAdmin },
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",  
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      registerAdmin({ name, email, password });
    }
  };

  if (isAuthenticatedAdmin) {
    return <Redirect to="/dashboardadmin" />;
  }

  return (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Sign Up as Admin</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account as Admin
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => onChange(e)}
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
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
        <div className="form-group">
          <input
            value={password2}
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/adminlogin">Sign In</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

registerAdmin.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { registerAdmin })(AdminRegister);
