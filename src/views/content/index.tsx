import { Toast } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getHotSinger} from "../../network/content";
export default function index() {
  const [singer, setSinger] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getHotSinger().then((res: any) => {
      setSinger(res.artists);
    });
  }, []);
  const handleClick = (item: any) => {
    console.log(item);
    const token = JSON.parse(window.localStorage.getItem("token") as any) || []
    if(!token) {
      Toast.show({
        content:"请先登录~"
      })
      return false
    }
    navigate(`/song/${item.id}`, {
      state: { name: item.name, url: item.img1v1Url },
    });
  };
  return (
    <div style={{ height: "100vh - 40px" }}>
      <div className="nav" style={{ padding: "10px 20px" }}>
        <h2>热门歌手</h2>
        <div
          className="line"
          style={{ borderBottom: ".5vw solid #c20c0c" }}
        ></div>
        {singer && (
          <div
            className="singer"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginTop: "2vw",
            }}
          >
            {singer.map((item: any) => {
              return (
                <div
                  className="singer-item"
                  key={item.id}
                  style={{ width: "23%", marginBottom: "2vw" }}
                  onClick={() => handleClick(item)}
                >
                  <div className="singer-cover">
                    <img
                      src={item.img1v1Url}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="singer">
                    <span>{item.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
