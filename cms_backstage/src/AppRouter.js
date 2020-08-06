import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./views/Login";
import App from "./App";

export default function AppRouter() {
  const [adminInfo, setAdminInfo] = useState(
    window.localStorage.getItem("user-id")
  );
  useEffect(() => {
    console.log(adminInfo);
    // adminInfo ? props.history.push("/") : props.history.push("/login");

    let userIdCache = window.localStorage.getItem("user-id");
    // if (userIdCache) {
    //   setAdminInfo(true);
    // } else {
    //   setAdminInfo(false);
    // }
  });
  return (
    <Router>
      {/* <Route
        path="/"
        render={(props) => {
          console.log(props);
          if (adminInfo) {
            console.log(1);
            return <App {...props} />;
          } else {
            return <Redirect to="/login" />;
            // <Login {...props}/>
          }
        }}
      /> */}
      {adminInfo ? <Redirect to="/" /> : <Redirect to="/login" />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}
