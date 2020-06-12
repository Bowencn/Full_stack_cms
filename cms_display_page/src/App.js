import React, { useState, useEffect } from "react";
import "./App.css";
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
import CardTemplate from "./components/CardTemplate";
import axios from "axios";
const { Content, Footer } = Layout;
const { Link } = Anchor;
const { Text } = Typography;
const localhost = "http://localhost:10086/";
function App() {
  const [articleList, setArticleList] = useState();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const getArticle = async () => {
      const res = await axios.get(`${localhost}searchArticleInfo`);
      let data = res.data.reverse();
      data.forEach((item, index) => {
        item.key = index;
      });
      console.log(data);
      setArticleList(data);
    };
    const getUserInfo = async () => {
      const res = await axios.get(`${localhost}searchPersonalInfo`);
      setUserInfo(res.data[0]);
      console.log(res.data);
    };
    getArticle();
    getUserInfo();
  }, []);
  const headerList = [
    { name: "前端" },
    { name: "运营" },
    { name: "实验室", subclass: [{ name: "React" }, { name: "Nodejs" }] },
    { name: "归档" },
  ];
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
            xxl={{ offset: 4 }}
            xl={{ offset: 3 }}
            lg={{ offset: 0 }}
            style={{ width: "772px", minWidth: "700px" }}
          >
            {articleList &&
              articleList.map((item, index) => (
                <CardTemplate homePage data={item} key={index} />
              ))}
          </Col>
          <Col
            style={{ width: "320px", position: "absolute", left: "802px" }}
            xxl={{ offset: 4 }}
            xl={{ offset: 3 }}
          >
            <Affix offsetTop={30}>
              <div>
                <Card hoverable style={{ padding: "16px 20px" }}>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row ",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      alt="example"
                      src={userInfo && localhost + userInfo.user_image}
                      style={{
                        borderRadius: "100%",
                        border: "2px dashed #000",
                        padding: "5px",
                        width: "100px",
                        height: "100px",
                      }}
                      className={"App-logo"}
                    />
                    <Text strong style={{ writingMode: "vertical-lr" }}>
                      •
                    </Text>
                    <Text
                      strong
                      style={{
                        writingMode: "vertical-lr",
                        letterSpacing: "1px",
                      }}
                    >
                      {userInfo && userInfo.autograph}
                    </Text>
                  </div>
                  <Divider />
                  <div style={{ textAlign: "center" }}>
                    <Text strong>{userInfo && userInfo.name}</Text>
                  </div>
                </Card>
                <Card
                  hoverable
                  style={{ padding: "16px 20px", marginTop: "20px" }}
                >
                  <Anchor affix={false}>
                    <Link href="/" title="首页" />
                    {headerList.map((item, index) => {
                      return item.subclass ? (
                        <Link title={item.name} key={index}>
                          {item.subclass.map((item2, index2) => (
                            <Link title={"- " + item2.name} key={index2} />
                          ))}
                        </Link>
                      ) : (
                        <Link title={item.name} key={index} />
                      );
                    })}
                  </Anchor>
                </Card>
              </div>
            </Affix>
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
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
