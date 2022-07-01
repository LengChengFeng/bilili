import React, { useEffect, useState } from "react";
import { Tabs } from "antd-mobile";
import VideoList from "../videoList";
import Swiper from "../swiper";
import { getRecommendSong, getMusicList } from "../../../network/home";

import swiper1 from "../../../assets/image/swiper1.webp";
import swiper2 from "../../../assets/image/swiper2.webp";
import swiper3 from "../../../assets/image/swiper3.webp";
import swiper4 from "../../../assets/image/swiper4.webp";

const menu = (props: any) => {
  const [videoList, setVideoList] = useState([]);
  const [menuItem, setMenuList] = useState<any>([]);
  const [swiperImg] = useState([swiper1, swiper2, swiper3, swiper4]);
  useEffect(() => {
    getRecommendSong({ type: 2, area: 7 }).then((res: any) => {
      let data = res.artists.splice(0, 8);
      setMenuList(data);
    });
    getMusicList({ id: 7763 }).then((res: any) => {
      setVideoList(res.songs);
    });
  }, []);
  const handleChange = (key: any) => {
    const songId = menuItem[key - 1].id;
    getMusicList({ id: songId }).then((res: any) => {
      setVideoList(res.songs);
    });
  };
  return (
    <div className="menu">
      <Tabs
        defaultActiveKey="1"
        style={{ fontSize: "1vw" }}
        onChange={(key) => handleChange(key)}
      >
        {menuItem.map((item: any, index: number) => {
          return (
            <Tabs.Tab title={item.name} key={index + 1}>
              {/* <Swiper imgList={swiperImg} /> */}
              {videoList && <VideoList list={videoList} />}
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </div>
  );
};
export default menu;
