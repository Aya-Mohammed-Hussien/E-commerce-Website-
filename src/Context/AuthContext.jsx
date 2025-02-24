import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { jwtDecode } from "jwt-decode";

export const authContext =createContext();
authContext.Provider;
export default function AuthContextProvider({children}) {
const [userToken, setUserToken] = useState(null);
const [userData, setUserData] = useState(null);

// Function to decrypt userData 
const decryptUserData = ()=>{
 const res = jwtDecode(userToken);
 setUserData(res);
}

useEffect(() => {
if(userToken){
  decryptUserData();
}
}, [userToken])


useEffect(()=>{
  const tkn = localStorage.getItem('tkn');
  if (tkn != null){
    setUserToken(tkn);
  }
} , []);


  return (
    <authContext.Provider value={{
      setUserToken ,
      userToken ,
      userData,
    }}>
     {children}
    </authContext.Provider>
  )
}
