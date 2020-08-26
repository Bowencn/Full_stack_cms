import React, { useEffect } from "react";
import Baacc from "../components/BarsAndAppreciationnCommonComponents";
import { Context } from "../utils/ContextState";

export default function AddArticle(props) {
  const { router } = props;
  useEffect(() => {
    router(props.location.pathname);
  }, [router,props.location.pathname]);
  return (
    <div className="add-article">
      <h1
        style={{
          marginTop: "8px",
          marginBottom: "20px",
          fontSize: "30px",
          fontWeight: "500",
        }}
      >
       { props.location.state?"编辑文章":"添加文章"}
      </h1>
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
