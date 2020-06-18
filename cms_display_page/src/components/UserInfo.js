import React, { useState, useEffect } from "react";

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
const { Content, Footer } = Layout;
const { Link } = Anchor;
const { Text } = Typography;
const localhost = "http://localhost:10086/";
export default function UserInfo() {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    // const getArticle = async () => {
    //   const res = await axios.get(`${localhost}searchArticleInfo`);
    //   let data = res.data.reverse();
    //   data.forEach((item, index) => {
    //     item.key = index;
    //   });
    //   console.log(data);
    //   setArticleList(data);
    // };
    const getUserInfo = async () => {
      const res = await axios.get(`${localhost}searchPersonalInfo`);
      setUserInfo(res.data[0]);
      console.log(res.data);
    };
    // getArticle();
    getUserInfo();
  }, []);
  const headerList = [
    {
      name: "实验室",
      subclass: [
        { name: "前端" },
        // { name: "运营" },
        { name: "React" },
        { name: "Nodejs" },
      ],
    },
    { name: "归档", herf: "/archives" },
  ];
  return (
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
        <Card hoverable style={{ padding: "16px 20px", marginTop: "20px" }}>
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
                <Link href={item.herf} title={item.name} key={index} />
              );
            })}
          </Anchor>
        </Card>
      </div>
    </Affix>
  );
}
