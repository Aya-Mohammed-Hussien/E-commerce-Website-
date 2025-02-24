import React, { useEffect, useRef } from "react";

export default function AllOrdersModal({ selectedItems, closeModal }) {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleCloseOutsideModal = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleCloseOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseOutsideModal);
    };
  }, [closeModal]);

  return (
<div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center pt-5 mt-20">
  <div
    ref={modalRef}
    className="content bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-y-auto max-h-[90vh] relative"
  >
    <button
      onClick={closeModal}
      className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
    >
      <i className="fas fa-times text-2xl"></i>
    </button>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Order Details</h2>
    <div className="space-y-6">
      {selectedItems.map((product) => (
        <div
          key={product._id}
          className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
        >
          <img
            src={product.product.imageCover}
            alt={product.product.title}
            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {product.product.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Quantity: {product.count}
            </p>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {product.price} EGP
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
