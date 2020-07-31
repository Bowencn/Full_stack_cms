import React, {  useState } from "react";
import CardTemplate from "../components/CardTemplate";
import {
  Divider,
  Row,
  Col,
  Typography,
  Card,
  Anchor,
  Affix
} from "antd";
const { Link } = Anchor;
const {  Text } = Typography;
export default function ArticlePage(props) {
  const [data] = useState(props.location.state.data)
  console.log(props.location.state)
  return (
    <div className="main-wrapper" style={{ padding: "30px 10%" }}>
      <Row>
        <Col span={13} offset={3}>
          <CardTemplate content data={data}/>
        </Col>
        <Col span={5} style={{ marginLeft: "30px" }}>
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
                src="http://104.36.67.35:10086/uploads/06258b520a51e6a9c88e687eb48548b6"
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
          {/* <div style={{ marginTop: "20px" }}>
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
          </div> */}
          </Affix>
        </Col>
      </Row>
    </div>
  );
}
