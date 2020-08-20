import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "../components/Header";
import ContentPage from "../components/Content";
import ArticlePage from "./ArticlePage";
import { Layout, Row, Col, BackTop } from "antd";
const { Content, Footer } = Layout;
export default function HomePage(props) {
  console.log(props);
  return (
    <>
      <Header />
      <Content style={{ padding: "30px 0" }}>
        <Switch>
          <Route path="/index" exact component={ContentPage} />
          <Route
            exact
            path={`${props.match.url}/artcle-page/:articleId`}
            component={ArticlePage}
          />
        </Switch>
      </Content>
    </>
  );
}
