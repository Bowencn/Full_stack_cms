import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Typography } from "antd";
const { Title, Paragraph } = Typography;
const localhost = "http://104.36.67.35:10086/";
export default function CardTemplate(props) {
  const [data] = useState(props.data);
  const [date, setDate] = useState();
  const [imgStyle, setimgStyle] = useState({ maxWidth: "100%" });
  const refImg = useRef();
  useEffect(() => {
    let d = new Date();
    d.setTime(data.article_upload_time);
    let date = d.toLocaleDateString().replace(/\//g, "-");
    setDate(date);
    if (refImg.current !== undefined) {
      refImg.current.onload = () => {
        let height = refImg.current.naturalHeight;
        let width = refImg.current.naturalWidth;
        if (width && height && height > width) {
          setimgStyle({ maxWidth: "300px" });
        }
      };
    }
  }, [data]);
  const cardHeader = (
    <div style={{ textAlign: "center" }}>
      <Title level={3}>{data.article_title}</Title>
      <div style={{ marginTop: "5px", marginBottom: "60px" }}>
        <span style={{ color: "#00a7e0", fontSize: "12px" }}>{date}</span>
        <span>
          <span
            style={{
              color: "#000",
              fontSize: "12px",
              marginRight: "3px",
              marginLeft: "3px",
            }}
          >
            •
          </span>
          <span style={{ color: "#000", fontSize: "12px", marginRight: "3px" }}>
            {data&&data.article_tags}
          </span>
          {/* <span style={{ color: "#000", fontSize: "12px" }}>666</span> */}
        </span>
      </div>
    </div>
  );
  return (
    <Card
      hoverable
      style={{ padding: "40px", marginBottom: "30px" ,textAlign:'left'}}
      bodyStyle={{ padding: "0" }}
    >
      {cardHeader}
      {data.article_img_url && (
        <div style={{ textAlign: "center" }}>
          <img
            ref={refImg}
            alt="example"
            style={imgStyle}
            src={`${localhost + data.article_img_url}`}
          />
        </div>
      )}

      {props.content ? (
        <div
          className="braft-output-content"
          dangerouslySetInnerHTML={{ __html: data.article_content_html }}
        ></div>
      ) : (
        <Paragraph ellipsis={{ rows: 2 }}>
          <div
            className="braft-output-content"
            dangerouslySetInnerHTML={{ __html: data.article_content_html }}
          ></div>
        </Paragraph>
      )}
      {props.homePage && (
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#97dffd",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              fontSize: "12px",
            }}
          >
            <Link to={{ pathname: "/artclePage", state: { data } }}>
              阅读原文 »
            </Link>
          </Button>
        </div>
      )}
    </Card>
  );
}
