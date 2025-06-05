import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "./Gallery.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function ({ data }) {
  const params = {
    loop: true,
    grabCursor: true,
    slideToClickedSlide: true,
    speed: 600,

    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
      clickable: true,
    },
    modules: [Pagination],
  };

  return (
    <section className="gallery container">
      <Swiper {...params}>
        {data?.images.map((image, index) => (
          <SwiperSlide key={index} className="gallery__slide">
            <Image src={image} alt="project" fill />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
