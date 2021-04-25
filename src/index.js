import React from "react";
import ReactDOM from "react-dom";
import Router from "./route/router";
import zhCN from "antd/es/locale/zh_CN";
import "moment/locale/zh-cn";
import { ConfigProvider } from "antd";
import "antd/dist/antd.less";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
