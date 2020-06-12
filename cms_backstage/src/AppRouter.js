import React from "react";
import { BrowserRouter as Router, Route,Link  } from "react-router-dom";
import CustomHead from "./views/CustomHead";
import App from './App'

export default function AppRouter() {
  return (
    <Router>
      {/* <ul>
        <li>
          <Link to="/">首页</Link>{" "}
        </li>
        <li>
          <Link to="/list/">列表</Link>{" "}
        </li>
      </ul> */}
      <Route path="/" exact component={App} />
    </Router>
  );
}
