import React, { useState, useEffect } from "react";
import {
  Input,
  Form,
  Button,
  Table,
  ConfigProvider,
  Row,
  Col,
  Modal,
  Radio,
  message,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import axios from "axios";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import {host} from '../conf'

export default function Administrators() {
  const [customize] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [adminInfo, setAdminInfo] = useState([]);
  // const [params, setParams] = useState();
  const [data, setData] = useState([]);
  const [rendering, setRendering] = useState({});
  const [form] = Form.useForm();
  const [modalBtn, setModalBtn] = useState();
  const [editAdminInfo, setEditAdminInfo] = useState();
  const { confirm } = Modal;
  // const host = "http://104.36.67.35:10086/";
  useEffect(() => {
    const getAdminInfo = async () => {
      const response = await axios.get(`${host}serchAdmin`);
      let adminInfoData = [];
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          adminInfoData.push(response.data[key]);
        }
      }
      setAdminInfo(adminInfoData);
    };
    getAdminInfo();
  }, [rendering]);
  useEffect(() => {
    let data2 = [];
    adminInfo.forEach((value, index) => {
      data2.push({
        key: value.stu_num,
        name: value.name,
        jurisdiction: value.jurisdiction === 0 ? "超级管理员" : "管理员",
      });
    });
    setData(data2);
  }, [adminInfo]);

  const postAdminInfo = async (method, data) => {
    try {
      const response = await axios.post(
        `${host}${method === "add" ? "addAdmin" : "updateAdmin"}`,
        data
      );
      setRendering(response);
      console.log(response);
      method === "add"
        ? message.success("添加成功")
        : message.success("更新成功");
    } catch (error) {
      console.log(error.response.data);
      error.response.data === "ER_DUP_ENTRY" &&
        message.error("用户名已存在");
    }
  };
  const deleteAdminInfo = async (name) => {
    const response = await axios.delete(`${host}deleteAdminInfo`, {
      data: { name },
    });
    setRendering(response);
    message.success("删除成功");
  };
  const showModal = async (name, record) => {
    console.log(record);
    await setEditAdminInfo(record);
    await setModalBtn(name);
    setVisible(true);
  };
  const onFinish = async (values) => {
    // setLoading(true);
    // setParams(values);
    if (modalBtn === "add") {
      await postAdminInfo("add", values);
    } else {
      values.name = editAdminInfo.name;
      await postAdminInfo("update", values);
    }
    setVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // setLoading(false);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const showDeleteConfirm = (name) => {
    confirm({
      title: "是否删除?",
      icon: <ExclamationCircleOutlined />,
      okText: "是",
      okType: "danger",
      cancelText: "否",
      onOk() {
        deleteAdminInfo(name);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const customizeRenderEmpty = () => (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <SmileOutlined
        style={{
          fontSize: 20,
        }}
      />
      <p> Data Not Found </p>
    </div>
  );
  const Add = () => (
    <div>
      <Button type="primary" onClick={() => showModal("add")}>
        添加
      </Button>
      <Modal
        title={modalBtn === "add" ? "添加管理员" : "编辑管理员"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            返回
          </Button>,
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleOk}
            // loading={loading}
          >
            提交
          </Button>,
        ]}
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {modalBtn === "add" ? (
            <Form.Item
              label="名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item label="名称" name="name" style={{paddingLeft:11}}>
              <span className="ant-form-text" style={{paddingLeft:5}}>
                {editAdminInfo && editAdminInfo.name}
              </span>
            </Form.Item>
          )}

          <Form.Item
            label="权限"
            name="jurisdiction"
            rules={[{ required: true, message: "请选择权限!" }]}
          >
            <Radio.Group style={{ marginLeft: 5 }}>
              <Radio value="0">超级管理员</Radio>
              <Radio value="1">管理员</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="密码"
            name="pwd"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        // console.log(record, index);
        return <a href="#!">{text}</a>;
      },
    },
    {
      align: "center",
      title: "权限",
      dataIndex: "jurisdiction",
      key: "jurisdiction",
    },
    {
      align: "center",
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a
            href="#!"
            style={{ marginRight: 16 }}
            onClick={() => showModal("edit", record)}
          >
            编辑
          </a>
          <a href="#!" onClick={() => showDeleteConfirm(record.name)}>
            删除
          </a>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Row>
        <Col>管理员列表:</Col>
      </Row>
      <Row align="middle">
        <Col offset={22} span={2}>
          <Add />
        </Col>
      </Row>
      <ConfigProvider renderEmpty={customize && customizeRenderEmpty}>
        <Table
          style={{
            marginTop: 20,
          }}
          columns={columns}
          dataSource={data}
        />
      </ConfigProvider>
    </div>
  );
}
