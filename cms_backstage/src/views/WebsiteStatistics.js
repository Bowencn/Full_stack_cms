import React,{useState,useEffect} from "react";
import { Statistic, Row, Col } from "antd";
import axios from 'axios'
import {host} from '../conf'
export default function WebsiteStatistics() {
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
