import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from 'react'

export const barndsContext = createContext();

export default function BrandsContextProvider({children}) {
const [currentPage, setCurrentPage] = useState(1) ;

// Function to fetch brands in BrandsPage using ReactQuery to controll cacheing
const getBrands = async (page)=>{
    try {
     const result = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}`);
     return {
        brands : result.data.data,
        totalPages : result.data.metadata.numOfPages,
     }
    } catch (error) {
        console.log('error' , error);
        throw new Error ('Failed to fetch brands');
        
    }
}
const {data , isError , isLoading}= useQuery ({
   queryKey : ['brands' , currentPage],
   queryFn : ()=>  getBrands(currentPage) ,
   keepPreviousData :true,
   refetchOnWindowFocus:false,
   gcTime: 1000*60*5 ,
})

// Function to handle page change 
const handlePageChange = (selectedPage)=>{
 setCurrentPage(selectedPage.selected + 1 );
}

  return (
    <barndsContext.Provider value={{
        brands : data?.brands || [] ,
        totalPages : data?.totalPages || 2 ,
        handlePageChange ,
        isError ,
        isLoading,
        currentPage,
    }}>
        {children}
    </barndsContext.Provider>
  )
}
