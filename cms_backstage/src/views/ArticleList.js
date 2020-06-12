import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, ConfigProvider, Row, Col, Tag, Typography } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import axios from "axios";
const localhost = "http://localhost:10086/";
const { Text } = Typography;
export default function ArticleList() {
  const [customize] = useState(false);
  const [articleList, setArticleList] = useState();
  const [rendering, setRendering] = useState();
  useEffect(() => {
    const getArticle = async () => {
      const res = await axios.get(`${localhost}searchArticleInfo`);
      let data = res.data;
      data.forEach((item,index) => {
        item.key=index
      });
      console.log(data);
      setArticleList(data);
    };
    getArticle();
  }, [rendering]);
  const deleteArticle = async (record) => {
    console.log(record);
    let deleteList = {
      uploadTime: record.article_upload_time,
      title: record.article_title,
      tags: record.article_tags,
    };
    const res = await axios.delete(`${localhost}deleteArticleInfo`, {
      data: { deleteList },
    });
    console.log(res);
    setRendering(res);
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
      title: "标题",
      dataIndex: "article_title",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "首页图片",
      dataIndex: `article_img_url`,
      render: (img) =>
        img ? (
          <a target="_blank" rel="noopener noreferrer" href={localhost + img}>
            {localhost + img}
          </a>
        ) : (
          <Text>无</Text>
        ),
    },
    {
      title: "文章分类",
      dataIndex: "article_tags",
      render: (tags) => (
        <Tag
          key={"article_tags"}
          color={tags === "React" ? "#61dafb" : "#215732"}
        >
          {tags}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <Link
            to={{ pathname: "/AddArticle", state: { record } }}
            style={{ marginRight: 16 }}
          >
            编辑
          </Link>
          <a
            href="#!"
            onClick={() => {
              deleteArticle(record);
            }}
          >
            删除
          </a>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Row>
        <Col>文章列表:</Col>
      </Row>
      <Row align="middle">
        <Col offset={22} span={2}>
          <Button type="primary">
            <Link to="/AddArticle">添加</Link>
          </Button>
        </Col>
      </Row>
      <ConfigProvider renderEmpty={customize && customizeRenderEmpty}>
        <Table
          style={{
            marginTop: 20,
          }}
          columns={columns}
          dataSource={articleList}
        />
      </ConfigProvider>
    </div>
  );
}
