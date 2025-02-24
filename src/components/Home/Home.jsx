import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import HomeFirstSlider from "../HomeFirstSlider/HomeFirstSlider.jsx";
import CategorySlider from "../CategorySlider/CategorySlider.jsx";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext.jsx";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/wishlistContext.jsx";
import { productContext } from "../../Context/ProductContext.jsx";
import Products from "../Products/Products.jsx";

export default function Home() {
  const { addProductToCart } = useContext(cartContext);
  const { toggleWishList, isProductInWishList } = useContext(WishlistContext);
  const [showProducts, setShowProducts] = useState(false);
  const {
    isError,
    isLoading,
    goToNextPage,
    goToPreviousPage,
    currentPage,
    allProducts,
    totalPages,
  } = useContext(productContext);

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
    const res = await addProductToCart(id);
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
    const res = await toggleWishList(id);
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
        <div className="flex flex-col gap-5 py-5">
          <HomeFirstSlider />
          <CategorySlider />
        </div>
        <Products />
      </div>
    </>
  );
}


