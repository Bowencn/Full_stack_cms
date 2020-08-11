import React,{useEffect} from "react";
import Baacc from "../components/BarsAndAppreciationnCommonComponents";
import {Context} from '../utils/ContextState'
export default function SideInformation(props) {
  
  useEffect(() => {
    props.router(props.location.pathname)
  }, [])
  return (
    <div>
      <Context.Provider
        value={{
          headerName: "个人信息",
          requiredBar:"标题/名字",
          SpareColumn:"描述信息/签名"
        }}
      >
        <Baacc/>
      </Context.Provider>
    </div>
  );
}
