import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import App from "./App";
// import ArticlePage from "./Views/ArticlePage";
// import HomeArticle from "./components/HomeArticle";
import Archives from "./Views/Archives";
// import UserInfo from './components/UserInfo'
import ReactView from "./Views/routerViews/ReactView";
import VueView from "./Views/routerViews/VueView";
import NodejsView from "./Views/routerViews/NodejsView";
import NotFound from "./Views/NotFound";
export default function AppRouter() {
  
  return (
    <Router>
      <Switch>
        {/* <Route path="/archives" component={Archives} /> */}
        {/* <Route path></Route> */}
        <Route path="/"  component={App}></Route>
        {/* <Route path="/react" exact component={ReactView} />
        <Route path="/vue" exact component={VueView} />
        <Route path="/nodejs" exact component={NodejsView} />
        <Route path="/not-found" component={NotFound} /> */}
        {/* <Route path="/index" exact component={App}></Route> */}
        {/* <Redirect from="/" to="/index"/>
        <Redirect to="/not-found"/> */}
      </Switch>
    </Router>
  );
}
