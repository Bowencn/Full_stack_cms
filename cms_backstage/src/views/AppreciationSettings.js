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
    <Context.Provider
      value={{
        headerName: "文章赞赏设置",
        requiredBar: "支付方式",
      }}
    >
      <Baacc />
    </Context.Provider>
  );
}
