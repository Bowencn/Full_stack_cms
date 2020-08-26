import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, ConfigProvider, Row, Col, Tag, Typography,message } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import axios from "axios";
import { host } from "../conf";
const { Text } = Typography;
export default function ArticleList(props) {
  const [customize] = useState(false);
  const [articleList, setArticleList] = useState();
  const [rendering, setRendering] = useState();
  const { router } = props;
  useEffect(() => {
    router(props.location.pathname);
  }, [router, props.location.pathname]);
  useEffect(() => {
    let isUnmounted = false;
    const getArticle = async () => {
      const res = await axios.get(`${host}searchArticleInfo`);
      let data = res.data.data;
      data.forEach((item, index) => {
        item.key = index;
      });
      console.log(data);

      if (!isUnmounted) {
        setArticleList(data);
      }
    };

    getArticle();
    return () => {
      isUnmounted = true;
    };
  }, [rendering]);
  const deleteArticle = async (record) => {
    const res = await axios.delete(`${host}deleteArticleInfo`, {
      data: { article_id: record.article_id },
    });
    setRendering(res);
    message.success("删除成功");
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
          <a target="_blank" rel="noopener noreferrer" href={host + img}>
            {host + img}
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
            to={{ pathname: "/add-article", state: { record } }}
            style={{ marginRight: 16 }}
          >
            编辑
          </Link>
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => {
              deleteArticle(record);
            }}
          >
            删除
          </span>
        </span>
      ),
    },
  ];
  return (
    <div
      style={{
        padding: "0 0 32px 64px",
      }}
    >
      <h1
        style={{
          marginTop: "8px",
          marginBottom: "20px",
          fontSize: "30px",
          fontWeight: "500",
        }}
      >
        文章列表
      </h1>
      {/* <div style={{backgroundColor:'#ddd',padding:'15px'}}> */}
      <Row align="middle">
        <Col span={1} offset={23}>
          <Button type="primary">
            <Link to="/add-article">添加</Link>
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
      {/* </div> */}
    </div>
  );
}
