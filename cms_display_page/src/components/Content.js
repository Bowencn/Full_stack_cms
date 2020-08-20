import React from "react";

import { Layout, Row, Col, BackTop } from "antd";

import HomeArticle from "./HomeArticle";
import UserInfo from "./UserInfo";
export default function Content() {
  return (
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
        style={{
          width: "320px",
          position: "absolute",
          left: "802px",
        }}
        xxl={{ offset: 5 }}
        xl={{ offset: 3 }}
      >
        <UserInfo />
      </Col>
    </Row>
  );
}
