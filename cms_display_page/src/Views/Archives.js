import React, { useState } from "react";

import UserInfo from "../components/UserInfo";
import { Timeline, Row, Col, Typography, Card } from "antd";
const { Text, Title, Link } = Typography;
export default function Archives() {
  return (
    <div className="main-wrapper" style={{ padding: "30px 0" }}>
      <Row>
        <Col
          xxl={{ offset: 5 }}
          xl={{ offset: 3 }}
          lg={{ offset: 0 }}
          style={{ width: "772px", minWidth: "700px" }}
        >
          <Card style={{ padding: "30px 60px" }}>
            <Title level={3} style={{ textAlign: "center",marginBottom:'30px' }}>
              归档
            </Title>
            {/* <Title level={4} style={{ color: "#555" }}>
              分类
            </Title> */}
            <div>
              <Title level={4} style={{ color: "#555", padding: "0 0 30px 0" }}>
                2020
              </Title>
              <Timeline>
                <Timeline.Item>
                  <Text style={{ color: "rgb(24, 144, 255)" }}>06-02</Text>
                  <Text style={{ color: "#555", marginLeft: "15px" }}>
                    Web---{">"}modify
                  </Text>
                </Timeline.Item>
                <Timeline.Item>
                  <Text style={{ color: "rgb(24, 144, 255)" }}>06-02</Text>
                  <Text style={{ color: "#555", marginLeft: "15px" }}>
                    科学的 Web 调试代理实践
                  </Text>
                </Timeline.Item>
                <Timeline.Item>
                  <Text style={{ color: "rgb(24, 144, 255)" }}>06-02</Text>
                  <Text style={{ color: "#555", marginLeft: "15px" }}>
                    天上白玉京
                  </Text>
                </Timeline.Item>
                <Timeline.Item>
                  <Text style={{ color: "rgb(24, 144, 255)" }}>06-02</Text>
                  <Text style={{ color: "#555", marginLeft: "15px" }}>
                    test-modify
                  </Text>
                </Timeline.Item>
              </Timeline>
            </div>
            <div>
              <Title level={4} style={{ color: "#555", padding: "0 0 30px 0" }}>
                2019
              </Title>
              <Timeline>
                <Timeline.Item>
                  <Text style={{ color: "rgb(24, 144, 255)" }}>06-02</Text>
                  <Text style={{ color: "#555", marginLeft: "15px" }}>
                    Web---{">"}modify
                  </Text>
                </Timeline.Item>
                <Timeline.Item>
                  <Text style={{ color: "rgb(24, 144, 255)" }}>06-02</Text>
                  <Text style={{ color: "#555", marginLeft: "15px" }}>
                    科学的 Web 调试代理实践
                  </Text>
                </Timeline.Item>
                <Timeline.Item>
                  <Text style={{ color: "rgb(24, 144, 255)" }}>06-02</Text>
                  <Text style={{ color: "#555", marginLeft: "15px" }}>
                    天上白玉京
                  </Text>
                </Timeline.Item>
                <Timeline.Item>
                  <Text style={{ color: "rgb(24, 144, 255)" }}>06-02</Text>
                  <Text style={{ color: "#555", marginLeft: "15px" }}>
                    test-modify
                  </Text>
                </Timeline.Item>
              </Timeline>
            </div>
          </Card>
        </Col>
        <Col
          style={{ width: "320px", position: "absolute", left: "802px" }}
          xxl={{ offset: 5 }}
          xl={{ offset: 3 }}
        >
          <UserInfo />
        </Col>
      </Row>
    </div>
  );
}
