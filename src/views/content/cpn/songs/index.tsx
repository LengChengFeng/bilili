import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { getSingerMuisc } from "../../../../network/content";
import formatTime from "../../../../utils/format";
import Play from "../../../../assets/image/play.png";
export default function index() {
  const [songList, setsongList] = useState<any>();
  const params = useParams();
  const info: any = useLocation();
  console.log(location);

  useEffect(() => {
    getSingerMuisc({ id: params.id }).then((res: any) => {
      console.log(res);
      setsongList(res.songs);
    });
  }, []);
  return (
    <div style={{ padding: "10px 20px" }}>
      <h2>{info.state.name}</h2>
      <div className="cover" style={{ height: "60vw" }}>
        <img
          src={info.state.url}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="song">
        {songList &&
          songList.map((item: any, index: any) => {
            return (
              <div
                className="song-list"
                key={item.id}
                style={{ display: "flex", padding: "10px", marginTop: "2vw" }}
              >
                <div className="index" style={{ width: "10%" }}>
                  {index}
                </div>
                <div className="play" style={{ width: "10%" }}>
                  <img
                    src={Play}
                    alt=""
                    style={{ width: "5vw", height: "5vw" }}
                  />
                </div>
                <div
                  className="song-name"
                  style={{
                    width: "40%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </div>
                <div
                  className="dt"
                  style={{ width: "20%", textAlign: "center" }}
                >
                  {formatTime(item.dt)}
                </div>
                <div
                  className="author"
                  style={{
                    width: "20%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.al.name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
