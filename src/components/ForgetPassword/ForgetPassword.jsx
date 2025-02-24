import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);
  const [thirdStep, setThirdStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const myNavigator = useNavigate();

  // First Step (forget password)
  const firstStepInitialValues = {
    email: "",
  };

  const forgetPassword = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      console.log("firstStep", data);
      setIsLoading(false);
      if (data.statusMsg === "success") {
        setFirstStep(false);
        setSecondStep(true);
        toast.success(data.message, {
          duration: 2000,
          position: "top-center",
          className: "mt-[50px]",
        });
      } else {
        toast.error("Oops! Error occurred", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log("error - forgetPassword", error);
      setIsLoading(false);
    }
  };

  const myFirstFormik = useFormik({
    initialValues: firstStepInitialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Required"),
    }),
    onSubmit: forgetPassword,
  });

  // second step (reset code )
  const secondStepInitialValues = {
    resetCode: "",
  };
  const verifyCode = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      console.log("second step", data);
      setIsLoading(false);
      if (data.status === "Success") {
        setSecondStep(false);
        setThirdStep(true);
        toast.success("Success! You can now create a new password.", {
          duration: 2000,
          position: "top-center",
          className: "mt-[50px]",
        });
      } else {
        toast.error("Oops! Error occurred", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log("error - resetPassword", error);
      setIsLoading(false);
    }
  };

  const mySecondFormik = useFormik({
    initialValues: secondStepInitialValues,
    onSubmit: verifyCode,
  });

  // third step (reset password)

  const thirdStepInitialValues = {
    email: "",
    newPassword: "",
  };

  const resetPassword = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      console.log("third step", data);
      setIsLoading(false);
      if (data.token) {
        toast.success("Your password has been successfully updated!", {
          duration: 2000,
          position: "top-center",
          className: "mt-[50px]",
        });
        setTimeout(() => {
          myNavigator("/login");
        }, 700);
      } else {
        toast.error("Oops! Error occurred", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log("error - resetPassword", error);
      setIsLoading(false);
    }
  };

  const myThirdFormik = useFormik({
    initialValues: thirdStepInitialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Required"),
      newPassword: Yup.string()
        .matches(new RegExp(/^[A-Z][a-z0-9]{7,10}$/), "Invalid Password")
        .required("Required"),
    }),
    onSubmit: resetPassword,
  });
  return (
    <>
      <div className="container mx-auto py-10 px-10 md:px-20">
        <ol class="flex items-center justify-center w-full text-sm font-medium text-center sm:text-base">
          <li
            class={`flex md:w-full items-center ${
              firstStep ? "text-green-600" : "text-gray-400"
            }  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
          >
            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
              Forget <span class="hidden sm:inline-flex sm:ms-2">Password</span>
            </span>
          </li>
          <li
            class={`flex md:w-full items-center ${
              secondStep ? "text-green-600" : "text-gray-400"
            }  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
          >
            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <span class="me-2">2</span>
              Reset <span class="hidden sm:inline-flex sm:ms-2">Code</span>
            </span>
          </li>
          <li
            class={`flex items-center ${
              thirdStep ? "text-green-600" : "text-gray-400"
            } `}
          >
            <span class="me-2">3</span>
            Update<span class="hidden sm:inline-flex sm:ms-2">Password</span>
          </li>
        </ol>

        {firstStep && (
          <div className="bg-[#f3f5ed] p-5 rounded-lg w-full  md:w-[50%] mx-auto shadow-lg my-5">
            <h2 className="mb-5 text-base md:text-lg font-bold text-gray-900 dark:text-white text-center">
              Forget Password ?
            </h2>
            <form onSubmit={myFirstFormik.handleSubmit} className="mx-auto">
              {/* userEmail */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Email:
                </label>
                <input
                  onBlur={myFirstFormik.handleBlur}
                  onChange={myFirstFormik.handleChange}
                  value={myFirstFormik.values.email}
                  type="email"
                  id="email"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-700 dark:focus:border-green-700 dark:shadow-xs-light"
                  placeholder="Please Enter your email...."
                  required
                />
                {myFirstFormik.errors.email && myFirstFormik.touched.email ? (
                  <div
                    className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {myFirstFormik.errors.email}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {isLoading ? (
                <div className="text-white w-fit bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <i className="fa-solid fa-spinner animate-spin"></i>
                </div>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center"
                >
                  Next Step: Reset Code
                </button>
              )}
            </form>
          </div>
        )}

        {secondStep && (
          <div className="bg-[#f3f5ed] p-5 rounded-lg w-full md:w-[50%] mx-auto shadow-lg my-5">
            <form
              onSubmit={mySecondFormik.handleSubmit}
              className="w-full md:w-[50%] mx-auto"
            >
              {/* userEmail */}
              <div className="mb-5">
                <label
                  htmlFor="resetCode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User reset code:
                </label>
                <input
                  onBlur={mySecondFormik.handleBlur}
                  onChange={mySecondFormik.handleChange}
                  value={mySecondFormik.values.resetCode}
                  type="text"
                  id="resetCode"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-700 dark:focus:border-green-700 dark:shadow-xs-light"
                  placeholder="Please Enter your code..."
                  required
                />
              </div>
              {isLoading ? (
                <div className="text-white w-fit bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <i className="fa-solid fa-spinner animate-spin"></i>
                </div>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center"
                >
                  Next Step: Reset Password
                </button>
              )}
            </form>
          </div>
        )}

        {thirdStep && (
          <div className="bg-[#f3f5ed] p-5 rounded-lg w-full md:w-[50%] mx-auto shadow-lg my-5">
            <form
              onSubmit={myThirdFormik.handleSubmit}
              className="w-full md:w-[50%] mx-auto"
            >
              {/* userEmail */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Email:
                </label>
                <input
                  onBlur={myThirdFormik.handleBlur}
                  onChange={myThirdFormik.handleChange}
                  value={myThirdFormik.values.email}
                  type="email"
                  id="email"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-xs-light"
                  placeholder="Please Enter your email...."
                  required
                />
                {myThirdFormik.errors.email && myThirdFormik.touched.email ? (
                  <div
                    className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {myThirdFormik.errors.email}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User New Password:
                </label>
                <input
                  onBlur={myThirdFormik.handleBlur}
                  onChange={myThirdFormik.handleChange}
                  value={myThirdFormik.values.newPassword}
                  type="password"
                  id="newPassword"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-xs-light"
                  placeholder="Please Enter your new password...."
                  required
                />
                {myThirdFormik.errors.newPassword &&
                myThirdFormik.touched.newPassword ? (
                  <div
                    className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {myThirdFormik.errors.newPassword}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>

              {isLoading ? (
                <div className="text-white w-fit bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <i className="fa-solid fa-spinner animate-spin"></i>
                </div>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center"
                >
                  Update Password
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
}
