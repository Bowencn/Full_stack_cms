import React from "react";
import { Tag, Form, InputNumber, Space, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UploadImage from "../components/UploadImage";
export default function CustomHead() {
  return (
    <Space direction="vertical" size={"large"}>
      <Space>
        <span style={{ paddingRight: 10 }}>分类栏目:</span>
        <Tag color="blue">首页</Tag>
        <Tag color="red" closable>
          前端
        </Tag>
        <Tag color="volcano" closable>
          运营
        </Tag>
        <Tag className="site-tag-plus">
          <PlusOutlined /> 添加新标签
        </Tag>
      </Space>
      <Space>
        栏目高度:
        <InputNumber min={1} max={10} defaultValue={3} />
      </Space>
      <Space>栏目背景:</Space>
      <Row>
        <Col>
          <Form.Item label="网站logo">
            <UploadImage />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col offset={5}>
          <Button type="primary">
            保存
          </Button>
        </Col>
      </Row>
    </Space>
  );
}
