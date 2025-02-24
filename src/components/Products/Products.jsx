import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../../Context/ProductContext";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../Context/wishlistContext";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";

export default function Products() {
  const {
    isError,
    isLoading,
    goToNextPage,
    goToPreviousPage,
    currentPage,
    allProducts,
    totalPages,
  } = useContext(productContext);
  const { toggleWishList, isProductInWishList } = useContext(WishlistContext);
  const { addProductToCart } = useContext(cartContext);
  const [showProducts, setShowProducts] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState({ productId: null });
  const [isHeartLoading, setIsHeartLoading] = useState({ productId: null });
  useEffect(() => {
    setShowProducts(true);
  }, []);

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

  // Function to handle add product to cart when clicking on the button on Home Page
  const handleAddProduct = async (id, e) => {
    e.preventDefault();
    setIsAddLoading({ productId: id });
    const res = await addProductToCart(id);
    setIsAddLoading({ productId: null });
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
  };

  // Function to handle toggle (add/remove) item from wishlist
  const handleToggleWishlist = async (id, e) => {
    e.preventDefault();
    setIsHeartLoading({ productId: id });
    const res = await toggleWishList(id);
    setIsHeartLoading({ productId: null });
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
      <div className="p-4 container mx-auto">
        {/* Heading */}
        <h2 className="heading-style">Check out our latest products!</h2>

        <div className="card-grid">
          {/* Mapping to display products in home page */}
          {allProducts.map((product) => (
            <Link
              to={`/productDetails/${product._id}`}
              key={product._id}
              className={`overflow-hidden ${
                showProducts ? "opacity-100 animate-slide-up" : "opacity-0"
              } bg-[#f3f5ed] dark:bg-gray-900 text-gray-900 dark:text-[#f3f5ed] rounded-lg shadow-xl group w-[90%] h-auto hover:shadow-gray-800 dark:hover:shadow-black transition-all duration-300`}
            >
              {/* Image & buttons */}
              <div className="relative w-full">
                {/* Sale badge */}
                {product.priceAfterDiscount ? (
                  <div className="absolute top-2 left-2 bg-yellow-300 p-2 transform -rotate-12 text-gray-900 rounded-md font-medium inline-flex items-center space-x-1 z-10 shadow-lg hover:scale-105 transition-transform duration-200">
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

                {/* Product image */}
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="object-cover w-full h-auto md:w-full md:h-[300px] rounded-t-lg"
                />

                {/* Buttons container */}
                <div>
                  {/* Button - Add to cart */}
                  <div className="absolute bottom-2 right-2">
                    <button
                      onClick={(e) => handleAddProduct(product._id, e)}
                      className="text-green-700 text-2xl"
                    >
                      {isAddLoading.productId === product._id ? (
                        <i className="fa-solid fa-spin fa-spinner font-medium text-green-700 text-lg"></i>
                      ) : (
                        <i className="fa-solid fa-cart-plus text-2xl"></i>
                      )}
                    </button>
                  </div>

                  {/* Button - Add/remove to/from wishlist */}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => handleToggleWishlist(product._id, e)}
                      className={`text-2xl ${
                        isProductInWishList(product._id)
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {isHeartLoading.productId === product._id ? (
                        <i className="fa-solid fa-spin fa-spinner font-medium text-red-600 text-lg"></i>
                      ) : (
                        <i className="fa-solid fa-heart"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Product details */}
              <div className="p-2">
                <h2 className="py-1 border-b-[1px] border-b-gray-900 dark:border-b-[#f3f5ed] font-semibold truncate">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <h3 className="py-1">{product.category.name}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    {product.priceAfterDiscount ? (
                      <>
                        <span>{product.priceAfterDiscount} EGP</span>
                        <span className="line-through text-red-700 pl-2 font-light">
                          {product.price} EGP
                        </span>
                      </>
                    ) : (
                      <span>{product.price} EGP</span>
                    )}
                  </div>
                  <span>
                    {product.ratingsAverage}{" "}
                    {product.ratingsAverage >= 3 ? (
                      <i className="fa-solid fa-star text-green-700"></i>
                    ) : (
                      <i className="fa-solid fa-star text-red-700"></i>
                    )}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          {/* Previous button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-md hover:shadow-lg"
            } text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
          >
            Previous
          </button>

          {/* Page indicator */}
          <span className="text-lg text-gray-700 dark:text-gray-400">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          {/* Next button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-md hover:shadow-lg"
            } text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
