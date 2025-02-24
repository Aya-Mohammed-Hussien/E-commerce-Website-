import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImage1 from '../../assets/images/First Home Slider/E-grocery.jpg'
import sliderImage2 from '../../assets/images/First Home Slider/istock-639223110-3.avif'
import sliderImage3 from '../../assets/images/First Home Slider/Shutterstock_1875797686-1030x541.png'
import fixedSlider1 from "../../assets/images/First Home Slider/slider-image-2.jpeg"
import fixedSlider2 from "../../assets/images/First Home Slider/wp6836093.jpg"

function HomeFirstSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false ,
    autoplay: true,               
    autoplaySpeed: 2000,          
    pauseOnHover: true,
  };
  return (
   <div className="flex px-4 md:px-20 py-5">
     <div className="slider-container w-full md:w-3/4">
      <Slider {...settings}>
        <div>
          <img className="fixed-slider" alt="HomeSliderImage1" src={ sliderImage1} />
        </div>
        <div>
          <img className="fixed-slider" alt="HomeSliderImage2" src={ sliderImage2} />
        </div>
        <div>
          <img className="fixed-slider" alt="HomeSliderImage3" src={ sliderImage3} />
        </div>
      </Slider>
    </div>
    <div className="hidden md:block md:w-1/4">
       <img className="w-full h-48 block object-cover " src={fixedSlider1} alt="FixedHomeSlider1"/>
       <img className="w-full h-48 block object-cover " src={fixedSlider2} alt="FixedHomeSlider2"/>
    </div>
   </div>
  );
}

export default HomeFirstSlider;





















