import React, { useState, useEffect } from "react";
import WarningPage from "../WarningPage";
import axios from "axios";
import { host } from "../../conf";
import CardTemplate from "../../components/CardTemplate";
import { Spin } from "antd";
export default function NodejsView(props) {
  const [articleList, setArticleList] = useState();
  const [warning, setwarning] = useState(false);
  useEffect(() => {
    const search = async () => {
      const res = await axios.post(`${host}searchArticleInfoWithTag`, {
        tags: props.page,
      });
      let data = res.data.data;
      if (data.length !== 0) {
        data.forEach((item, index) => {
          item.key = index;
        });
        setArticleList(data);
      } else {
        setwarning(true);
      }
    };
    search();
  }, []);
  return (
    <main style={{ margin: "20px auto" }}>
      {!warning ? (
        <div className="example" style={{ width: "772px", minWidth: "700px" }}>
          {articleList ? (
            articleList.map((item, index) => (
              <CardTemplate homePage data={item} key={index} />
            ))
          ) : (
            <Spin />
          )}
        </div>
      ) : (
        <WarningPage />
      )}
    </main>
  );
}
