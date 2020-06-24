import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import App from "./App";
import ArtclePage from "./Views/ArticlePage";
// import HomeArticle from "./components/HomeArticle";
import Archives from "./Views/Archives";
// import UserInfo from './components/UserInfo'
import ReactView from './Views/routerViews/ReactView'
import VueView from './Views/routerViews/VueView'
import NodejsView from './Views/routerViews/NodejsView'
import NotFound from './Views/NotFound'
export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/archives" component={Archives} />
        <Route exact path="/artclePage" component={ArtclePage} />
        <Route exact path="/react" component={ReactView}/>
        <Route exact path="/vue" component={VueView}/>
        <Route exact path="/nodejs" component={NodejsView}/>
        <Route exact path="/notFound" component={NotFound}/>
        <Redirect to="/notFound"/>
      </Switch>
    </Router>
  );
}
