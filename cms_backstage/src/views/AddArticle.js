import React from "react";
import Baacc from "../components/BarsAndAppreciationnCommonComponents";
import { Context } from "../utils/ContextState";

export default function AddArticle(props) {
  console.log(props)
  return (
    <div>
      <Context.Provider
        value={{
          headerName: props.location.state?"编辑文章":"添加文章",
          requiredBar: "标题",
          CategoryBar:"分类",
          textArea:true
        }}
      >
        <Baacc editData={props}/>
      </Context.Provider>
    </div>
  );
}
