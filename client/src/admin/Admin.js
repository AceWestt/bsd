import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AdminProvider } from "./context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Secured from "./routing/Secured";

const Admin = () => {
  const match = useRouteMatch();
  return (
    <AdminProvider>
      <Switch>
        <Route exact path={`${match.path}/login`} component={Login} />
        <Route
          exact
          path={`${match.path}/forgotpassword`}
          component={ForgotPassword}
        />
        <Route
          exact
          path={`${match.path}/resetpassword/:resetToken`}
          component={ResetPassword}
        />
        <Secured path={`${match.path}`} component={Home} />
      </Switch>
    </AdminProvider>
  );
};

export default Admin;
