import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
export default function WarningPage() {
  return (
    <Result
      title="该页面没有内容"
      extra={
        <Button type="primary" key="back">
          <Link to={{ pathname: "/" }}>返回主页</Link>
        </Button>
      }
    />
  );
}
