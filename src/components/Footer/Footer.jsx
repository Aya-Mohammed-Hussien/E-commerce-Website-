import React, { useState } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const [count, setCount] = useState(0);

  return (
    <footer
      className=" bg-[#f3f5ed]
     text-gray-900 py-8 dark:bg-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-900 leading-relaxed dark:text-gray-300">
              We are a modern eCommerce platform dedicated to providing the best
              shopping experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-900 hover:text-white transition duration-300 dark:text-gray-300 dark:hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-900 hover:text-white transition duration-300 dark:text-gray-300 dark:hover:text-white"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-900 hover:text-white transition duration-300 dark:text-gray-300 dark:hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-900 dark:text-gray-300">
                <i className="fas fa-envelope mr-2"></i>
                <span>support@ecommerce.com</span>
              </li>
              <li className="flex items-center text-sm text-gray-900 dark:text-gray-300">
                <i className="fas fa-phone-alt mr-2"></i>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center text-sm text-gray-900 dark:text-gray-300">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>123 Main St, City, Country</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-900 mb-4 dark:text-gray-300">
              Get the latest updates and offers directly in your inbox.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-transparent text-gray-900  dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-lg bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg dark:bg-green-600 dark:hover:from-green-500 dark:hover:to-green-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center dark:border-gray-700">
          <p className="text-sm text-gray-900 dark:text-gray-300">
            © 2025 Your eCommerce. All rights reserved.
          </p>
          {/* Social Media Icons */}
          <div className="flex justify-center mt-4 space-x-6">
            <a
              href="#"
              className="text-gray-900 hover:text-white transition duration-300 dark:text-gray-300 dark:hover:text-white"
            >
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-white transition duration-300 dark:text-gray-300 dark:hover:text-white"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-white transition duration-300 dark:text-gray-300 dark:hover:text-white"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-white transition duration-300 dark:text-gray-300 dark:hover:text-white"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
