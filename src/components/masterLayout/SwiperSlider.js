import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../assets/css/swiper.css";
// import required modules
import { Pagination } from "swiper";
const SwiperData = require("../../components/jsonData/SwiperData.json");

const banner01 = require('../../assets/images/banner01.jpg')

const SwiperSlider = () => {
  return (
    <div className="pt-3 mt-5">
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
      {/* <SwiperSlide><div className="image-div"><img src={banner01} alt="-"/></div></SwiperSlide> */}
        {SwiperData ? (
          SwiperData.map((item, i) => {
            return (
              <>
                <SwiperSlide key={i}>
                  <img alt="" src={item.image}/>
                </SwiperSlide>
              </>
            );
          })
        ) : (
          <div> </div>
        )}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
