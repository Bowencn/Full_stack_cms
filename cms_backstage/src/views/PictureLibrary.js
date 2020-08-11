import React, { useState, useEffect } from "react";
import { Card, Modal, Row, Col } from "antd";
import axios from "axios";
import { host } from "../conf";
export default function PictureLibrary(props) {
  const { Meta } = Card;
  const [imgURL, setImgURL] = useState([]);
  const [imgVisible, setimgVisible] = useState(false);
  const [currentImgUrl, setcurrentImgUrl] = useState();
  // const host = "http://104.36.67.35:10086/";

  useEffect(() => {
    props.router(props.location.pathname);
  }, []);
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
  const CardTemp = (item, index) => {
    // console.log(index);
    return (
      <Card
        key={index}
        hoverable
        style={{ marginBottom: "15px" }}
        cover={
          <div>
            <img
              alt={item.original_name}
              src={host + item.destination + item.filename}
              style={{ width: "100%" }}
            />
          </div>
        }
        onClick={() => {
          setcurrentImgUrl(host + item.destination + item.filename);
          setimgVisible(true);
        }}
      >
        <Meta
          title={index + ":" + item.original_name}
          description={host + item.destination + item.filename}
        />
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
    <div>
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
