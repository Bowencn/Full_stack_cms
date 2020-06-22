import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to={{ pathname: "/" }}>Back Home</Link>
        </Button>
      }
    />
  );
}
