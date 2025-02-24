import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useFormik } from "formik";
import axios from "axios";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  const { setUserToken } = useContext(authContext);
  let myNavigate = useNavigate();

  const [isCallingApi, setIsCallingApi] = useState(false);
  const [errorApi, setErrorApi] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const callLoginApi = async (values) => {
    try {
      setErrorApi(null);
      setIsCallingApi(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      console.log("sah", data);
      setUserToken(data.token);
      localStorage.setItem("tkn", data.token);
      console.log("token", data.token);
      setIsCallingApi(false);
      myNavigate("/");
    } catch (error) {
      console.log(error);
      setErrorApi(error.response.data.message);
      setIsCallingApi(false);
    }
  };

  const myFormik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callLoginApi,
  });

  return (
    <>
      <form onSubmit={myFormik.handleSubmit} className="md:w-[50%] w-[80%] mx-auto py-5">
        <h2 className="heading-style">Login Now:</h2>
        {errorApi ? (
          <div
            className="p-2 mb-2 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorApi}{" "}
          </div>
        ) : (
          ""
        )}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User Email:
          </label>
          <input
            type="email"
            id="email"
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-xs-light"
            placeholder="Please Enter your email...."
            required
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div
              className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {myFormik.errors.email}{" "}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User Password:
          </label>
          <input
            type="password"
            id="password"
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-xs-light"
            placeholder="Please Enter your password...."
            required
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div
              className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {myFormik.errors.password}{" "}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between items-center">
         <Link to={"/forgetpassword"}> <p className="text-gray-900 text-xs dark:text-white md:text-lg font-medium border-b-[1px] dark:border-white border-gray-900">Forget Password ?</p></Link>
          {isCallingApi ? (
            <div className="text-white bg-gray-900/60 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center">
            <i className=" fa-solid fa-spinner animate-spin  "></i>
            </div>
          ) : (
            <button type="submit" className="text-white bg-gray-900/60 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center">Submit</button>
          )}
          
        </div>
      </form>
    </>
  );
}
