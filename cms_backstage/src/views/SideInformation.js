import React, { useEffect } from "react";
import Baacc from "../components/BarsAndAppreciationnCommonComponents";
import { Context } from "../utils/ContextState";
export default function SideInformation(props) {
  useEffect(() => {
    props.router(props.location.pathname);
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
        个人信息
      </h1>
      <Context.Provider
        value={{
          headerName: "个人信息",
          requiredBar: "标题/名字",
          SpareColumn: "描述信息/签名",
        }}
      >
        <Baacc />
      </Context.Provider>
    </div>
  );
}
