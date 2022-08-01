/* eslint-disable no-unused-vars */
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Component } from "react";

export const ParentPrivateRoute = ({ component: Component, path, ...rest }) => {
  const state = useSelector((state) => state.auth);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (state.isLoading) {
          <h3>Loading...</h3>;
        } else if (!state.isAuthenticated && !state.isAdmin) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
