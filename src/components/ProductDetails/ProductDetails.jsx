import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";
import Slider from "react-slick";

export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);
  const { isProductInWishList, toggleWishList } = useContext(WishlistContext);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isHeartLoading, setIsHeartLoading] = useState(false);

  // Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    
  };

  //  Function to handle add product to cart when clicking on the button on Product Deatils Page
  const handleAddProductToCart = async (params) => {
    setIsAddLoading(true);
    const res = await addProductToCart(id);
    setIsAddLoading(false);
    if (res) {
      toast.success("Added to Cart!", {
        duration: 3000,
        position: "bottom-right",
      });
    } else {
      toast.error("Oops! Something went wrong");
    }
  };

  const getProductDetails = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });
  const productDeatilsObj = data?.data.data;

  if (isError) {
    return (
      <div className="flex justify-center items-center h-lvh">
        <h2 className="text-red-600 text-2xl"> No Product Found </h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-lvh">
        <BeatLoader size={40} color={"#057A55"} />
      </div>
    );
  }

  // Function to handle toggle (add/remove) item from wishlist
  const handleToggleWishlist = async (id, e) => {
    e.preventDefault();
    setIsHeartLoading(true);
    const res = await toggleWishList(id);
    setIsHeartLoading(false);
    if (res) {
      toast.success(
        isProductInWishList(id)
          ? "Removed from wishlist!"
          : "Added to wishlist successfully!",
        { duration: 2000, position: "bottom-right" }
      );
    } else {
      toast.error("Oops! Error occurred", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <div className="py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">
            <div className="mx-5  bg-[#f3f5ed] dark:bg-gray-800 rounded-lg shadow-xl md:col-span-2 flex justify-center items-center ">
              {/* Image Slider */}
              <Slider {...settings} className="w-full h-full ">
                {productDeatilsObj.images.map((src) => (
                  <img
                    key={src} // Using index as the key for images
                    src={src}
                    alt={productDeatilsObj.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ))}
              </Slider>
            </div>

            {/* Product Details & Wishlist Toggle */}
            <div className="bg-[#f3f5ed] dark:bg-gray-700 p-8 m-8 rounded-lg shadow-2xl md:col-span-4 h-fit relative flex flex-col justify-center">
              {/* Button - Add to wishlist */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) =>
                    handleToggleWishlist(productDeatilsObj._id, e)
                  }
                  className={`text-3xl ${
                    isProductInWishList(productDeatilsObj._id)
                      ? "text-red-600"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {isHeartLoading ? (
                    <i className="fa-solid fa-spin fa-spinner font-medium text-red-600 text-lg"></i>
                  ) : (
                    <i className="fa-solid fa-heart"></i>
                  )}
                </button>
              </div>

              {/* Sale Banner */}
              {productDeatilsObj.priceAfterDiscount ? (
                <div className="bg-yellow-300 p-2 text-gray-900 rounded-md font-bold text-xl w-fit animate-pulse mb-4">
                  <span className="font-bold">
                    Sale!{" "}
                    {parseInt(
                      ((Number(productDeatilsObj.price) -
                        Number(productDeatilsObj.priceAfterDiscount)) /
                        Number(productDeatilsObj.price)) *
                        100
                    )}
                    %
                  </span>
                  <i className="fa-solid fa-tag ml-2"></i>
                </div>
              ) : productDeatilsObj.priceAfterDiscount === 0 ? (
                ""
              ) : (
                ""
              )}

              {/* Title */}
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {productDeatilsObj.title}
              </h1>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
                {productDeatilsObj.description}
              </p>

              {/* Category */}
              <div className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
                {productDeatilsObj.category.name}
              </div>

              {/* Price & Rating */}
              <div className="flex justify-between items-center mb-5">
                {productDeatilsObj.priceAfterDiscount ? (
                  <div className="flex flex-nowrap justify-center items-center">
                    <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {productDeatilsObj.priceAfterDiscount} EGP
                    </span>
                    <span className="line-through text-red-700 pl-3 font-light text-lg">
                      {productDeatilsObj.price} EGP
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {productDeatilsObj.price} EGP
                  </span>
                )}

                <span className="flex items-center gap-1 text-2xl text-gray-900 dark:text-gray-200">
                  {productDeatilsObj.ratingsAverage >= 3 ? (
                    <i className="fa-solid fa-star text-green-700"></i>
                  ) : (
                    <i className="fa-solid fa-star text-red-700"></i>
                  )}
                  {productDeatilsObj.ratingsAverage}
                </span>
              </div>

              {/* Quantity */}
              <div className="text-xl text-gray-500 dark:text-gray-400 mb-5">
                Quantity: {productDeatilsObj.quantity}
              </div>

              {/* Call to Action Button */}
              <button
                onClick={handleAddProductToCart}
                className="w-full font-bold text-xl py-3 px-8 bg-gradient-to-r from-green-400 to-green-600 text-white dark:from-green-600 dark:to-green-800 rounded-lg hover:from-green-500 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-900 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {isAddLoading ? (
                  <i className="fa-solid fa-spin fa-spinner font-medium text-white text-lg"></i>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
