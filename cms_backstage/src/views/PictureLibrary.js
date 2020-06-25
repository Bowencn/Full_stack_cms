import React, { useState, useEffect } from "react";
import { Card, Modal, Row, Col } from "antd";
import axios from "axios";
export default function PictureLibrary() {
  const { Meta } = Card;
  const [imgURL, setImgURL] = useState([]);
  const [imgVisible, setimgVisible] = useState(false);
  const [currentImgUrl, setcurrentImgUrl] = useState();
  const localhost = "http://localhost:10086/";
  useEffect(() => {
    const getAllImg = async () => {
      const res = await axios.get(`${localhost}queryImageInfo`);
      setImgURL(res.data);
    };
    const getUserNum = async()=>{
      const res = await axios.get(`${localhost}queryAdminNumber`)
      console.log(res)
    }
    getUserNum()
    getAllImg();
  }, []);
  const CardTemp = (item, index) => {
    console.log(index);
    return (
      <Card
        key={index}
        hoverable
        style={{ marginBottom: "15px" }}
        cover={
          <div>
            <img
              alt={item.original_name}
              src={localhost + item.destination + item.filename}
              style={{ width: "100%" }}
            />
          </div>
        }
        onClick={() => {
          setcurrentImgUrl(localhost + item.destination + item.filename);
          setimgVisible(true);
        }}
      >
        <Meta
          title={index + ":" + item.original_name}
          description={localhost + item.destination + item.filename}
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
