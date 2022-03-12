import React from "react";
import { Redirect, Route } from "react-router-dom";

const Secured = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    ></Route>
  );
};

export default Secured;
