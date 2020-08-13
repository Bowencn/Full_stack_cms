import React from "react";
import { Card, Row, Col } from "antd";
export default function Overview() {
  return (
    <div style={{ padding: "0 170px 32px 64px" }}>
      <h1 style={{marginTop:'8px',marginBottom:'20px',fontSize:'30px',fontWeight:'500'}}>总览</h1>
      <Row style={{ marginBottom: "40px" }}>
        <Col span={6}>
          <Card title="路由导航" style={{ width: 320 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="个人信息" style={{ width: 320 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="文章列表" style={{ width: 320 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Card title="赞赏设置" style={{ width: 320 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="图片管理" style={{ width: 320 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="实时预览" style={{ width: 320 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="管理员" style={{ width: 320 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
