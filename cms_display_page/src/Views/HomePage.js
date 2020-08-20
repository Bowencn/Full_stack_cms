import React from "react";
import {
  Route,
  Switch,
} from "react-router-dom";
import Header from "../components/Header";
import ContentPage from "../components/Content";
import ArticlePage from "./ArticlePage";
import { Layout} from "antd";
const { Content } = Layout;
export default function HomePage(props) {
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
