import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
 const{userToken} = useContext(authContext) ;
 const [wishlist, setWishlist] = useState([]);
 const [pageLoading, setPageLoading] = useState(false);

//  Derived state 
const numOfWishlistItems = wishlist?.length ;
 
 // Headers as varaiable we will use it in so many functions 
 const headers = {
    token : userToken ,
   }

// Function to check if a product is in wishlist 
const isProductInWishList = (productId)=>{
    return wishlist.some((product)=> product._id === productId)
   }

// Function to get user wishlist 
const getUserWishlist = async () => {
  setPageLoading(true);
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      });
      setWishlist(res.data.data); 
      setPageLoading(false);
    } catch (error) {
      console.log("error", error); 
      setPageLoading(false);
    }
  };

// Function to remove product from wishlist 
const removeFromWishlist = async (productId)=>{
   try {
    const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , 
        {
         headers
        }
    );
    if(res.data.status === "success"){
      await getUserWishlist();
      return true ;
    }
   } catch (error) {
    console.log('error' , error);
    return false ;
   }
    return res ;
}

// Function to toggle (add/remove) products to wishlist
const toggleWishList = async (productId)=>{

    try {
     const isInWishList = wishlist.some((product)=> product._id === productId)
     if(isInWishList){
       const result =  await removeFromWishlist(productId);
    
       return result;
     }else {
         const res  = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
              {
             productId 
             },
             {
             headers
             });
            await getUserWishlist();
        
             return true ;
         }
     } catch (error) {
     console.log(error);

     return false ;
    }
 }

useEffect(()=>{
    if(userToken){
        getUserWishlist();
    }
} , [userToken])



  return <WishlistContext.Provider value={{
    toggleWishList,
    isProductInWishList,
    getUserWishlist,
    removeFromWishlist,
    numOfWishlistItems,
    wishlist,
    pageLoading
    
    
  }}>
    {children}
    </WishlistContext.Provider>;
}



