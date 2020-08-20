import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在"
      extra={
        <Button type="primary">
          <Link to={{ pathname: "/" }}>返回主页</Link>
        </Button>
      }
    />
  );
}
