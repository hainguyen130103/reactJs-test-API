/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./index.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Carousel({ numberOfSiles = 1, autoplay = false }) {
  const [orchids, setOrchids] = useState([]);
  const fetchMovies = async () => {
    const res = await axios.get(
      "https://6639cdef1ae792804becd314.mockapi.io/orchids",
    );
    console.log(res.data);
    setOrchids(res.data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={numberOfSiles}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={
          autoplay
            ? [Autoplay, Pagination, Navigation]
            : [Pagination, Navigation]
        }
        className={`carousel ${numberOfSiles > 1 ? "multi-item" : ""}`} //toán tử 3 ngôi
      >
        {orchids.map((orchids) => (
          <SwiperSlide>
            <img className="carousel__img" src={orchids.image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
