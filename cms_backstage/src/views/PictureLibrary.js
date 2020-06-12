import React, { useState, useEffect, useRef } from "react";
import { Card } from "antd";
import img0 from "../assets/0.jpg";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import axios from "axios";
// import fs from 'fs'
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);
export default function PictureLibrary() {
  const { Meta } = Card;
  const [layouts, setLayouts] = useState();
  // const [rendering, setRendering] = useState();
  const [imgURL, setImgURL] = useState([
    { name: 0, url: img0 },
    { name: 1, url: img1 },
    { name: 2, url: img2 },
    { name: 3, url: img3 },
    { name: 4, url: img4 },
    { name: 5, url: img5 },
    { name: 6, url: img6 },
  ]);
  const localhost = "http://localhost:10086/";
  useEffect(() => {
    const getAllImg = async () => {
      const res = await axios.get(`${localhost}queryImageInfo`);
      console.log(res);
      let data = res.data;
      setImgURL(data);
    };
    getAllImg();
  }, []);
  const couterRef = useRef();
  
  useEffect(() => {
    const lay = () => {
      let layout = [];
      let y = 4;
      let proportion = 2;
      let height;
      let width;
      imgURL.map((item, index) => {
        console.log(couterRef.current.firstChild.children[index]);
        if (couterRef.current.firstChild.children[index]) {
          width =
            couterRef.current.firstChild.children[index].children[0].children[0]
              .children[0].naturalWidth;
          height =
            couterRef.current.firstChild.children[index].children[0].children[0]
              .children[0].naturalHeight;
          proportion = (2 * Math.round((height / width) * 100)) / 100 + 1;
        }
  
        layout.push({
          x: ((index * 2) % 8) + 1,
          //平分
          // layout[index - y]
          //   ? layout[index - y].x
          //   : layout[index - 1]
          //   ? layout[index - 1].w * index + index
          //   : 0,
          y: layout[index - y] ? layout[index - y].h : 0,
          w: 2,
          h: proportion, //Math.round(3*proportion)
          i: index.toString(),
        });
  
        console.log(index, layout[index]);
        return true;
      });
      return layout;
    };
    let layout = lay();
    setLayouts({ lg: layout });
    console.log("ready");
  }, [imgURL]);
  return (
    <div ref={couterRef}>
      {layouts ? (
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          layouts={layouts}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          useCSSTransforms={true}
          isDraggable={false}
          isResizable={false}
          autoSize={true}
          // containerPadding={[15,15]}
          // margin={[10,10]}
        >
          {imgURL.map((item, index) => (
            <Card
              key={index}
              hoverable
              // style={{ width: 300 }}
              cover={
                <div>
                  <img
                    alt={item.original_name}
                    src={localhost + item.destination + item.filename}
                    style={{ width: "100%" }}
                  />
                </div>
              }
            >
              <Meta
                title={item.original_name}
                description={localhost}
              />
            </Card>
          ))}
        </ResponsiveGridLayout>
      ) : (
        <div>wait...</div>
      )}
      {/* <Row>
        <Col>图片库：</Col>
      </Row>
      <Row gutter={[16, 16]}>
        {imgURL.map((index) => (
          <Col span={test}>
            <Card
              hoverable
              style={{ width: 300 }}
              cover={
                <div>
                  <img
                    alt="example"
                    src={index.url}
                    style={{ width: "100%" }}
                  />
                </div>
              }
            >
              <Meta title={index.name} description="www.instagram.com" />
            </Card>
          </Col>
        ))} */}
      {/* <Col span={test}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={test}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={test}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={test}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={test}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col> */}
      {/* </Row> */}
    </div>
  );
}
