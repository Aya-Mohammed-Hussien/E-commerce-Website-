import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/wishlistContext";
import TopNavSlider from "../TopNavSlider/TopNavSlider";
import Swal from "sweetalert2";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));
  const [handleScroll, setHandelScroll] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userToken, setUserToken, userData } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  const { numOfWishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    // handle darkMOde
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", darkMode);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("darkMode");
    }
  }, [darkMode]);

  // handle logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to log out?",
      icon: "question", // Use 'question' icon for logout confirmation
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in",
      customClass: {
        confirmButton:
          "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700",
        cancelButton:
          "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600",
      },
    });
    if (result.isConfirmed) {
      setTimeout(() => {
        localStorage.removeItem("tkn");
        setUserToken(null);
        navigate("/login");
      }, 700);
    }
  };

  // handle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleNavScroll = () => {
      if (scrollY > 50) {
        setHandelScroll(true);
      } else {
        setHandelScroll(false);
      }
    };
    window.addEventListener("scroll", handleNavScroll);
    return () => {
      window.removeEventListener("scroll", handleNavScroll);
    };
  }, [handleScroll]);




  return (
    <>
      <TopNavSlider />
      <nav
        className={` bg-[#f3f5ed] transition-all px-4 md:px-16 duration-500 fixed z-20 top-[30px] md:top-[36px] left-0 right-0 dark:bg-gray-900 dark:text-white ${
          handleScroll ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-screen-xl flex items-center justify-between md:mx-auto">
          <Link to={""} className="me-2 space-x-1 md:space-x-3 rtl:space-x-reverse flex justify-center items-center md:font-bold text-green-700 text-lg sm:text-2xl md:text-[32px]">
          <i className="fa-brands fa-shopify"></i>
          <h2 className="uppercase font-Margarine">Shopify</h2>
          </Link>
          <div
            className="hidden w-full md:block md:w-auto absolute top-[71px] left-0 md:top-0 md:relative bg-[#D9DFC6]/95 py-3 md:py-0 md:bg-transparent  dark:md:bg-transparent dark:bg-gray-900/95"
            id="navbar-default"
          >
            {userToken && (
              <ul className="font-medium flex justify-center items-center flex-col md:flex-row">
                <li>
                  <NavLink to={"/"} className="nav-list" aria-current="page">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/products"} className="nav-list">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/categories"} className="nav-list">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/brands"} className="nav-list">
                    Brands
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <ul className="flex flex-row space-x-2">
            {userToken && (
              <div className="flex justify-center items-center space-x-2 sm:space-x-3 cursor-pointer">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search our products"
                    className=" pl-8 md:pl-10 pr-4 py-[2px] md:py-1 w-36 md:w-60 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-transparent transition-all  dark:border-gray-600 dark:text-gray-900"
                  />
                  <i className="text-sm sm:text-lg fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 cursor-pointer"></i>
                </div>
                {/* Dark/Light mode */}
                <button onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? (
                    <i className="fa-solid fa-sun text-sm sm:text-2xl"></i>
                  ) : (
                    <i className="fa-solid fa-moon text-sm sm:text-2xl"></i>
                  )}
                </button>

                {/* WishList */}
                <Link to={"/wishList"} className="flex items-center space-x-2">
                  <div className="relative">
                    <i className="fa-regular fa-heart text-sm sm:text-2xl text-red-500"></i>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 py-[1px] md:px-1.5 md:py-0.5 text-xs">
                      {numOfWishlistItems}
                    </span>
                  </div>
                </Link>
                {/* Cart Icon */}
                <Link to={"/cart"} className="relative inline-block">
                  <i className="fa-solid fa-cart-shopping text-sm sm:text-2xl text-gray-900 dark:text-white"></i>
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full px-1 py-[1px] md:px-1.5 md:py-0.5 text-xs animate-number-translate">
                    {numOfCartItems}
                  </span>
                </Link>
                {/* Dropdown Menu */}
                <div className="relative">
                  <button className="flex items-center justify-center">
                    <i
                      className="fa-solid fa-user sm:text-2xl text-sm text-gray-900 dark:text-white"
                      onClick={toggleDropdown}
                    ></i>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 md:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 dark:bg-gray-800 dark:border-gray-600">
                      <h4 className="px-4 py-2 text-xs font-medium md:text-base text-gray-900 dark:text-white">
                        Welcome, {userData?.name}
                      </h4>
                      <Link
                        to={"/allorders"}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        All Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <i className="fa-solid fa-right-from-bracket me-2"></i>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* For non-logged-in users */}
            {!userToken && (
              <div className="flex justify-center items-center gap-[15px] md:ml-auto">
                <li>
                  <NavLink
                    to={"/register"}
                    className="text-green-600 text-lg md:text-xl block py-2 px-1 rounded-md hover:bg-gray-200 md:hover:text-black transition-all duration-300 "
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/login"}
                    className="text-green-600 block text-lg md:text-xl py-2 px-1 rounded-md hover:bg-gray-200 md:hover:text-black transition-all duration-300 "
                  >
                    Login
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
          {userToken && (
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="me-2 inline-flex items-center p-2 w-8 h-8 justify-center text-lg text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}


 {/* <img
              src={logo}
              className="md:w-[180px] sm:w-[150px] w-[125px]"
              alt="freshCart"
            /> */}