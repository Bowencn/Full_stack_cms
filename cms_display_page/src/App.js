import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Layout, Row, Col, BackTop } from "antd";
import Icon from "@ant-design/icons";
import axios from "axios";
import HomePage from "./Views/HomePage";
import UserInfo from "./components/UserInfo";
import { host } from "./conf";
import ArticlePage from "./Views/ArticlePage";

import ReactView from "./Views/routerViews/ReactView";
import VueView from "./Views/routerViews/VueView";
import NodejsView from "./Views/routerViews/NodejsView";
import NotFound from "./Views/NotFound";
const { Content, Footer } = Layout;

function App(props) {
  const [userInfo, setUserInfo] = useState();
  const [backTop, setBackTop] = useState(true);
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get(`${host}searchPersonalInfo`);
      setUserInfo(res.data[0]);
    };
    getUserInfo();
    if (navigator.userAgent.indexOf("Windows") === -1) {
      alert("PC端浏览最佳");
      setBackTop(false);
    } else {
      setBackTop(true);
    }
  }, []);
  
  useEffect(() => {
    if (props.location.pathname === "/") {
      props.history.push("/index");
    }
    window.scrollTo(0,0)
  }, [props.history,props.location.pathname]);
  return (
    <Layout className="layout">
      <Switch>
        <Route path="/index" component={HomePage}/>
        <Route path="/react" exact component={ReactView} />
        <Route path="/vue" exact component={VueView} />
        <Route path="/nodejs" exact component={NodejsView} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
      {backTop && (
        <BackTop style={{ width: "auto", height: "auto" }}>
          <div
            style={{
              height: 940,
              width: 100,
              background:
                "url('https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/scroll.png') no-repeat center",
            }}
          ></div>
        </BackTop>
      )}
      <Footer style={{ textAlign: "center", backgroundColor: "#fff" }}>
        Blog ©2020 Created by bowen
      </Footer>
    </Layout>
  );
}

export default App;
