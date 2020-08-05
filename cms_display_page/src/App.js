import React, { useState, useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  Layout,
  Affix,
  Divider,
  Row,
  Col,
  BackTop,
  Typography,
  Card,
  Anchor,
} from "antd";
import axios from "axios";
import HomeArticle from "./components/HomeArticle";
import Archives from "./Views/Archives";
import UserInfo from "./components/UserInfo";
import { host } from "./conf";
const { Content, Footer } = Layout;
const { Link } = Anchor;
const { Text } = Typography;

function App(props) {
  // const [articleList, setArticleList] = useState();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get(`${host}searchPersonalInfo`);
      setUserInfo(res.data[0]);
      console.log(res.data);
    };
    // getArticle();
    getUserInfo();
  }, []);
  const headerList = [
    { name: "前端" },
    { name: "运营" },
    { name: "实验室", subclass: [{ name: "React" }, { name: "Nodejs" }] },
    { name: "归档", herf: "/archives" },
  ];
  console.log(props);
  return (
    <Layout className="layout">
      {/* <header style={{ height: 500, position: "relative", overflow: "hidden" }}>
        <nav
          style={{
            position: "absolute",
            width: "100%",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "800",
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3),transparent)",
            textShadow: "0 1px 1px rgba(0,0,0,.3)",
            // paddingLeft: "15%",
            // paddingRight: "30%",
          }}
        >
          <Row align="middle" justify="center">
            <Col
              span={2}
              style={{ lineHeight: "58px", textAlign: "center" }}
            >
              首页
            </Col>
            <Col span={3} style={{ textAlign: "center" }}>
              <Dropdown overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    color: "#fff",
                    lineHeight: "58px",
                    textAlign: "center",
                  }}
                >
                  实验室 <DownOutlined />
                </a>
              </Dropdown>
            </Col>
            <Col offset={1}>
              <Search
                placeholder="站内搜索"
                onSearch={(value) => console.log(value)}
                style={{ width: 200, borderRadius: "15px" }}
              />
            </Col>
          </Row>
        </nav>
        <div
          style={{
            backgroundImage:
              "url(http://localhost:10086/uploads/0c50b9236703d0177a36a4da2d6b09cf)",
            height: 650,
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </header> */}
      <Content style={{ padding: "30px 0" }}>
        <Row>
          <Col
            xxl={{ offset: 5 }}
            xl={{ offset: 3 }}
            lg={{ offset: 0 }}
            style={{ width: "772px", minWidth: "700px" }}
          >
            <HomeArticle />
          </Col>
          <Col
            style={{ width: "320px", position: "absolute", left: "802px" }}
            xxl={{ offset: 5 }}
            xl={{ offset: 3 }}
          >
            <UserInfo />
          </Col>
        </Row>
      </Content>
      <BackTop>
        <div
          style={{
            height: 40,
            width: 40,
            lineHeight: "40px",
            borderRadius: "100%",
            backgroundColor: "#fff",
            color: "#555",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          Back
        </div>
      </BackTop>
      {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
    </Layout>
  );
}

export default App;
