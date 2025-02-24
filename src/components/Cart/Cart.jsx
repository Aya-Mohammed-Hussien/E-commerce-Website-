import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Cart() {
  const [isLoading, setIsloading] = useState({ productId: null });
  const {
    products,
    totalCartPrice,
    numOfCartItems,
    updateCount,
    removeProduct,
    clearCart,
  } = useContext(cartContext);

  if (!products) {
    return (
      <div className="flex justify-center items-center h-lvh">
        <BeatLoader size={40} color={"#057A55"} />
      </div>
    );
  }

  // Function to handle update change count
  const handleChangeCount = async (id, count) => {
    const res = await updateCount(id, count);
    if (res) {
      toast.success("Product updated successfully !", {
        duration: 3000,
        position: "bottom-right",
      });
    } else {
      toast.error("Oops! Something went wrong");
    }
  };

  // Function to handle remove specific item from cart
  const handleRemoveItem = async (id) => {
    setIsloading({ productId: id });
    try {
      const removeRes = await removeProduct(id);
      setIsloading({ productId: null });
      if (removeRes) {
        toast.success("Product removed successfully !", {
          duration: 3000,
          position: "bottom-right",
        });
      } else {
        toast.error("Oops! Something went wrong");
      }
    } catch (error) {
      console.log("error", error);
      setIsloading({ productId: null });
    }
  };

  // Function to handle clear cart
  const handleClearCart = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will remove all items from your cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, clear it!",
        cancelButtonText: "No, keep them",
        customClass: {
          confirmButton:
            "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700",
          cancelButton:
            "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600",
        },
      });

      if (result.isConfirmed) {
        const isCleared = await clearCart();
        if (isCleared) {
          toast.success("Cart cleared successfully!", {
            duration: 3000,
            position: "bottom-right",
          });
        } else {
          toast.error("Oops! Something went wrong while clearing the cart.", {
            duration: 3000,
            position: "bottom-right",
          });
        }
      } else {
        toast(
          (t) => (
            <div>
              <span>Your cart is still here! </span>
              <a
                href="/"
                className="text-green-500 font-medium underline hover:text-green-500"
                onClick={() => toast.dismiss(t.id)}
              >
                Continue shopping{" "}
                <span className="text-mainColo underline hover:text-green-500">
                  →
                </span>
              </a>
            </div>
          ),
          {
            duration: 5000,
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      console.error("Error in handleClearCart:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      {products.length === 0 ? (
        <div className="text-center py-24 ">
          <h3 className="text-xl text-gray-600 dark:text-gray-200">
            Your Cart is empty.
          </h3>
          <p className="text-lg text-gray-500 mb-4">
            Browse our products and add to your cart!
          </p>
          <Link
            to={"/"}
            className="mt-4 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg hover:from-green-500 hover:to-green-700 transition duration-300"
          >
            Go to Home Page
          </Link>
        </div>
      ) : (
        <div className="container mx-auto px-3 py-5 ">
          <div className="flex justify-between items-center ">
            <h2 className="text-lg md:text-3xl text-green-600 dark:text-green-400 my-2 font-medium">
              Total Price: {totalCartPrice} EGP
            </h2>
            <Link to={"/order"}>
              <button className="py-2 px-2 md:px-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ">
                <i className="fa-solid fa-money-bill"></i>
                <span className="text-sm font-semibold">Proceed to pay</span>
              </button>
            </Link>
          </div>

          <p className="text-lg md:text-xl text-gray-900 dark:text-gray-200  my-2 font-medium ">
            Your Cart{" "}
            <span>
              ({numOfCartItems} {numOfCartItems === 1 ? "Item" : "Items"})
            </span>
          </p>
          {/* table */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="sm:overflow-x-auto overflow-x-auto w-full">
              <table className="mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase border-b bg-[#f3f5ed] dark:border-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-300 hover:bg-[#f3f5ed] dark:hover:bg-gray-700"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleChangeCount(
                                product.product._id,
                                product.count - 1
                              )
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              type="text"
                              value={product.count}
                              id="first_product"
                              className="bg-gray-50 w-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainColor focus:border-mainColor block px-2 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                              placeholder={1}
                              required
                            />
                          </div>
                          <button
                            onClick={() =>
                              handleChangeCount(
                                product.product._id,
                                product.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        {isLoading.productId === product.product._id ? (
                          <i className="fa-solid fa-spin fa-spinner font-medium text-red-600 text-lg"></i>
                        ) : (
                          <button
                            onClick={() =>
                              handleRemoveItem(product.product._id)
                            }
                            className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Clear Cart and Checkout Buttons */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClearCart}
              className="py-2 px-4 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg "
            >
              <i className="fa-solid fa-trash"></i>
              <span className="text-sm font-semibold">Clear Cart</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
