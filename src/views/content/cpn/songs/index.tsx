import React, { useEffect, useState,useRef } from "react";
import { useLocation, useParams } from "react-router";
import { getSingerMusic ,getMusicUrl} from "../../../../network/content";
import formatTime from "../../../../utils/format";
import Play from "../../../../assets/image/play.png";
import Pause from "../../../../assets/image/pause.png"
import { Toast } from "antd-mobile";
export default function index() {
  const [songList, setsongList] = useState<any>();
  const [musicUrl,setMusicUrl] = useState<string>("") 
  const [currentIndex,setCurrentIndex] = useState<any>(-999)
  const params = useParams();
  const info: any = useLocation();
  const audioRef = useRef<any>()
  useEffect(() => {
    getSingerMusic({ id: params.id }).then((res: any) => {
      setsongList(res.songs);
    });
  }, []);
  const playMusic = (item:any,index:any) => {
    getMusicUrl({id:item.id}).then((res:any)=>{
      if(res.data[0].url === null) {
        Toast.show({
          content:"没有该音频~"
        })
      }
      if(index === currentIndex) {
        audioRef.current.pause()
        setCurrentIndex(999)
      }else {
       audioRef.current && audioRef.current.play()
        
        setCurrentIndex(index)
      }
     
      setMusicUrl(res.data[0].url)
    })
  }
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
                key={index}
                style={{ display: "flex", padding: "10px", marginTop: "2vw" }}
              >
                <div className="index" style={{ width: "10%" }}>
                  {index}
                </div>
                <div className="play" style={{ width: "10%" }} onClick={()=>playMusic(item,index)}>
                  <img
                    src={currentIndex !== index ? Play : Pause}
                    alt=""
                    style={{ width: "5vw", height: "5vw",cursor:"pointer" }}
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
      <div className="play-music" style={{position:"fixed",bottom:"0",right:"0",width:"100%",zIndex:"999999999"}}>
        {musicUrl&& <audio ref={audioRef} src={musicUrl} autoPlay controls style={{width:"100%"}}></audio>}
      </div>
    </div>
  );
}
