import React, { useState, useEffect } from "react";

import axios from "axios";
import { host } from "../conf";
import Icon from "@ant-design/icons";
export default function Header() {
    const [userInfo, setUserInfo] = useState();
    useEffect(() => {
      const getUserInfo = async () => {
        const res = await axios.get(`${host}searchPersonalInfo`);
        setUserInfo(res.data[0]);
      };
      getUserInfo();
    }, []);
  const svg = () => (
    <svg
      t="1597660169622"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="16371"
      width="64"
      height="64"
    >
      <path
        d="M464.655 592H392l50.62-160h63.722l-41.687 160z m125.658 0h-72.655l50.62-160H632l-41.687 160z"
        fill="#ffffff"
        p-id="16372"
      ></path>
    </svg>
  );
  const QuotationMarksIcon = (props) => <Icon component={svg} {...props} />;
  return (
    <header
      className="headertop filter-dot"
      style={{
        height: 969,
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          // "url(https://zankyo.cc/wp-content/themes/Sakura/cover/index.php?-11)",
          "url(https://api.ixiaowai.cn/mcapi/mcapi.php)",
        backgroundSize: "cover",
      }}
    >
      <div id="banner_wave_hide_transition">
        <div id="banner_wave_1"></div>
        <div id="banner_wave_2"></div>
      </div>
      <div className="focusinfo">
        {userInfo && (
          <div>
            <img
              alt="example"
              src={host + userInfo.user_image}
              style={{
                borderRadius: "100%",
                border: "2px dashed #fff",
                padding: "5px",
                width: "200px",
                height: "200px",
              }}
              className={"App-logo"}
            />
            <h1
              className="center-text glitch is-glitching Ubuntu-font"
              data-text={`Hey,${userInfo.name}!`}
            >
              Hey,{userInfo.name}!
            </h1>
            <h2 className="glitch is-glitching Ubuntu-font">
              <li id="bg-pre">
                <img
                  className="flipx"
                  alt="left"
                  src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg"
                />
              </li>
              <QuotationMarksIcon />
              <span style={{ verticalAlign: "0px" }}>{userInfo.autograph}</span>
              <QuotationMarksIcon />
              <li id="bg-next">
                <img
                  src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg"
                  alt="right"
                />
              </li>
            </h2>
          </div>
        )}
      </div>
    </header>
  );
}
