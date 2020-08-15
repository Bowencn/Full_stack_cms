import React, { useState, useEffect } from "react";
import "./App.css";
import { Layout, Menu, Divider, Spin, Tooltip } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  LikeOutlined,
  PictureOutlined,
  EyeOutlined,
  NodeIndexOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
      default:
        return "overview";
    }
  });
  const [adminInfo] = useState(
    JSON.parse(window.localStorage.getItem("user_info"))
  );
  useEffect(() => {
    if (props.location.pathname === "/") {
      props.history.push("/overview");
    }
  }, []);
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
      props.history.push("/login");
    }, 1000);
  };
  const overview = () => (
    <svg
      t="1597476052457"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="20090"
      width="1em"
      height="1em"
    >
      <path
        d="M430.182912 452.352L24.576512 691.2A496.0256 496.0256 0 0 1 0.000512 536.3712C0.000512 283.5456 188.621312 75.6736 430.182912 51.2v401.152z m27.136 96.6144L870.400512 814.848C784.026112 941.2608 640.512512 1024 477.952512 1024c-176.7424 0-331.1104-97.8944-413.7984-243.456l393.1648-231.5776zM507.238912 237.4656l265.7792-153.8048 50.944 88.4736-265.7792 153.8048zM493.414912 83.712L581.939712 32.4608l51.0464 88.6272-88.5248 51.2512zM800.614912 646.912l88.5248-51.2512 51.0464 88.6272-88.5248 51.2512zM514.150912 416.768l354.4064-205.1072 50.8928 88.3712-354.4064 205.1072zM660.838912 544.6656l265.7792-153.8048 50.944 88.4736-265.7792 153.8048z"
        fill="#ffffff"
        p-id="20091"
      ></path>
    </svg>
  );
  const OverViewIcon = () => <Icon component={overview} />;
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
                    <OverViewIcon />
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
            <Layout
              className={"site-layout"}
              style={{ marginLeft: 200, backgroundColor: "#fff" }}
            >
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
