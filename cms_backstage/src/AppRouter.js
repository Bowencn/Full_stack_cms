import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./views/Login";
import App from "./App";

export default function AppRouter() {
  const [adminInfo] = useState(window.localStorage.getItem("user_info"));
  return (
    <Router>
      {!adminInfo && <Redirect to="/login" />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}
