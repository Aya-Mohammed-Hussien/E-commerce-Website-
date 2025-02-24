import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function WishList() {
  const { addProductToCart } = useContext(cartContext);
  const { wishlist, removeFromWishlist, pageLoading } =
    useContext(WishlistContext);
  const [showFavourits, setShowFavourits] = useState(false);
  const [isLoading, setIsLoading] = useState({
    productId: null,
    buttonType: null,
  });

  useEffect(() => {
    setShowFavourits(true);
  }, []);

  // Function to handle add product to cart / remove product from wishlist
  const handleAddAndRemoveProduct = async (id, button) => {
    setIsLoading({ productId: id, buttonType: button });
    try {
      if (button === "add") {
        const res = await addProductToCart(id);
        setIsLoading({ productId: null, buttonType: null });
        if (res) {
          toast.success("Added to Cart!", {
            duration: 2000,
            position: "bottom-right",
          });
        } else {
          toast.error("Oops! Error occurred", {
            duration: 2000,
            position: "bottom-right",
          });
        }
      } else if (button === "remove") {
        const result = await removeFromWishlist(id);
        setIsLoading({ productId: null, buttonType: null });
        if (result) {
          toast.success("Removed from Favourites!", {
            duration: 2000,
            position: "bottom-right",
          });
        } else {
          toast.error("Oops! Error occurred", {
            duration: 2000,
            position: "bottom-right",
          });
        }
      }
    } catch (error) {
      setIsLoading({ productId: null, buttonType: null });
      console.log("error", error);
      throw new Error("Failed to add/remove product");
    }
  };

  return (
    <>
      {pageLoading && wishlist.length === 0 ? (
        <div className="flex justify-center items-center h-lvh">
          <BeatLoader size={40} color={"#057A55"} />
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-24">
          <h3 className="text-xl text-gray-600 dark:text-gray-300">
            Your wishlist is empty.
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
            Browse our products and add your favorites!
          </p>
          <Link
            to={"/"}
            className="mt-4 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg hover:from-green-500 hover:to-green-700 dark:bg-gradient-to-r dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 transition duration-300"
          >
            Go to Home Page
          </Link>
        </div>
      ) : (
        <div className="p-4 container mx-auto">
          {/* Heading */}
          <h2 className="heading-style text-gray-900">
            Your Favorite Picks, All in One Place
          </h2>

          {/* Product List */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-5 mt-8 px-8 md:px-5 mb-4">
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-5 w-full">
                {wishlist.map((product) => (
                  <div
                    key={product.id}
                    className={`transform transition-all duration-700 ease-in-out ${
                      showFavourits
                        ? "opacity-100 animate-slide-up"
                        : "opacity-0"
                    } w-full px-4 rounded-lg shadow-xl shadow-gray-500 dark:shadow-gray-900 relative flex flex-col h-full md:h-[400px]`}
                  >
                    {/* Sale Banner */}
                    {product.priceAfterDiscount ? (
                      <div className="absolute -top-2 -left-2 p-2 transform bg-yellow-300 -rotate-12 text-gray-900 rounded-md font-medium inline-flex items-center space-x-1 z-10 shadow-lg hover:scale-105 transition-transform duration-200">
                        <span className="text-sm font-bold">
                          Sale!{" "}
                          {parseInt(
                            ((Number(product.price) -
                              Number(product.priceAfterDiscount)) /
                              Number(product.price)) *
                              100
                          )}
                          %
                        </span>
                        <i className="fa-solid fa-tag text-xs"></i>
                      </div>
                    ) : product.priceAfterDiscount === 0 ? (
                      ""
                    ) : (
                      ""
                    )}

                    {/* Product-Image */}
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="object-cover w-full mb-2 h-80 md:h-64 rounded-lg transition-all duration-300  hover:scale-105  hover:shadow-lg  dark:hover:shadow-md"
                    />

                    <div className="flex flex-col justify-between flex-grow">
                      {/* Product Title */}
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h2>

                      {/* Category */}
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                        {product.category.name}
                      </p>

                      {/* Price */}
                      <div className="flex justify-between items-center">
                        <div>
                          {product.priceAfterDiscount ? (
                            <>
                              <span className="text-gray-900 dark:text-gray-200">
                                {product.priceAfterDiscount}EGP
                              </span>
                              <span className="line-through text-red-700 pl-2 font-light">
                                {product.price}EGP
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-900 dark:text-gray-200">
                              {product.price}EGP
                            </span>
                          )}
                        </div>
                        <span className="text-gray-900 dark:text-gray-200">
                          {product.ratingsAverage}{" "}
                          {product.ratingsAverage >= 3 ? (
                            <i className="fa-solid fa-star text-green-700 "></i>
                          ) : (
                            <i className="fa-solid fa-star text-red-700 "></i>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between gap-2 mb-2">
                      {/* Add to Cart Button */}
                      {isLoading.buttonType === "add" &&
                      isLoading.productId === product._id ? (
                        <div className="flex justify-center items-center w-1/2 py-1 lg:py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-md">
                          <i className="fa-solid fa-spinner text-2xl animate-spin"></i>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddAndRemoveProduct(product._id, "add")
                          }
                          className="w-1/2 py-1 lg:py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                        >
                          <i className="fa-solid fa-cart-plus"></i>
                          <span className="text-sm font-semibold">
                            Add to Cart
                          </span>
                        </button>
                      )}

                      {/* Remove from Cart Button */}
                      {isLoading.buttonType === "remove" &&
                      isLoading.productId === product._id ? (
                        <div className="flex justify-center items-center w-1/2 py-1 lg:py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-md">
                          <i className="fa-solid fa-spinner text-2xl animate-spin"></i>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddAndRemoveProduct(product._id, "remove")
                          }
                          className="w-1/2 py-1 lg:py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg hover:from-red-500 hover:to-red-700 dark:bg-gradient-to-r dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                        >
                          <i className="fa-solid fa-trash"></i>
                          <span className="text-sm font-semibold">Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
