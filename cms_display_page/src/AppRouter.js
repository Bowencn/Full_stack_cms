import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import App from "./App";
import ArtclePage from "./Views/ArticlePage";
import HomeArticle from "./components/HomeArticle";
import Archives from "./Views/Archives";
import UserInfo from './components/UserInfo'
export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/archives" component={Archives} />
        <Route exact path="/artclePage" component={ArtclePage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
