import React, { useState, useEffect } from "react";
import CardTemplate from "../components/CardTemplate";
import { Row, Col } from "antd";
import axios from "axios";
import { host } from "../conf";
export default function ArticlePage(props) {
  const [data, setData] = useState();
  useEffect(() => {
    const getArticle = async () => {
      let id = props.match.params.articleId;
      const res = await axios.post(`${host}searchArticleContent`, { id: id });
      setData(res.data[0]);
    };
    getArticle();
  }, [props]);
  return (
    <div className="main-wrapper" style={{ padding: "30px 10%" }}>
      <Row>
        <Col xl={{ span: 14, offset: 5 }}>
          {data && <CardTemplate content data={data} />}
        </Col>
      </Row>
    </div>
  );
}
