import React, {  useEffect } from "react";
import { Statistic, Row, Col } from "antd";
export default function WebsiteStatistics(props) {
  const { router } = props;
  useEffect(() => {
    router(props.location.pathname);
  }, [router,props.location.pathname]);
  return (
    <div>
      <h1>待开发...</h1>
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
