import React, { useState, useRef } from "react";
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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from 'axios'

const localhost = "http://localhost:10086/";
// import UploadImage from "../components/UploadImage";
export default function CustomHead() {
  const [inputVisible, setinputVisible] = useState(false);
  const [inputValue, setinputValue] = useState();
  const [childrenInputIndex, setchildrenInputIndex] = useState(-1);
  const [childrenInputValue, setchildrenInputValue] = useState();
  const [fatherInputValue, setfatherInputValue] = useState();
  const [tags, settags] = useState([
    { name: "首页" },
    { name: "前端" },
    { name: "实验室", subclass: [{ name: "React" }, { name: "Nodejs" }] },
  ]);
  const inputRef = useRef();
  const childrenInputRef = useRef();
  const showInput = async () => {
    await setinputVisible(true);
    inputRef.current.focus();
  };
  const handleInputChange = (e) => {
    setinputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tag = tags;
    inputValue &&
      tag.indexOf(inputValue) === -1 &&
      (tag = [...tag, { name: inputValue }]);
    settags(tag);
    setinputVisible(false);
    setinputValue("");
  };
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
  const handlechildrenInputChange = async (e) => {
    await setchildrenInputValue(e.target.value);
  };

  const handlechildrenInputConfirm = () => {
    let tag = tags.filter((tag) => tag === fatherInputValue)[0];
    tag.subclass
      ? tag.subclass.push({ name: childrenInputValue })
      : (tag.subclass = [{ name: childrenInputValue }]);
    tag = [...tags];
    settags(tag);
    setchildrenInputIndex(-1);
    setchildrenInputValue("");
  };
  const submit = async() => {
    console.log(tags);
    const res = await axios.post(`${localhost}addTags`,tags)
    console.log(res)
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
  return (
    <Space direction="vertical" size={"large"}>
      <Space>
        <span style={{ paddingRight: 10 }}>分类栏目:</span>
        {tags.map((item, index) => {
          if (childrenInputIndex === index) {
            return (
              <Input
                ref={childrenInputRef}
                key={item}
                size="small"
                className="tag-input"
                value={childrenInputValue}
                onChange={handlechildrenInputChange}
                onBlur={handlechildrenInputConfirm}
                onPressEnter={handlechildrenInputConfirm}
              />
            );
          }
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
            <Tooltip placement="left" title={"双击添加子节点"} key={index}>
              <Dropdown
                overlay={item.subclass && menu(item.subclass)}
                disabled={!item.subclass}
              >
                <Tag
                  color="blue"
                  className="edit-tag"
                  closable={index !== 0}
                  onClose={() => handleClose(item)}
                >
                  <span
                    onDoubleClick={(e) => {
                      if (index !== 0) {
                        setchildrenInputIndex(index);
                        setfatherInputValue(item);
                        childrenInputRef.current &&
                          childrenInputRef.current.focus();
                      }
                    }}
                  >
                    {item.name}
                  </span>
                </Tag>
              </Dropdown>
            </Tooltip>
          );
        })}
        {inputVisible && (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            className="tag-input"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={showInput}>
            <PlusOutlined /> 添加新标签
          </Tag>
        )}
      </Space>
      <Space></Space>
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
        <Col offset={5}>
          <Button type="primary" onClick={submit}>
            保存
          </Button>
        </Col>
      </Row>
    </Space>
  );
}
