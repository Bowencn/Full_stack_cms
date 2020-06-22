import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
// const { Link } = Anchor;
const { Text } = Typography;
const localhost = "http://localhost:10086/";
export default function UserInfo() {
  const [userInfo, setUserInfo] = useState();

  const [tags, settags] = useState([{ name: "首页" }]);
  useEffect(() => {
    const GetTags = async () => {
      const res = await axios.get(`${localhost}searchTags`);
      console.log(res);
      settags(res.data);
    };
    const getUserInfo = async () => {
      const res = await axios.get(`${localhost}searchPersonalInfo`);
      setUserInfo(res.data[0]);
      console.log(res.data);
    };
    GetTags();
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
          <Anchor affix={false} style={{display:'flex',flexDirection:'column'}}>
          {tags.map((item, index) => {
            return item.subclass ? (
              <Link key={index} style={{display:'flex',flexDirection:'column',marginLeft:'10px',marginBottom:'5px',color:'#555'}}>
                {item.name}
                {item.subclass.map((item2, index2) => (
                  <Link key={index2} style={{marginLeft:'10px',color:'#555'}}>{"- " + item2.name}</Link>
                ))}
              </Link>
            ) : (
              <Link to={{ pathname: "/midviews", state: {} }} key={index} style={{marginLeft:'10px',marginBottom:'5px',display:'flex',color:'#555'}}>
                {item.name}
              </Link>
            );
          })}
          </Anchor>
        </Card>
      </div>
    </Affix>
  );
}
