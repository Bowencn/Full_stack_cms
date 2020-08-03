import React, { useState, useEffect } from "react";
import {
  Radio,
  Button,
  Table,
  ConfigProvider,
  Row,
  Col,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Divider,
  InputNumber,
  message,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { SmileOutlined } from "@ant-design/icons";
import UploadImage from "../components/UploadImage";
import axios from "axios";
import {host} from '../conf'
// const host = "http://104.36.67.35:10086/";
// import { useForm } from "antd/lib/form/util";
const { Option } = Select;
const { confirm } = Modal;
let index = 0;
export default function BannerBar() {
  const [customize] = useState(false);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState(["首页"]);
  const [name, setName] = useState("");
  const [dataCache, setDataCache] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [rendering, setRendering] = useState({});
  const [state, setState] = useState();
  const [recordBannerInfo, setRecordBannerInfo] = useState();
  const [form] = Form.useForm();
  const showModal = (state, record) => {
    console.log(record);
    setRecordBannerInfo(record);
    setState(state);
    setVisible(true);
  };
  useEffect(() => {
    const getAllInfo = async () => {
      const res = await axios.get(`${host}searchBannerInfo`);
      const resData = res.data;
      pushKeyInDataCatch(resData);
      console.log(res);
    };
    getAllInfo();
    console.log(1);
  }, [rendering]);
  const pushKeyInDataCatch = (data) => {
    let arr = [];
    data.map((item, index) => {
      item.key = index;
      return arr.push(item);
    });
    setDataCache(arr);
  };
  const handleOk = async (e) => {
    let data = await form.getFieldsValue();
    data.image_url_info = "uploads/87576385758f75de4b8deea8b45d65b5";

    console.log(data);

    if (
      data.name !== undefined &&
      data.serial_number !== undefined &&
      data.tags !== undefined &&
      data.image_url_info !== undefined
    ) {
      console.log("true");
      let isRepeat;
      dataCache.forEach((item, index) => {
        if (state === "edit") {
          item.serial_number === data.serial_number &&
            item.key !== recordBannerInfo.key &&
            (isRepeat = "repeat");
        } else {
          item.serial_number === data.serial_number && (isRepeat = "repeat");
        }
      });
      if (isRepeat === "repeat") {
        setErrorMsg({ state: true, name: "num" });
      } else {
        if (state === "add") {
          pushKeyInDataCatch(dataCache.concat(data));
        } else {
          let objCatch = [];
          data.last_serial_number = recordBannerInfo.serial_number;
          console.log(recordBannerInfo, data, dataCache);
          dataCache.map(
            (item) => recordBannerInfo !== item && objCatch.push(item)
          );
          objCatch.push(data);

          pushKeyInDataCatch(objCatch);
        }
        setErrorMsg(false);
        setVisible(false);
      }
      // await setDataCache((dataCache) => dataCache.concat(data));
    } else if (data.imgInfo === undefined) {
      setErrorMsg({ state: true, name: "img" });
      console.log(data, "img_error");
    } else {
      console.log("other_error");
    }
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const submitForm = async () => {
    console.log(dataCache);
    if (state === "add") {
      const res = await axios.post(`${host}addBannerInfo`, dataCache);
      setRendering(res);
      console.log(res);
    } else {
      const res = await axios.post(`${host}updateBannerInfo`, dataCache);
      setRendering(res);
      console.log(res);
    }
  };
  const addItem = () => {
    console.log("addItem");
    setItems([...items, name || `New item ${index++}`]);
    setName("");
  };
  const deleteAdminInfo = async (serial_number) => {
    console.log(serial_number);
    const response = await axios.delete(`${host}deleteBannerInfo`, {
      data: { serial_number },
    });
    setRendering(response);
    message.success("删除成功");
  };
  const showDeleteConfirm = (serial_number) => {
    confirm({
      title: "是否删除?",
      icon: <ExclamationCircleOutlined />,
      okText: "是",
      okType: "danger",
      cancelText: "否",
      onOk() {
        deleteAdminInfo(serial_number);
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
  const columns = [
    {
      title: "编号",
      dataIndex: "serial_number",
      key: "serial_number",
      render: (text) => <a href="#!">{text}</a>,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "图片",
      dataIndex: "image_url_info",
      key: "image_url_info",
    },
    {
      title: "标签",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <span>
          <Tag color={"geekblue"} key={tags}>
            {tags.toUpperCase()}
          </Tag>
        </span>
      ),
    },
    {
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
          <a href="#!" onClick={() => showDeleteConfirm(record.serial_number)}>
            删除
          </a>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Row>
        <Col>
          轮播图:
          {/* <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            size="small"
            style={{
              marginLeft: 17,
            }}
          >
            <Radio.Button
              value="a"
              style={{
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              单图
            </Radio.Button>
            <Radio.Button
              value="b"
              style={{
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              多图
            </Radio.Button>
          </Radio.Group> */}
        </Col>
      </Row>
      <Row align="middle">
        <Col offset={23} span={1}>
          <Button type="primary" onClick={() => showModal("add")}>
            添加
          </Button>
        </Col>
      </Row>
      <Modal
        title={state === "add" ? "添加" : "编辑"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="addBanner"
          // initialValues={{
          //   serial_number: "",
          //   name: "",
          //   image_url_info: "",
          //   tags: "",
          // }}
        >
          <Form.Item
            label="编号"
            name="serial_number"
            rules={[
              {
                required: true,
                message: "Please input your serial number!",
              },
            ]}
          >
            <InputNumber min={1} defaultValue={1} style={{ width: 100 }} />
          </Form.Item>
          {errorMsg.name === "num" && (
            <div style={{ color: "#ff4d4f" }}>编号重复，请重新输入</div>
          )}
          <Form.Item
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              type="text"
              // value={value.number || number}
              // onChange={onNumberChange}
              style={{ width: 100 }}
            />
          </Form.Item>
          <Form.Item
            label="图片"
            name="image_url_info"
            rules={[
              {
                required: true,
                message: "Please input your image!",
              },
            ]}
          >
            <UploadImage
              getImgName={(data) => {
                console.log(data);

                // form.setFieldsValue({ imgInfo: data });
              }}
              // defaultImg={
              //   requiredBar === "支付方式" && appreciateInfo.image_url
              // }
            />
            {errorMsg.name === "img" && (
              <div style={{ color: "#ff4d4f" }}>请上传图片</div>
            )}
          </Form.Item>
          <Form.Item
            label="标签"
            name="tags"
            rules={[
              {
                required: true,
                message: "Please input your tags!",
              },
            ]}
          >
            <Select
              style={{ width: 240 }}
              placeholder="custom dropdown render"
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: "4px 0" }} />
                  <div
                    style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                  >
                    <Input
                      style={{ flex: "auto" }}
                      value={name}
                      onChange={onNameChange}
                    />
                    <a
                      href="#!"
                      style={{
                        flex: "none",
                        padding: "8px",
                        display: "block",
                        cursor: "pointer",
                      }}
                      onClick={addItem}
                    >
                      <PlusOutlined /> Add item
                    </a>
                  </div>
                </div>
              )}
            >
              {items.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <ConfigProvider renderEmpty={customize && customizeRenderEmpty}>
        <Table
          style={{
            marginTop: 20,
          }}
          columns={columns}
          dataSource={dataCache}
        />
      </ConfigProvider>
      <Row>
        <Col offset={22} span={2}>
          <Button
            type="primary"
            style={{
              marginTop: 20,
            }}
            onClick={submitForm}
          >
            保存
          </Button>
        </Col>
      </Row>
    </div>
  );
}
