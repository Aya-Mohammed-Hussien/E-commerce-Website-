import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { createContext } from "react";

export const categoryContext = createContext();
export default function CategoryContextProvider({ children }) { 

// Function to fetch categories in CategoriesPage using ReactQuery to controll cacheing
const getCategories = async ()=>{
    try {
        const result = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        return{
            categories : result.data.data
        }
    } catch (error) {
        console.log('error' , error);
        throw new Error ('Failed to fetch categories');
    }
}
const {data , isError , isLoading} = useQuery({
    queryKey:['categories'],
    queryFn:getCategories,
    keepPreviousData :true,
    refetchOnWindowFocus:false,
    gcTime: 1000*60*5 ,
})
  
  return <categoryContext.Provider value={{
  getCategories , 
  isError,
  isLoading,
  categories:data?.categories || [] ,
  }}>  
    {children}
    </categoryContext.Provider>;
}
