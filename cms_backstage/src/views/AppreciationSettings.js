import React, { useEffect } from "react";
import Baacc from "../components/BarsAndAppreciationnCommonComponents";
import { Context } from "../utils/ContextState";

export default function AppreciationSettings(props) {
  let router = props.router;
  let pathName = props.location.pathname;
  useEffect(() => {
    router(pathName);
  }, []);
  return (
    <div style={{ padding: "0 170px 32px 64px" }}>
      <h1
        style={{
          marginTop: "8px",
          marginBottom: "20px",
          fontSize: "30px",
          fontWeight: "500",
        }}
      >
        赞赏设置
      </h1>
      <Context.Provider
        value={{
          headerName: "文章赞赏设置",
          requiredBar: "支付方式",
        }}
      >
        <Baacc />
      </Context.Provider>
    </div>
  );
}
