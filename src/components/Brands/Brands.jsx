import React, { useContext, useEffect, useState} from 'react'
import styles from "./Brands.module.css"
import { barndsContext } from '../../Context/BrandsContext';
import { BeatLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';
import CustomPagination from '../CustomPagination/CustomPagination';
import { Link } from 'react-router-dom';

export default function Brands() {

const {brands , totalPages , handlePageChange , isError , isLoading , currentPage} = useContext(barndsContext) ;
const [showBrands, setShowBrands] = useState(false);

useEffect(() => {
  setShowBrands(true);
}, [])

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

  return (
    <div className="p-4 container mx-auto">
    {/* Heading */}
    <h2 className="heading-style ">Explore Our Iconic Brands!</h2>
    
    <div className="card-grid">
      {/* Mapping to display brands */}
      {brands.map((brand) => (
        <div
          key={brand._id}
          className={`overflow-hidden ${
            showBrands ? "opacity-100 animate-slide-up" : "opacity-0"
          } rounded-lg shadow-2xl w-[90%] cursor-pointer dark:shadow-lg dark:bg-gray-800 dark:shadow-gray-900`}
        >
          {/* Brand Image */}
          <img
            src={brand.image}
            alt={brand.slug}
            className="object-cover w-full transform transition-transform duration-200 hover:scale-110"
          />
          {/* Brand Name */}
          <h2 className="text-xl font-semibold text-center text-gray-300 m-2 dark:text-gray-200">
            {brand.name}
          </h2>
        </div>
      ))}
    </div>
  
    {/* Pagination */}
    <CustomPagination
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  </div>
  
  )
}

