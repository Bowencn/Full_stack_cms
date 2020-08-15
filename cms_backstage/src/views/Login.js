import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { host } from "../conf";
import imgURL from "../assets/moon-4096x2304-planets-clouds-4k-9215.jpg";
export default withRouter(function Login({ history }) {
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
  const onFinish = async (values) => {
    const res = await axios.post(`${host}login`, values);
    if (res.data.code === 200 && res.data.data.name === values.username) {
      let setData = JSON.stringify(res.data.data);
      window.localStorage.setItem("user_info", setData);
      history.push({ pathname: "/route-navigation", state: setData });
    } else {
      if (res.data.data.message === "password_error") {
        message.warning("密码错误");
      } else {
        message.error("用户名错误");
      }
    }
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
        backgroundImage: `url(${imgURL})`,
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
            color: "#fff",
            fontSize: 64,
            fontWeight: 600,
            marginBottom: "40px",
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
});
