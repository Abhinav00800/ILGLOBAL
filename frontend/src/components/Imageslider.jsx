import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Sample ship transport images (Replace these URLs with your own)
const images = [
  "https://www.globalialogisticsnetwork.com/blog/wp-content/uploads/2021/09/tracking-1.jpg",
  "https://jklogisticsgroup.com/wp-content/uploads/2023/09/Customs-Broker.png",
  "https://static.wixstatic.com/media/e1d346_7807378aa5554c88a1e581d59d372dec~mv2.png/v1/fill/w_1000,h_563,al_c,q_90,usm_0.66_1.00_0.01/e1d346_7807378aa5554c88a1e581d59d372dec~mv2.png",
  "https://www.shippingaviation.com/image/custom-clearing-agent.jpg"
];

function ImageSlider() {
  return (
    <div className="w-full max-w-screen-xl mx-auto my-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[500px] object-center rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlider;
