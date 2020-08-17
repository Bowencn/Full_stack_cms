import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { host } from "../conf";
import {
  Affix,
  Divider,
  Typography,
  Card,
  Anchor,
} from "antd";
import axios from "axios";
const { Text } = Typography;
export default function UserInfo() {
  const [userInfo, setUserInfo] = useState();

  const [tags, settags] = useState([{ name: "首页" }]);
  useEffect(() => {
    const GetTags = async () => {
      const res = await axios.get(`${host}searchTags`);
      console.log(res);
      settags(res.data);
    };
    const getUserInfo = async () => {
      const res = await axios.get(`${host}searchPersonalInfo`);
      setUserInfo(res.data[0]);
      console.log(res.data);
    };
    GetTags();
    getUserInfo();
  }, []);
  return (
    <Affix offsetTop={180}>
      <div>
        <Card
          hoverable
          style={{
            padding: "16px 20px",
            boxShadow: "0 1px 20px -8px rgba(0, 0, 0, .5)",
            borderRadius: "15px",
          }}
        >
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
              src={userInfo && host + userInfo.user_image}
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
          style={{
            padding: "16px 20px",
            marginTop: "20px",
            boxShadow: "0 1px 20px -8px rgba(0, 0, 0, .5)",
            borderRadius: "15px",
          }}
        >
          <Anchor
            affix={false}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {tags.map((item, index) => {
              return item.subclass ? (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                    marginBottom: "5px",
                    color: "#555",
                  }}
                  to="undefined"
                >
                  {item.name}
                  {item.subclass.map((item2, index2) => (
                    <Link
                      to={{ pathname: item2.herf, state: {} }}
                      key={index2}
                      style={{ marginLeft: "10px", color: "#555" }}
                    >
                      {"- " + item2.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  to={{ pathname: item.herf, state: {} }}
                  key={index}
                  style={{
                    marginLeft: "10px",
                    marginBottom: "5px",
                    display: "flex",
                    color: "#555",
                  }}
                >
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
