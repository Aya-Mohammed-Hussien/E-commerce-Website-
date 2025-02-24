import React, { useState } from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

export default function Layout() {
  const [count, setCount] = useState(0);

  return (
    <>
     
      <Navbar />
      <div className="mt-[100px] dark:bg-gray-800">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
