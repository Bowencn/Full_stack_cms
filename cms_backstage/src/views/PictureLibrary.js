import React, { useState, useEffect } from "react";
import { Card, Modal, Row, Col, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { host } from "../conf";
export default function PictureLibrary(props) {
  const { Meta } = Card;
  const [imgURL, setImgURL] = useState([]);
  const [imgVisible, setimgVisible] = useState(false);
  const [currentImgUrl, setcurrentImgUrl] = useState();
  // const host = "http://104.36.67.35:10086/";
  const { router } = props;
  useEffect(() => {
    router(props.location.pathname);
  }, [router,props.location.pathname]);
  useEffect(() => {
    let isUnmounted = false;
    const getAllImg = async () => {
      const res = await axios.get(`${host}queryImageInfo`);
      if (!isUnmounted) {
        setImgURL(res.data);
      }
    };
    getAllImg();
    return () => {
      isUnmounted = true;
    };
  }, []);
  const deleteImg = async (params) => {
    const res = await axios.delete(`${host}imageInfo`, {
      data: { imgName: params },
    });
    console.log(res);
  };
  const CardTemp = (item, index) => {
    // console.log(index);
    return (
      <Card
        key={index}
        hoverable
        style={{ marginBottom: "15px" }}
        bodyStyle={{ padding: 0 }}
        actions={[
          <DeleteOutlined
            key="delete"
            onClick={() => deleteImg(item.filename)}
          />,
        ]}
      >
        <div
          onClick={() => {
            setcurrentImgUrl(host + item.destination + item.filename);
            setimgVisible(true);
          }}
        >
          <img
            alt={item.original_name}
            src={host + item.destination + item.filename}
            style={{ width: "100%" }}
          />

          <Meta
            style={{ padding: "24px" }}
            title={index + ":" + item.original_name}
            description={
              <Tooltip title={host + item.destination + item.filename}>
                {host + item.destination + item.filename}
              </Tooltip>
            }
          />
        </div>
      </Card>
    );
  };
  const list = (col) => {
    let resList = [];
    for (let i = 0; i < col; i++) {
      resList.push(
        <Col span={Math.floor(24 / col)} key={i}>
          {imgURL.map((item, index) => {
            return index % col === i && CardTemp(item, index);
          })}
        </Col>
      );
    }
    return resList;
  };
  return (
    <div style={{ padding: "0 170px 32px 64px" }}>
      <h1
        style={{
          marginTop: "8px",
          marginBottom: "20px",
          fontSize: "30px",
          fontWeight: "500",
        }}
      >
        图片管理
      </h1>
      <Modal
        visible={imgVisible}
        onCancel={() => setimgVisible(false)}
        footer={null}
        closable={false}
        mask
        maskClosable
        destroyOnClose
      >
        <div>
          <img
            alt={currentImgUrl}
            src={currentImgUrl}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
      <Row gutter={[16, 8]} justify="space-between">
        {list(4)}
      </Row>
    </div>
  );
}
