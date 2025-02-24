import React from "react";
import Slider from "react-slick";

export default function TopNavSlider() {
  /* Slider */
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false ,

  };

  return (
    <>
    <div className="navbar-slider bg-gray-900 text-white fixed top-0 right-0 left-0 z-20 text-[10px] md:text-sm py-2 text-nowrap text-center dark:bg-[#f3f5ed]  dark:text-gray-900">
      <Slider {...settings}>
        <h4>
          <i className="fa-solid fa-truck me-2 text-white dark:text-gray-900"></i>
          CLICK & COLLECT- FREE DELIVERY
        </h4>
        <h4>
          <i className="fa-solid fa-gift me-2 text-white dark:text-gray-900"></i>
          GRAB THE SPECIAL INSTALLMENT OPPORTUNITY FOR NBE CARDS
        </h4>
        <h4>
          <i className="fa-solid fa-cloud-arrow-down me-2 text-white dark:text-gray-900"></i>
          DOWNLOAD APP - %10 OFF YOUR FIRST ORDER | CODE: HEY10
        </h4>
      </Slider>
    </div>
  </>
  
  );
}
