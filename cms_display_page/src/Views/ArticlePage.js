import React, { useState, useEffect } from "react";
import CardTemplate from "../components/CardTemplate";
import { Row, Col, BackTop } from "antd";
import axios from "axios";
import { host } from "../conf";
export default function ArticlePage(props) {
  const [backTop, setBackTop] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    // window.scrollTo(0, 0);
    if (navigator.userAgent.indexOf("Windows") === -1) {
      alert("PC端浏览最佳");
      setBackTop(false);
    } else {
      setBackTop(true);
    }
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
        {backTop && (
          <BackTop style={{ width: "auto", height: "auto" }}>
            <div
              style={{
                height: 940,
                width: 100,
                background:
                  "url('https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/scroll.png') no-repeat center",
              }}
            ></div>
          </BackTop>
        )}
      </Row>
    </div>
  );
}
