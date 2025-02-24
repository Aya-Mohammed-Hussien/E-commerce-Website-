import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { categoryContext } from "../../Context/CategoryContext";
import { BeatLoader } from "react-spinners";

function CategorySlider() {
  const { isError, isLoading, categories } = useContext(categoryContext);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-lvh ">
        <BeatLoader size={40} color={"#057A55"} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-lvh">
        <h2 className="text-red-600 text-2xl"> An Error Occured </h2>
      </div>
    );
  }

    /* Slider */
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <h2 className="heading-style"> Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category._id}>
            <div className="flex flex-col items-center">
              <img
                className="w-56 h-56 rounded-full object-cover p-2"
                src={category.image}
                alt={category.name}
              />
              <h3 className="text-xl font-semibold  text-center text-gray-400 m-2">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
