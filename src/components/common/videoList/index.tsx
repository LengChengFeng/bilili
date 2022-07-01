import React from "react";
import formatTime from "../../../utils/format";
import { Toast } from "antd-mobile";
import { useNavigate } from "react-router";
import Mv from "../../../assets/image/MV.png";
const videoList = (props: any) => {
  console.log(props.list);
  const navigate = useNavigate();
  const goPlay = (item: any) => {
    console.log(item);
    if (item.mv == 0) {
      Toast.show({
        content: "此歌曲没有MV",
      });
    } else {
      navigate(`/mv/${item.mv}`);
    }
  };
  return (
    <div
      className="video-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {props.list.map((item: any, index: any) => {
        return (
          <div
            onClick={() => goPlay(item)}
            key={index}
            style={{
              width: "48%",
              height: "45vw",
              marginRight: "1%",
              marginBottom: "15px",
              borderRadius: "10px",
              padding: "0 10px",
            }}
          >
            <div className="cover" style={{ position: "relative" }}>
              <img
                src={item.al.picUrl}
                alt=""
                style={{ width: "100%", height: "42vw", borderRadius: "10px" }}
              />
              <div
                className="duration"
                style={{
                  position: "absolute",
                  bottom: "1vw",
                  right: "1vw",
                  color: "#fff",
                }}
              >
                {formatTime(item.dt)}
              </div>
              <div
                className="duration"
                style={{
                  position: "absolute",
                  bottom: "1vw",
                  left: "1vw",
                  color: "#fff",
                }}
              >
                {item.mv !== 0 && (
                  <img
                    src={Mv}
                    alt=""
                    style={{ width: "6vw", height: "6vw" }}
                  />
                )}
              </div>
            </div>
            <div
              className="author"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <span>
                {item.ar[0].name}
                <span style={{ margin: "0 1vw" }}>-</span>
                {item.al.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default videoList;
