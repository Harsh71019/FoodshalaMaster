import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteAdmin = ({
  component: Component,
  admin: { loadingAdmin, isAuthenticatedAdmin },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticatedAdmin && !loadingAdmin ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRouteAdmin.propTypes = {
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
