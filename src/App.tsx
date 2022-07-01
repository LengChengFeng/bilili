import { HashRouter } from "react-router-dom";
import Router from "./router";

import React from "react";
import Tabbar from "./components/common/tabbar/tabbar";
import Home from "./assets/image/home.png";
import Content from "./assets/image/content.png";
import Buy from "./assets/image/buy.png";
import Mine from "./assets/image/mine.png";

import HomeActive from "./assets/image/home_active.png";
import ContentActive from "./assets/image/content_active.png";
import BuyActive from "./assets/image/buy_active.png";
import MineActive from "./assets/image/mine_active.png";

import "./assets/css/common.css";

function Loading() {
  return <h2>loading</h2>;
}

export default function App() {
  const tabBar = [
    {
      title: "首页",
      img: Home,
      activeImg: HomeActive,
      path: "/home",
    },
    {
      title: "动态",
      img: Content,
      activeImg: ContentActive,
      path: "/content",
    },
    {
      title: "会员购",
      img: Buy,
      activeImg: BuyActive,
      path: "/buy",
    },
    {
      title: "我的",
      img: Mine,
      activeImg: MineActive,
      path: "/mine",
    },
  ];
  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        <HashRouter>
          <Router />
          <Tabbar tabBar={tabBar} />
        </HashRouter>
      </React.Suspense>
    </div>
  );
}
