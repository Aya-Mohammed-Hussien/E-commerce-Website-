import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import { userContext } from "../../Context/UserContext";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Modal } from "flowbite";
import AllOrdersModal from "../AllOrdersModal/AllOrdersModal";

export default function AllOrders() {
  const { getAllUserOrders } = useContext(userContext);
  const { userData } = useContext(authContext);
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal , setShowModal] = useState(false);
 

  // Function to handel open modal
 const openModal = (items)=>{
  setShowModal(true);
  setSelectedItems(items)
 }

  // Function to handel close modal
  const closeModal = ()=>{
    setShowModal(false)
  }

  // Function to handle getUserOrders
  const getOrders = async (userId) => {
    setIsLoading(true);
    try {
      const res = await getAllUserOrders(userId);
      setIsLoading(false);
      console.log("userOrders", res);
      setUserOrders(res.data);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userData && getOrders(userData.id);
  }, [userData]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-lvh">
          <BeatLoader size={40} color={"#057A55"} />
        </div>
      ) : userOrders.length === 0 ? (
        <div className="text-center py-24 dark:bg-gray-800">
          <h3 className="text-xl text-gray-600 dark:text-gray-200">
            Your order history is empty.
          </h3>
          <p className="text-lg text-gray-500 mb-4">Start shopping now!</p>
          <Link
            to={"/"}
            className="mt-4 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg hover:from-green-500 hover:to-green-700 transition duration-300"
          >
            Go to Home Page
          </Link>
        </div>
      ) : (
        <div className="p-4 container mx-auto">
          {/* Heading */}
          <h2 className="heading-style">All Your Orders in One Place</h2>
          {/* table */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-[#f3f5ed] border-b dark:border-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    view Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {userOrders?.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-300 hover:bg-[#f3f5ed] dark:hover:bg-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4  text-sm md:text-base font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.id}
                    </th>
                    <td className="px-6 py-4">
                      {order.createdAt.split("T")[0]}
                    </td>
                    <td className="px-6 py-4">{order.paymentMethodType}</td>
                    <td className="px-6 py-4">EGP {order.totalOrderPrice}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => openModal(order.cartItems)}
                        className="text-center"
                        type="button"
                      >
                        <i className="fa-solid fa-eye font-medium text-lg text-green-700 "></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Modal */}
      {showModal &&  <AllOrdersModal closeModal={closeModal} selectedItems={selectedItems} />  }
    </>
  );
}


