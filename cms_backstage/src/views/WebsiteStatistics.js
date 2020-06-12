import React from "react";
import { Statistic, Row, Col } from "antd";

export default function WebsiteStatistics() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="用户数" value={11283} />
        </Col>
        <Col span={8}>
          <Statistic title="活跃数" value={453442} />
        </Col>
        <Col span={8}>
          <Statistic title="会员数" value={8993} />
        </Col>
      </Row>
    </div>
  );
}
