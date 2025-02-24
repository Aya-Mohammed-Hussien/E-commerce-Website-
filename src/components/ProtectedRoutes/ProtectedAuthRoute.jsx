import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuthRoute({children}) {
  if (localStorage.getItem('tkn')){
    return <Navigate to={'/products'}/>
  }
  return children
}
