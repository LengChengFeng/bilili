import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { search } from "../../../../network/home";
import { Toast } from "antd-mobile";
// import { debounce } from "../../../../utils/debounce.js";
import { useNavigate } from "react-router";
export default function index() {
  const navigate = useNavigate();
  const [searchList, setSearchList] = useState<any>();
  const handleSearch = function (e: any) {
    search({ keywords: e.target.value }).then((res: any) => {
      console.log(res);
      setSearchList(res.result.songs);
    });
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const handleClick = (item: any) => {
    console.log(item);

    if (item.mv == 0) {
      Toast.show({
        content: "此歌曲没有MV",
      });
    } else {
      navigate(`/mv/${item.mvid}`);
    }
  };
  return (
    <div>
      <div className="nav" style={{ display: "flex", padding: "1vw" }}>
        <div className="seach" style={{ margin: "0 4vw", flex: "1" }}>
          <Input
            size="large"
            placeholder="爱你"
            prefix={<SearchOutlined />}
            bordered={false}
            onChange={(e) => handleSearch(e)}
            style={{
              borderRadius: "20px",
              backgroundColor: "#f2f3f5",
            }}
          />
        </div>
        <div className="cancel">
          <Button onClick={() => handleCancel()}>取消</Button>
        </div>
      </div>
      {searchList && (
        <div className="result">
          {searchList.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="result-item"
                style={{
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                  padding: "5px 10px ",
                  margin: "10px 0",
                }}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item.artists[0].name}-{item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
