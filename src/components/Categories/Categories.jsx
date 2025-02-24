import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners";
import { categoryContext } from '../../Context/CategoryContext';

export default function Categories() {
const {isError , isLoading , categories} = useContext(categoryContext);
const [showCategories, setShowCategories] = useState(false);

useEffect(() => {
  setShowCategories(true);
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
    <h2 className="heading-style">Shop Popular Categories!</h2>
  
    <div className="card-grid">
      {/* Mapping to display categories */}
      {categories.map((category) => (
        <div
          key={category._id}
          className={`overflow-hidden ${
            showCategories ? "opacity-100 animate-slide-up" : "opacity-0"
          } rounded-lg shadow-2xl w-[90%] dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900`}
        >
          {/* Category Image */}
          <img
            src={category.image}
            alt={category.slug}
            className="object-cover w-full h-96 transform transition-transform duration-200 "
          />
  
          {/* Category Name */}
          <h2 className="text-xl font-semibold text-center text-gray-400 m-2 dark:text-gray-200">
            {category.name}
          </h2>
        </div>
      ))}
    </div>
  </div>
  
  )
}

