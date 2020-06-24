import React, { useState, useRef, useEffect } from "react";
import {
  Tag,
  Tooltip,
  Space,
  Row,
  Col,
  Button,
  Input,
  Menu,
  Dropdown,
  Form,
  Switch,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const localhost = "http://localhost:10086/";
// import UploadImage from "../components/UploadImage";
export default function CustomHead() {
  const [inputVisible, setinputVisible] = useState(false);
  const [childrenInputVisible, setchildrenInputVisible] = useState(false);
  const [isChange, setChange] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [tags, settags] = useState([]);
  const [btnDisabled, setbtnDisabled] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const GetTags = async () => {
      const res = await axios.get(`${localhost}searchTags`);
      console.log(res);
      settags(res.data);
    };
    GetTags();
  }, []);
  const handleClose = (removedTag, isChildren) => {
    let tag = tags;
    isChildren
      ? tag.forEach((item, index) => {
          if (item.subclass) {
            item.subclass = item.subclass.filter((tag) => tag !== removedTag);
          }
        })
      : (tag = tag.filter((tag) => tag !== removedTag));
    settags(tag);
  };
  const submit = async () => {
    console.log(tags);
    const res = await axios.post(`${localhost}addTags`, tags);
    console.log(res);
  };
  const menu = (data) => {
    return (
      data && (
        <Menu>
          {data.map((item, index) => (
            <Menu.Item key={index}>
              <Tag
                color="blue"
                className="edit-tag"
                key={item}
                closable={index !== 0 || index === 0}
                onClose={() => handleClose(item, true)}
              >
                {item.name}
              </Tag>
            </Menu.Item>
          ))}
        </Menu>
      )
    );
  };
  const showAddInput = () => {
    setinputVisible(true);
    setbtnDisabled(true);
  };
  const switchOnChange = (checked) => {
    setchildrenInputVisible(checked);
    setbtnDisabled(true);
  };
  const addTags = () => {
    let tagsForm = form.getFieldsValue();
    let data = { name: tagsForm.tagsName };
    let subclass = [];
    if (!childrenInputVisible) {
      data.herf = tagsForm.herf;
    } else {
      let cTagsName = tagsForm.childrenTagsName.split(",");
      let cHerf = tagsForm.herf.split(",");
      for (let index = 0; index < cTagsName.length; index++) {
        const name = cTagsName[index];
        const herf = cHerf[index];
        subclass.push({ name: name, herf: herf });
      }
      data.subclass = subclass;
    }
    console.log(data);
    if (!isChange) {
      settags([...tags, data]);
    } else {
      const newTags = [...tags];
      for (let index = 0; index < newTags.length; index++) {
        if (newTags[index].id === currentId) {
          newTags[index] = data;
        }
      }
      settags(newTags);
    }
    setinputVisible(false);
    setChange(false);
    setchildrenInputVisible(false);
  };
  const changeTags = (item) => {
    let cName = "";
    let cHerf = "";
    showAddInput();
    setChange(true);
    console.log(item);
    setCurrentId(item.id);
    form.setFieldsValue({ tagsName: item.name });
    if (item.subclass) {
      setchildrenInputVisible(true);
      for (let index = 0; index < item.subclass.length; index++) {
        index === item.subclass.length - 1
          ? (cName += item.subclass[index].name)
          : (cName += item.subclass[index].name + ",");
        index === item.subclass.length - 1
          ? (cHerf += item.subclass[index].herf)
          : (cHerf += item.subclass[index].herf + ",");
      }
      form.setFieldsValue({ childrenTagsName: cName, herf: cHerf });
    } else {
      form.setFieldsValue({ herf: item.herf });
    }

    console.log(cName, cHerf);
  };
  const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 6 },
  };
  return (
    <div>
      <Row style={{ marginBottom: "20px" }}>
        <Col style={{ paddingRight: 10, textAlign: "right" }} span={1}>
          分类栏目:
        </Col>
        {tags.map((item, index) => {
          return index === 0 ? (
            <Tag
              color="blue"
              className="edit-tag"
              key={index}
              closable={index !== 0}
            >
              {item.name}
            </Tag>
          ) : (
            <Tag
              color="blue"
              className="edit-tag"
              closable={index !== 0}
              onClose={() => handleClose(item)}
            >
              <Dropdown
                overlay={item.subclass && menu(item.subclass)}
                disabled={!item.subclass}
              >
                <span onDoubleClick={() => changeTags(item)}>{item.name}</span>
              </Dropdown>
            </Tag>
          );
        })}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={showAddInput}>
            <PlusOutlined /> 添加新标签
          </Tag>
        )}
      </Row>
      {/* <Space> */}
      {inputVisible && (
        <Form name="tags" form={form} {...layout}>
          <Form.Item label={"标签名"} name="tagsName">
            <Input />
          </Form.Item>
          <Form.Item label={"子标签"}>
            <Switch
              checked={childrenInputVisible}
              onChange={switchOnChange}
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
          </Form.Item>
          {childrenInputVisible && (
            <Form.Item label={" "} name="childrenTagsName" colon={false}>
              <Input placeholder={"添加多个标签请用 , 隔开"} />
            </Form.Item>
          )}
          <Form.Item
            label={childrenInputVisible ? "子路由" : "路由"}
            name="herf"
            dependencies={["childrenTagsName"]}
            rules={
              !childrenInputVisible
                ? [
                    {
                      required: true,
                      message: "请输入路由名称",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value) {
                          return new Promise((resolve) => {
                            setbtnDisabled(false);
                            resolve();
                          });
                        }
                        return new Promise((reject) => {
                          setbtnDisabled(true);
                          reject("请输入路由名称");
                        });
                      },
                    }),
                  ]
                : [
                    {
                      required: true,
                      message: "请输入路由名称多个路由请用 , 隔开",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (
                          value &&
                          getFieldValue("childrenTagsName").split(",")
                            .length === value.split(",").length
                        ) {
                          return new Promise((resolve) => {
                            console.log("ok");
                            setbtnDisabled(false);
                            resolve();
                          });
                        }
                        return new Promise((reject) => {
                          console.log("不ok");
                          reject("请输入与子标签对应的路由名称");
                          setbtnDisabled(true);
                        });
                      },
                    }),
                  ]
            }
          >
            <Input />
          </Form.Item>
        </Form>
      )}
      {/* </Space> */}
      {/* <Space>
        栏目高度:
        <InputNumber min={1} max={10} defaultValue={3} />
      </Space>
      <Space>栏目背景:</Space>
      <Row>
        <Col>
          <Form.Item label="网站logo">
            <UploadImage />
          </Form.Item>
        </Col>
      </Row> */}
      <Row>
        <Col offset={2} span={6}>
          <Button
            type="primary"
            onClick={inputVisible ? addTags : submit}
            disabled={btnDisabled}
          >
            {inputVisible ? (!isChange ? "添加" : "保存更改") : "保存"}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
