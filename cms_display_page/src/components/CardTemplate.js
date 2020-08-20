import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Typography } from "antd";
import { host } from "../conf";
import Icon from "@ant-design/icons";
const { Title, Paragraph } = Typography;
export default function CardTemplate(props) {
  const [data] = useState(props.data);
  const [date, setDate] = useState();
  const [imgStyle, setimgStyle] = useState({ maxWidth: "100%" });
  const refImg = useRef();
  const [tags] = useState(!props.content);
  useEffect(() => {
    let d = new Date();
    d.setTime(data.article_upload_time);
    let date = d.toLocaleDateString().replace(/\//g, "-");
    setDate(date);
    if (refImg.current !== undefined) {
      let height = refImg.current.naturalHeight;
      let width = refImg.current.naturalWidth;
      if (width && height && height > width) {
        setimgStyle({ maxWidth: "300px" });
      }
    }
  }, [data]);
  const tagsSvg = () => (
    <svg
      t="1597651144411"
      className="icon"
      viewBox="0 0 3413 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3303"
      width="150"
      height="100"
    >
      <path
        d="M172.572444 1016.32L0 786.204444h172.572444"
        p-id="3304"
        fill="#97dffd"
      ></path>
      <path
        d="M0 0h2560L2213.944889 786.204444H0z"
        p-id="3305"
        fill="#97dffd"
      ></path>
      <path
        d="M0 0h3413.333333l-461.397333 786.204444H0z"
        p-id="3306"
        fill="#97dffd"
      ></path>
    </svg>
  );
  const dateSvg = () => (
    <svg
      t="1597652333503"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5022"
      width="14"
      height="14"
    >
      <path
        d="M176.6 932.3c-47.6 0-86.4-38.4-86.4-85.5V231.7c0-47.2 38.8-85.5 86.4-85.5l143.3 0.1v-25.1c0-13.9 10.6-24 25.2-24s25.2 10.1 25.2 24.1v25.1l272.8-0.2v-25.1c0-14.2 10.1-24.1 24.5-24.1 14.8 0 25.9 10.4 25.9 24.1v25.1h145.6c47.6 0 86.4 38.4 86.4 85.5v615.1c0 47.2-38.8 85.5-86.4 85.5H176.6z m-35.9-88.4c0 22 17.2 38 40.9 38h657.7c23.5 0 35.8-18.1 35.8-35.9V402H140.7v441.9z m734.4-492.4V233c0-22.2-14.5-36.5-36.9-36.5H693.3v82.4c0 13.9-9.7 23.6-23.7 23.6s-23.7-9.7-23.7-23.6v-82.5H370.2v82.4c0 13.7-10.4 23.6-24.7 23.6-14.6 0-25.6-10.2-25.6-23.8v-82.4l-135 0.3c-17.9 0-43.9 14.2-43.9 36.4v118.6h734.1z"
        p-id="5023"
        fill="#00a7e0"
      ></path>
    </svg>
  );
  const TagsIcon = (props) => <Icon component={tagsSvg} {...props} />;
  const DateIcon = (props) => <Icon component={dateSvg} {...props} />;
  const cardHeader = (
    <div style={{ textAlign: "center" }}>
      <Title level={3}>{data.article_title}</Title>
      <div style={{ marginTop: "5px", marginBottom: "60px" }}>
        <span style={{ color: "#00a7e0", fontSize: "12px" }}>
          <DateIcon />
          发表于{date}
        </span>
      </div>
    </div>
  );
  return (
    <Card
      hoverable
      style={{
        padding: "40px",
        marginBottom: "30px",
        textAlign: "left",
        position: "relative",
        boxShadow: "0 1px 20px -8px rgba(0, 0, 0, .5)",
        borderRadius: "15px",
      }}
      bodyStyle={{ padding: "0" }}
    >
      {cardHeader}
      {tags && (
        <div style={{ position: "absolute", top: "20px", left: "-10px" }}>
          <TagsIcon />
          <span
            style={{
              position: "absolute",
              top: "33px",
              left: "55px",
              fontSize: 14,
              color: "#fff",
            }}
          >
            {data && data.article_tags}
          </span>
        </div>
      )}

      {data.article_img_url && (
        <div style={{ textAlign: "center" }}>
          <img
            ref={refImg}
            alt="example"
            style={imgStyle}
            src={`${host + data.article_img_url}`}
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
            dangerouslySetInnerHTML={{ __html: data.article_intro }}
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
            <Link
              to={{
                pathname: `/artcle-page/${data.article_id}`,
                state: { data },
              }}
            >
              阅读原文 »
            </Link>
          </Button>
        </div>
      )}
    </Card>
  );
}
