import React, { useState, useEffect } from "react";
import "./App.css";
import { Layout, Menu, Divider, Spin } from "antd";
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
  const [routerKey] = useState(
    window.localStorage.getItem("sider_menu_key")
      ? window.localStorage.getItem("sider_menu_key")
      : "1"
  );
  const [adminInfo] = useState(
    JSON.parse(window.localStorage.getItem("user_info"))
  );
  const logOutfn = async () => {
    setLogOut(true);
    await setTimeout(() => {
      setLogOut(false);
      window.localStorage.removeItem("user_info");
      window.localStorage.removeItem("sider_menu_key");
      props.history.push("/login");
    }, 1000);
  };
  const HeartIcon = () => (
    <Icon component={logo} style={{ width: 100 }} className="App-logo" />
  );
  console.log(props);
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
                {adminInfo && adminInfo.name}
              </Divider>
              <Menu
                theme="dark"
                defaultSelectedKeys={routerKey}
                mode="inline"
                onSelect={({ key }) => {
                  window.localStorage.setItem("sider_menu_key", key);
                }}
              >
                <Menu.Item key="1">
                  <Link
                    to="/route-navigation"
                    className="navFont"
                    style={{ width: "100%" }}
                  >
                    <NodeIndexOutlined />
                    路由导航
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/banner-bar" className="navFont">
                    <FundViewOutlined />
                    轮播图
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/side-information" className="navFont">
                    <UserOutlined />
                    个人信息
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/article-list" className="navFont">
                    <FileTextOutlined />
                    文章列表
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/appreciaton-settings" className="navFont">
                    <LikeOutlined />
                    赞赏设置
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
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
                <Menu.Item key="8">
                  <Link to="/website-statistics" className="navFont">
                    <FundProjectionScreenOutlined />
                    网站统计
                  </Link>
                </Menu.Item>
                <Menu.Item key="9">
                  <Link to={{ pathname: "/preview" }} className="navFont">
                    <EyeOutlined />
                    实时预览
                  </Link>
                </Menu.Item>
                <Menu.Item key="10">
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
              {/* <Header
              className="site-layout-background"
              style={{
                padding: 0,
                textAlign: "center",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              {title}
            </Header> */}
              <Content style={{ margin: "20px 16px" }}>
                <div className="site-layout-background">
                  <Switch>
                    <Route path="/" exact component={CustomHead} />
                    <Route path="/route-navigation" component={CustomHead} />
                    <Route path="/banner-bar" component={BannerBar} />
                    <Route
                      path="/side-information"
                      component={SideInformation}
                    />
                    <Route path="/article-list" component={ArticleList} />
                    <Route path="/add-article" component={AddArticle} />
                    <Route
                      path="/appreciaton-settings"
                      component={AppreciatonSettings}
                    />
                    <Route path="/picture-library" component={PictureLibrary} />
                    <Route
                      path="/website-statistics"
                      component={WebsiteStatistics}
                    />
                    <Route path="/preview" exact component={Preview} />
                    <Route path="/administrators" component={Administrators} />
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
