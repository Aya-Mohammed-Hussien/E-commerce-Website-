import React, { createContext } from 'react'
import { authContext } from './AuthContext';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
export const userContext = createContext();

export default function UserContextProvider({children}) {

// Function to get all orders of a user 
const getAllUserOrders = async (userId)=>{
    try {
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
     return res ;
    } catch (error) {
        console.log('error' , error);
    }
}




  return (
    <userContext.Provider value={{
        getAllUserOrders,
    }}>
     {children}
    </userContext.Provider>
  )
}
