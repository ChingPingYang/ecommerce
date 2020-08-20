import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alertAction";

const AdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  setAlert,
  ...rest
}) => {
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setAlert("Please log-in first.");
    } else if (!loading && user.role === 0) {
      setAlert("Only Admin can access here...");
    }
  }, [setAlert, loading, isAuthenticated, user]);
  return (
    <Route
      {...rest}
      render={(props) =>
        !loading &&
        (isAuthenticated && user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        ))
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (message) => dispatch(setAlert(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);
