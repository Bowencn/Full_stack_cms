import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
export default function Login(props) {
  const layout = {
    wrapperCol: {
      offset: 10,
      span: 4,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 4,
    },
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(props);
    props.history.push("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // background: "#ddd",
        backgroundImage:
          "url('http://104.36.67.35:10086/uploads/0561e428b5441841851995446b42af45')",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color:'#fff',
            fontSize:64,
            fontWeight:600,
            marginBottom:'40px'
          }}
        >
          <span>Blog'CMS</span>
        </div>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{}}
        >
          <Form.Item
            // label="用户名"
            name="username"
            style={{ color: "#fff" }}
            rules={[
              {
                // required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="用户名" style={{ minHeight: "40px" }} />
          </Form.Item>

          <Form.Item
            // label="密码"
            name="password"
            rules={[
              {
                // required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="密码" style={{ minHeight: "40px" }} />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ minHeight: "40px" }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
