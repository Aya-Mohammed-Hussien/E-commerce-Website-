import React from 'react'
import notFoundImage from "../../assets/images/error.svg"


export default function NotFound(){
  return (
    <div className=' bg-white dark:bg-gray-800'>
      <img src={notFoundImage} className='w-[60%] mx-auto py-5 ' alt='NotFoundImage_FreshCart'/>
    </div>
  )
}

