import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import "swiper/css/bundle";

interface IIprops {
  imgList: any[];
}

const MySwiper = (props: IIprops) => {
  return (
    <div style={{ width: "560px" }}>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 2000 }}
        navigation
        loop
        pagination={{ clickable: true }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        style={{
          width: "560px",
          height: "410px",
          margin: "20px",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        {props.imgList.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              style={{ width: "560px", height: "410px" }}
            >
              <img
                src={item}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default MySwiper;
