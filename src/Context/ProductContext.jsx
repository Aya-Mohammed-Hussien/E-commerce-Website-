import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from 'react'
import { useQuery } from '@tanstack/react-query';

export const productContext = createContext();
export default function ProductContextProvider({children}) {
const [currentPage, setCurrentPage] = useState(1);

// Function to fetch products in ProductsPage using ReactQuery to controll cacheing
const getProducts =  (page)=>{
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
  
}

const {data , isError , isLoading} = useQuery({
    queryKey:["products", currentPage ],
    queryFn: () => getProducts(currentPage) ,
    keepPreviousData :true,
    refetchOnWindowFocus:false,
    gcTime: 1000*60*5 ,
})
const allProducts = data?.data.data || [];
// console.log(allProducts)
const totalPages = data?.data.metadata.numberOfPages || 2;

// Function to get the next page 
const goToNextPage = ()=>{
    if ( data && currentPage < data.data.metadata.numberOfPages){
        setCurrentPage(currentPage + 1);
    }
}

// Function to go to previous page 
const goToPreviousPage = ()=>{
    if (currentPage > 1 ) {
        setCurrentPage(currentPage - 1);
    }
}


  return (
    <productContext.Provider value={{
      isError,
      isLoading,
      goToNextPage,
      goToPreviousPage, 
      currentPage,
      allProducts ,
      totalPages,

    }}>
       {children}
    </productContext.Provider>
    
  )
}
