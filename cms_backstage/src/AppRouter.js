import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./views/Login";
import App from "./App";

export default function AppRouter() {
  const [adminInfo, setAdminInfo] = useState();
  useEffect(() => {});
  return (
    <Router>
      {adminInfo ? <Redirect to="/" /> : <Redirect to="/login" />}
      <Route path="/" exact component={App} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}
