import axios from "axios";
import ReactDOM from "react-dom/client";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
const baseURL = "/api";
const service = axios.create({
  timeout: 50000, // 请求超时时间
  baseURL,
});

service.interceptors.request.use((config) => {
  const token = JSON.parse(window.localStorage.getItem("token") as any) || []
  console.log(token);
  
  
  if (token) {
    if (config.headers) {
      config.headers.Authorization = token;
    }
  }
  showLoading();
  return config;
});
service.interceptors.response.use(
  (res) => {
    hideLoading();
    return res.data;
  },
  (err) => {
    console.log(err);
    
    const ErrorStatus = err.response.status;
    hideLoading();
    if (ErrorStatus === 404) {
      message.error("服务器请求未找到~");
    }
    if (err.message === "Network Error") {
      message.warning("网络链接异常！");
    }

    if (err.code === "ECONNABORTED") {
      message.warning("请求超时，请重试");
    }

    return err.response;
  }
);
export default service;
let requestCount = 0;
// 显示loading
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function showLoading() {
  if (requestCount === 0) {
    var dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
    ReactDOM.createRoot(dom).render(
      <Spin indicator={antIcon} tip="loading..." />
    );
  }
  requestCount++;
}
// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    document.body.removeChild(
      document.getElementById("loading") as HTMLElement
    );
  }
}
