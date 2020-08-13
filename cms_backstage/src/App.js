import React, { useState, useEffect } from "react";
import "./App.css";
import { Layout, Menu, Divider, Spin, Tooltip } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  LikeOutlined,
  PictureOutlined,
  FundProjectionScreenOutlined,
  EyeOutlined,
  NodeIndexOutlined,
  FundViewOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  // IndexRoute,
} from "react-router-dom";
import Overview from "./views/Overview";
import CustomHead from "./views/CustomHead";
import BannerBar from "./views/BannerBar";
import SideInformation from "./views/SideInformation";
import AppreciatonSettings from "./views/AppreciationSettings";

import ArticleList from "./views/ArticleList";
import AddArticle from "./views/AddArticle";
import PictureLibrary from "./views/PictureLibrary";
import WebsiteStatistics from "./views/WebsiteStatistics";
import Administrators from "./views/Administrators";
import Preview from "./views/Preview";
import logo from "./assets/logo";
const { Content, Sider } = Layout;
function App(props) {
  const [logOut, setLogOut] = useState(false);
  const [routerKey, setRouterKey] = useState(() => {
    console.log("state:", props.location.pathname);
    switch (props.location.pathname) {
      
      case "/overview":
        return "overview";
      case "/route-navigation":
        return "route-navigation";
      case "/banner-bar":
        return "banner-bar";
      case "/side-information":
        return "side-information";
      case "/article-list":
        return "article-list";
      case "/appreciaton-settings":
        return "appreciaton-settings";
      case "/picture-library":
        return "picture-library";
      case "/website-statistics":
        return "website-statistics";
      case "/preview":
        return "preview";
      case "/administrators":
        return "administrators";
    }
  });
  const [adminInfo] = useState(
    JSON.parse(window.localStorage.getItem("user_info"))
  );
  const judgeTheRoute = (routerName) => {
    switch (routerName) {
      case "/overview":
        return "overview";
      case "/route-navigation":
        return "route-navigation";
      case "/banner-bar":
        return "banner-bar";
      case "/side-information":
        return "side-information";
      case "/article-list":
        return "article-list";
      case "/appreciaton-settings":
        return "appreciaton-settings";
      case "/picture-library":
        return "picture-library";
      case "/website-statistics":
        return "website-statistics";
      case "/preview":
        return "preview";
      case "/administrators":
        return "administrators";
    }
  };
  const getRouter = async (routerName) => {
    const cb = await judgeTheRoute(routerName);
    await setRouterKey(cb);
  };
  const logOutfn = async () => {
    setLogOut(true);
    await setTimeout(() => {
      setLogOut(false);
      window.localStorage.removeItem("user_info");
      // window.localStorage.removeItem("sider_menu_key");
      props.history.push("/login");
    }, 1000);
  };
  const HeartIcon = () => (
    <Icon component={logo} style={{ width: 100 }} className="App-logo" />
  );
  return (
    <Router>
      <div className="App">
        {logOut ? (
          <div className="example">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 88 }} spin />}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />

            <span
              style={{
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              登出中...
            </span>
          </div>
        ) : (
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginTop: "5px",
                }}
              >
                <HeartIcon />
              </div>
              <Divider plain style={{ color: "#fff" }}>
                <Tooltip
                  placement="bottom"
                  title={
                    adminInfo && adminInfo.jurisdction == 1
                      ? "管理员"
                      : "超级管理员"
                  }
                >
                  <span>{adminInfo && adminInfo.name}</span>
                </Tooltip>
              </Divider>
              <Menu theme="dark" selectedKeys={routerKey} mode="inline">
                <Menu.Item key="overview">
                  <Link
                    to="/overview"
                    className="navFont"
                    style={{ width: "100%" }}
                  >
                    <NodeIndexOutlined />
                    总览
                  </Link>
                </Menu.Item>
                <Menu.Item key="route-navigation">
                  <Link
                    to="/route-navigation"
                    className="navFont"
                    style={{ width: "100%" }}
                  >
                    <NodeIndexOutlined />
                    路由导航
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="banner-bar">
                  <Link to="/banner-bar" className="navFont">
                    <FundViewOutlined />
                    轮播图
                  </Link>
                </Menu.Item> */}
                <Menu.Item key="side-information">
                  <Link to="/side-information" className="navFont">
                    <UserOutlined />
                    个人信息
                  </Link>
                </Menu.Item>
                <Menu.Item key="article-list">
                  <Link to="/article-list" className="navFont">
                    <FileTextOutlined />
                    文章列表
                  </Link>
                </Menu.Item>
                <Menu.Item key="appreciaton-settings">
                  <Link to="/appreciaton-settings" className="navFont">
                    <LikeOutlined />
                    赞赏设置
                  </Link>
                </Menu.Item>
                <Menu.Item key="picture-library">
                  <Link to="/picture-library" className="navFont">
                    <PictureOutlined />
                    图片管理
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="7" icon={<PlaySquareOutlined />}>
                <Link to="/PictureLibrary" className="navFont">
                  视频管理
                </Link>
              </Menu.Item> */}
                {/* <Menu.Item key="website-statistics">
                  <Link to="/website-statistics" className="navFont">
                    <FundProjectionScreenOutlined />
                    网站统计
                  </Link>
                </Menu.Item> */}
                <Menu.Item key="preview">
                  <Link to={{ pathname: "/preview" }} className="navFont">
                    <EyeOutlined />
                    实时预览
                  </Link>
                </Menu.Item>
                <Menu.Item key="administrators">
                  <Link to="/administrators" className="navFont">
                    <TeamOutlined />
                    管理员
                  </Link>
                </Menu.Item>
                <Menu.Item key="11" icon={<UserOutlined />} onClick={logOutfn}>
                  退出
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className={"site-layout"} style={{ marginLeft: 200 }}>
              <Content style={{ margin: "20px 16px" }}>
                <div className="site-layout-background">
                  <Switch>
                    <Route path="/" exact component={Overview} />
                    <Route
                      path="/overview"
                      component={(props) => (
                        <Overview
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/route-navigation"
                      component={(props) => (
                        <CustomHead
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/banner-bar"
                      component={(props) => (
                        <BannerBar
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/side-information"
                      component={(props) => (
                        <SideInformation
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/article-list"
                      component={(props) => (
                        <ArticleList
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/add-article"
                      component={(props) => (
                        <AddArticle
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/appreciaton-settings"
                      component={(props) => (
                        <AppreciatonSettings
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/picture-library"
                      component={(props) => (
                        <PictureLibrary
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/website-statistics"
                      component={(props) => (
                        <WebsiteStatistics
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/preview"
                      exact
                      component={(props) => (
                        <Preview
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                    <Route
                      path="/administrators"
                      component={(props) => (
                        <Administrators
                          {...Object.assign({}, { router: getRouter }, props)}
                        />
                      )}
                    />
                  </Switch>
                </div>
              </Content>
              {/* <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer> */}
            </Layout>
          </Layout>
        )}
      </div>
    </Router>
  );
}

export default App;
