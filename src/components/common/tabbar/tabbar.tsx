import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IItabBar {
  title: string;
  img: any;
  activeImg: any;
  path: string;
}
interface IProps {
  tabBar: IItabBar[];
}

const useTabBar: React.FC<IProps> = (props) => {
  const { tabBar } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const handleTabbarClick = (index: number, path: string) => {
    setCurrentIndex(index);
    navigate(path);
  };
  return (
    <div
      className="tabBar"
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#f2f3f5",
      }}
    >
      <div
        className="tab"
        style={{
          display: "flex",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        {tabBar.map((item, index) => {
          return (
            <div
              className="tabbar-item"
              key={index}
              style={{ flex: 1, color: currentIndex == index ? "pink" : "" }}
              onClick={() => handleTabbarClick(index, item.path)}
            >
              <img
                src={currentIndex == index ? item.activeImg : item.img}
                alt=""
                style={{ height: "4vw", width: "4vw" }}
              />
              <span style={{ display: "block" }}> {item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default useTabBar;
