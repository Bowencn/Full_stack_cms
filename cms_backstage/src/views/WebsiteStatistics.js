import React,{useState,useEffect} from "react";
import { Statistic, Row, Col } from "antd";
import axios from 'axios'
const localhost = "http://104.36.67.35:10086/";
export default function WebsiteStatistics() {
  // const [userNum,setUserNum]=useState()
  // useEffect(() => {
    
  //   const getUserNum = async()=>{
  //     const res = await axios.get(`${localhost}queryAdminNumber`)
  //     console.log(res)
  //     setUserNum(res.data.userNum)
  //   }
  //   getUserNum()
  // }, [])
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
