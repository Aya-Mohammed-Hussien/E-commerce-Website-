import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import { authContext } from "../../Context/AuthContext";

export default function Order() {
  const { userToken } = useContext(authContext);
  const { cartId, resetValues } = useContext(cartContext);
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  
  // Function to handle cash payment
  const createCashOrder = async (values) => {
    setIsCallingApi(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: userToken,
          },
        }
      );
      setIsCallingApi(false);
      if (res.data.status === "success") {
        toast.success("Order Created Successfully!", {
          duration: 2000,
          position: "bottom-right",
        });
      } else {
        toast.error("An Error Occurred", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log("cashPaymentError", error);
      setIsCallingApi(false);
    }
  };

  // Function to handle online payment
  const createCheckout = async (values) => {
    setIsCallingApi(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: userToken,
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      );
      setIsCallingApi(false);
      window.open(res.data.session.url);
      if (res.data.status === "success") {
        toast.success("Order Created Successfully!", {
          duration: 2000,
          position: "bottom-right",
        });
      } else {
        toast.error("An Error Occurred", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log("onlinePaymentError", error);
      setIsCallingApi(false);
    }
  };

  // Function to handle payment
  const handlePayment = async () => {
    try {
      if (isOnline) {
        await createCheckout();
      } else {
        await createCashOrder();
      }
      resetValues();
    } catch (error) {
      console.log(error);
    }
  };

  //  Validation for cash Payment Inputs :
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(new RegExp(/^01[0125][0-9]{8}$/), "Invalid Phone Number")
      .required("Required"),
    city: Yup.string()
      .matches(
        new RegExp(/^[A-Za-z\s]+$/),
        "City name must contain only letters and spaces"
      )
      .required("Required")
      .max(25, "City name must be at most 25 characters")
      .min(3, "City name must be at least 3 characters"),
  });

  const cashForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handlePayment,
  });

  return (
    <div className="container mx-auto p-4">
      {/* Heading */}
      <h2 className="p-2 md:text-4xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-900 my-8">
        Complete Your Purchase:
      </h2>
      <form onSubmit={cashForm.handleSubmit} className="max-w-lg mx-auto">
        {/* Details Input */}
        <div className="mb-6">
          <label
            htmlFor="details"
            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
          >
            Order Details
          </label>
          <textarea
            onChange={cashForm.handleChange}
            value={cashForm.values.details}
            id="details"
            name="details"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter any additional details for your order"
            rows="4"
            required
          />
        </div>

        {/* Phone Input */}
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
          >
            Phone Number
          </label>
          <input
            value={cashForm.values.phone}
            onChange={cashForm.handleChange}
            onBlur={cashForm.handleBlur}
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your phone number"
            required
          />
          {cashForm.errors.phone && cashForm.touched.phone ? (
            <div
              className="p-2 mb-1 mt-2 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {cashForm.errors.phone}
            </div>
          ) : null}
        </div>

        {/* Address Input */}
        <div className="mb-6">
          <label
            htmlFor="city"
            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
          >
            Delivery Address
          </label>
          <input
            value={cashForm.values.city}
            onChange={cashForm.handleChange}
            onBlur={cashForm.handleBlur}
            type="text"
            id="city"
            name="city"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your city"
            required
          />
          {cashForm.errors.city && cashForm.touched.city ? (
            <div
              className="p-2 mb-1 mt-2 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {cashForm.errors.city}
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center my-8">
          <label className="font-medium flex items-center text-gray-700 dark:text-gray-300">
            <input
              onChange={() => {
                setIsOnline(true);
              }}
              type="checkbox"
              className="checked:text-green-600 m-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />{" "}
            Check to pay online
          </label>
          {isCallingApi ? (
            <div className="flex justify-center items-center py-2 px-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-md">
              <i className="fa-solid fa-spinner text-2xl animate-spin"></i>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg hover:from-green-500 hover:to-green-700 transition duration-300"
            >
              Place Order
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
