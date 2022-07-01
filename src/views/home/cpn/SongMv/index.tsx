import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getSongMv,
  getSongMvDetail,
  getDetail,
  getComment,
} from "../../../../network/home";
import CommentIcon from "../../../../assets/image/comment.png";
import Share from "../../../../assets/image/share.png";
import Collect from "../../../../assets/image/collect.png";

import Like from "../../../../assets/image/like.png";
import Dislike from "../../../../assets/image/dislike.png";

import { Avatar, Comment, Tooltip } from "antd";
import moment from "moment";
export default function index() {
  const params = useParams();
  const navigate = useNavigate();
  const [mvList, setMvList] = useState<any>(null);
  const [songDetail, setSongDetail] = useState<any>(null);
  const [mvInfo, setMvInfo] = useState<any>(null);
  const [commentInfo, setCommentInfo] = useState<any>(null);
  useEffect(() => {
    getSongMv({ id: params.id }).then((res) => {
      console.log(res.data);
      setMvList(res.data);
      getSongMvDetail({ mvid: params.id }).then((res) => {
        console.log(res);
        setMvInfo(res);
      });
    });
    getDetail({ mvid: params.id }).then((res) => {
      setSongDetail(res);
    });
    getComment({ id: params.id }).then((res: any) => {
      console.log(res);
      setCommentInfo(res.hotComments);
    });
  }, []);
  const goback = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="video" style={{ position: "relative" }}>
        {mvList && (
          <video
            src={mvList.url}
            controls
            autoPlay
            style={{ width: "100%" }}
          ></video>
        )}
        <div
          className="goback"
          onClick={() => goback()}
          style={{
            position: "absolute",
            top: "20px",
            left: "0",
            color: "white",
          }}
        >
          返回
        </div>
      </div>

      {songDetail && (
        <div className="song-detail" style={{ padding: "2px 10px" }}>
          <div className="song-desc" style={{ color: "#3c3c3c" }}>
            {songDetail.data.desc}
          </div>
          <div
            className="author"
            style={{ textAlign: "right", color: "#ee6a96" }}
          >
            {songDetail.data.artistName}-{songDetail.data.name}
          </div>
        </div>
      )}

      {mvInfo && (
        <div
          className="mv-info"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 10px",
          }}
        >
          <div className="comment">
            <img
              src={CommentIcon}
              alt=""
              style={{ width: "5vw", height: "5vw", verticalAlign: "top" }}
            />
            评论：{mvInfo.commentCount}
          </div>
          <div className="share">
            <img
              src={Share}
              alt=""
              style={{ width: "5vw", height: "5vw", verticalAlign: "top" }}
            />
            分享:{mvInfo.shareCount}
          </div>
          <div className="collect">
            <img
              src={Collect}
              alt=""
              style={{ width: "5vw", height: "5vw", verticalAlign: "top" }}
            />
            收藏:{mvInfo.likedCount}
          </div>
        </div>
      )}

      <div className="comment-info" style={{ padding: "0 10px" }}>
        {commentInfo &&
          commentInfo.map((item: any, index: any) => {
            return (
              <div
                className="comment"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                <Comment
                  key={index}
                  author={<a>{item.user.nickname}</a>}
                  avatar={<Avatar src={item.user.avatarUrl} alt="Han Solo" />}
                  content={<p>{item.content}</p>}
                  datetime={
                    <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                      <span>{item.timeStr}</span>
                    </Tooltip>
                  }
                />
                <div
                  className="opt"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px 0",
                  }}
                >
                  <div className="like">
                    <img
                      src={Like}
                      alt=""
                      style={{
                        width: "5vw",
                        height: "5vw",
                        verticalAlign: "top",
                      }}
                    />
                    {item.likedCount}
                  </div>
                  <div className="dislike">
                    <img
                      src={Dislike}
                      alt=""
                      style={{
                        width: "5vw",
                        height: "5vw",
                        verticalAlign: "top",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
