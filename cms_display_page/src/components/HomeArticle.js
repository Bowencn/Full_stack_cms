import React, { useState, useEffect } from "react";
import CardTemplate from "./CardTemplate";
import axios from "axios";
import { Spin } from "antd";
const localhost = "http://localhost:10086/";

export default function HomeArticle() {
  const [articleList, setArticleList] = useState();
  useEffect(() => {
    const getArticle = async () => {
      const res = await axios.get(`${localhost}searchArticleInfo`);
      let data = res.data.reverse();
      data.forEach((item, index) => {
        item.key = index;
      });
      console.log(data);
      setArticleList(data);
    };
    getArticle();
  }, []);
  return (
    <div className="example">
      {articleList ? (
        articleList.map((item, index) => (
          <CardTemplate homePage data={item} key={index} />
        ))
      ) : (
        <Spin />
      )}
    </div>
  );
}
