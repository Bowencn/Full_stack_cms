import React, { useState, useEffect } from "react";
import CardTemplate from "../components/CardTemplate";
import { Row, Col, BackTop } from "antd";
export default function ArticlePage(props) {
  const [backTop, setBackTop] = useState(true);
  const [data] = useState(props.location.state.data);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (navigator.userAgent.indexOf("Windows") === -1) {
      alert("PC端浏览最佳");
      setBackTop(false);
    } else {
      setBackTop(true);
      console.log("windows");
    }
  }, []);
  return (
    <div className="main-wrapper" style={{ padding: "30px 10%" }}>
      <Row>
        <Col xl={{ span: 14, offset: 5 }}>
          <CardTemplate content data={data}/>
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
        {/* <Col span={5} style={{ marginLeft: "30px" }}>
          <Affix offsetTop={30}>
          <Card hoverable style={{ padding: "16px 20px" }}>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row ",
                justifyContent: "center",
              }}
            >
              <img
                alt="example"
                src="http://localhost:10087/uploads/b6c5307ab3688d45e251a79eaaf17580"
                style={{
                  borderRadius: "100%",
                  border: "2px dashed #000",
                  padding: "5px",
                  width: "100px",
                  height: "100px",
                }}
                className={"App-logo"}
              />
              <Text strong style={{ writingMode: "vertical-lr" }}>
                •
              </Text>
              <Text
                strong
                style={{
                  writingMode: "vertical-lr",
                  letterSpacing: "1px",
                }}
              >
                云想衣裳花想容
              </Text>
            </div>
            <Divider />
            <div style={{ textAlign: "center" }}>
              <Text strong>瓜瓜瓜大魔王</Text>
            </div>
          </Card>
          <div style={{ marginTop: "20px" }}>
            <Text strong style={{ marginLeft: "15px" }}>
              目录
            </Text>
            <Anchor
              showInkInFixed={true}
              style={{ paddingLeft: "25px", paddingTop: "10px" }}
            >
              <Link href="/" title="介绍" style={{ fontWeight: "600" }} />
              <Link href="/" title="设计资源" style={{ fontWeight: "600" }}>
                <Link href="/" title="设计原则" />
                <Link href="/" title="设计模式" />
                <Link href="/" title="设计资源" />
              </Link>
            </Anchor>
          </div>
          </Affix>
        </Col> */}
      </Row>
    </div>
  );
}
