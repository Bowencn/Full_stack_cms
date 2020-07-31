import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
export default function Login(props) {
  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
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
        background: "#ddd",
        // backgroundImage:
        //   "url('http://img.netbian.com/file/2019/0426/c1dfac463602581d897d4f13280358f2.jpg')",
        // backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
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
            label="Username"
            name="username"
            style={{ color: "#fff" }}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
