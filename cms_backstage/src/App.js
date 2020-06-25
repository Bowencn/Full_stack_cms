import React, { useState, useEffect } from "react";
import "./App.css";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  HomeOutlined,
  FileTextOutlined,
  LikeOutlined,
  PictureOutlined,
  FundProjectionScreenOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;
function App(props) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  useEffect(() => {});
  const logo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
      <g fill="#61DAFB">
        <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
        <circle cx="420.9" cy="296.5" r="45.7" />
        <path d="M520.5 78.1z" />
      </g>
    </svg>
  );
  const HeartIcon = () => (
    <Icon component={logo} style={{ width: 100 }} className="App-logo" />
  );
  console.log(props);
  return (
    <Router>
      <div className="App">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
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
              }}
            >
              <HeartIcon />
            </div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <SubMenu
                key="sub1"
                icon={<HomeOutlined />}
                title={
                  <Link to="/" className="navFont">
                    首页
                  </Link>
                }
              >
                <Menu.Item key="1">
                  <Link to="/CustomHead" className="navFont">
                    路由导航
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/BannerBar" className="navFont">
                    轮播图
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/SideInformation" className="navFont">
                    个人信息
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="4" icon={<FileTextOutlined />}>
                <Link to="/ArticleList" className="navFont">
                  文章列表
                </Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<LikeOutlined />}>
                <Link to="/AppreciatonSettings" className="navFont">
                  赞赏设置
                </Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<PictureOutlined />}>
                <Link to="/PictureLibrary" className="navFont">
                  图片管理
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="7" icon={<PlaySquareOutlined />}>
                <Link to="/PictureLibrary" className="navFont">
                  视频管理
                </Link>
              </Menu.Item> */}
              <Menu.Item key="8" icon={<FundProjectionScreenOutlined />}>
                <Link to="/WebsiteStatistics" className="navFont">
                  网站统计
                </Link>
              </Menu.Item>
              <Menu.Item key="9" icon={<EyeOutlined />}>
                <Link to={{ pathname: "/preview" }} className="navFont">
                  实时预览
                </Link>
              </Menu.Item>
              <Menu.Item key="10" icon={<TeamOutlined />}>
                <Link to="/Administrators" className="navFont">
                  管理员
                </Link>
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
                <Route path="/preview" exact component={Preview} />
                <Route path="/CustomHead" component={CustomHead} />
                <Route path="/BannerBar" component={BannerBar} />
                <Route path="/SideInformation" component={SideInformation} />
                <Route
                  path="/AppreciatonSettings"
                  component={AppreciatonSettings}
                />
                <Route path="/ArticleList" component={ArticleList} />
                <Route path="/AddArticle" component={AddArticle} />
                <Route path="/PictureLibrary" component={PictureLibrary} />
                <Route
                  path="/WebsiteStatistics"
                  component={WebsiteStatistics}
                />
                <Route path="/Administrators" component={Administrators} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
