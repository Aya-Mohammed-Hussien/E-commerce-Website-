import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
const{userToken} = useContext(authContext) ;
const [totalCartPrice, setTotalCartPrice] = useState(0);
const [products, setProducts] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [cartId, setCartId] = useState(null);

// console.log(cartId);
// //Derived State
 let  numOfCartItems = products?.length;

// Headers as varaiable we will use it in so many functions 
 const headers = {
  token : userToken ,
 }

//  Function to reset values (will use it when user paid with cash )
  const resetValues = ()=>{
    setProducts([]);
    setCartId(null);
    setTotalCartPrice(0);
    numOfCartItems = 0 ;
  }

//  Function to add products to cart (using it in home page and in productDetails)
   const addProductToCart = async (productId)=>{
    setIsLoading(true);
   const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,
      {
        productId
      } ,
      {
        headers
      })
 .then((res)=>{
    setCartId(res.data.cartId);
    getUserCart()
    setIsLoading(false);
    return true ;
 })
 .catch((err)=>{console.log("err" , err);
    setIsLoading(false);
    return false;
 })
    return res ;
}

// Function to get user cart (refresh & login)
  const getUserCart = ()=>{
    axios.get(`https://ecommerce.routemisr.com/api/v1/cart?` , {
      headers
    }).then((resp)=>{
      // setNumOfCartItems(resp.data.numOfCartItems);
      setTotalCartPrice(resp.data.data.totalCartPrice);
      setProducts(resp.data.data.products);
      setCartId(resp.data.cartId);
    }).catch((error)=>{
      console.log(error)
    })
  }


// to get user cart on every refresh and also when loging 
useEffect(()=>{
  if (userToken){
    getUserCart();
  }
} , [userToken] )

// Function to increment and decrement product count(update) 
const updateCount = async (id , newCount)=>{
  const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
   {
      "count": newCount
   } ,
   {
      headers
  }).then(respo => {
    // setNumOfCartItems(respo.data.numOfCartItems);
    setTotalCartPrice(respo.data.data.totalCartPrice);
    setProducts(respo.data.data.products)
    return true ;
  }).catch(error => {
    console.log('error' , error)
    return false ;
  })
  return res
}

// Function to remove specfic cart item (path parameters => the product id )
const removeProduct = async (id)=>{
  const result = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , 
    {
      headers
    }
  ).then(res => {
    // setNumOfCartItems(res.data.numOfCartItems);
    setTotalCartPrice(res.data.data.totalCartPrice);
    setProducts(res.data.data.products)
   return true 
  }).catch( error => {
    console.log('error' , error);
    return false ; 
  })
  return result ; 
}

// Function to handle clear cart totally 
const clearCart = async ()=>{
  const result = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
   headers 
  }).then(res => {
    setProducts([]);
    setTotalCartPrice(0);
    // setNumOfCartItems(0);
    return true ;
  }).catch(err => {
    console.log('err' , err);
    return false ;
  })
  return result ; 
}

  return (
  <cartContext.Provider value={{
    addProductToCart,
    getUserCart,
    updateCount,
    removeProduct,
    clearCart,
    numOfCartItems, 
    totalCartPrice,
    products,
    isLoading,
    setIsLoading,
    cartId,
    resetValues,
    }}>
    {children}
  </cartContext.Provider>
  )
}
