import React from "react";
import Baacc from "../components/BarsAndAppreciationnCommonComponents";
import {Context} from '../utils/ContextState'

export default function AppreciationSettings() {
  return (
    <Context.Provider
        value={{
          headerName: "文章赞赏设置",
          requiredBar:"支付方式"
        }}
      >
        <Baacc/>
      </Context.Provider>
  );
}
