import React, { useState } from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik';
import * as Yup from "yup" 
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';


export default function Register() {

let myNavigate = useNavigate();

const [isCallingApi,setIsCallingApi] = useState(false);
const [errorApi , setErrorApi] = useState(null);

 const initialValues = {
  name:"",
  email:"",
  password:"",
  rePassword:"",
  phone:""
 }

const validationSchema = Yup.object().shape({
  name:Yup.string().max(15 , 'Max length is 15').min(3 , "Min length is 3").required('Required'),
  email:Yup.string().email('Invalid Email').required('Required'),
  password:Yup.string().matches(new RegExp(/^[A-Z][a-z0-9]{7,10}$/),"Invalid Password").required('Required') ,
  rePassword:Yup.string().oneOf([Yup.ref('password')],"rePassword doesn't match password").required('Required'),
  phone:Yup.string().matches(new RegExp(/^01[0125][0-9]{8}$/),"Invalid Phone Number").required('Required'),
})



const callRegisterApi = async (values)=>{
 try {
  setErrorApi(null);
  setIsCallingApi(true);
  let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values);
  setIsCallingApi(false);
  myNavigate('/login');
 } catch (error) {
  setErrorApi(error.response.data.message)
  setIsCallingApi(false);
 }
}


const myFormik = useFormik ({
  initialValues ,
  validationSchema ,
  onSubmit : callRegisterApi,
  })



  return (
    <form onSubmit={myFormik.handleSubmit} className="md:w-[50%] w-[80%] mx-auto pt-5 mb-8">
     <h2 className='heading-style'>Register Now:</h2>
     { errorApi ? 
       <div className="p-2 mb-2 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
       {errorApi} </div> : ""}
     <div className="mb-5">
       <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name:</label>
       <input type="text" id="name" onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.name} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-xs-light" placeholder="Please enter your name...." required />
       {myFormik.errors.name && myFormik.touched.name ? 
       <div className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
       {myFormik.errors.name} </div> : ""}
    </div>
     <div className="mb-5">
       <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Email:</label>
       <input type="email" id="email" onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.email} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-xs-light" placeholder="Please Enter your email...." required />
       {myFormik.errors.email && myFormik.touched.email ? 
       <div className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
       {myFormik.errors.email} </div> : ""}
    </div>
     <div className="mb-5">
       <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Password:</label>
       <input type="password" id="password" onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.password} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-xs-light" placeholder="Please Enter your password...." required />
       {myFormik.errors.password && myFormik.touched.password ? 
       <div className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
       {myFormik.errors.password} </div> :""}
    </div>
     <div className="mb-5">
       <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword:</label>
       <input type="password" id="rePassword" onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.rePassword} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-xs-light" placeholder="Please Confirm your password...." required />
       {myFormik.errors.rePassword && myFormik.touched.rePassword ? 
       <div className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
       {myFormik.errors.rePassword} </div> :""}
    </div>
     <div className="mb-5">
       <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Phone:</label>
       <input type="tel" id="phone" onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.phone} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-xs-light" placeholder="Please Enter your Phone...." required />
       {myFormik.errors.phone && myFormik.touched.phone ? 
       <div className="p-2 mb-1 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
       {myFormik.errors.phone} </div> :""}
    </div>
    
    {isCallingApi? <div className='flex justify-end mt-4'>
    <BeatLoader  size={15} color={'#0aad0a'}/>
    </div>:<button type="submit" className="text-white bg-gray-900/60 hover:bg-gray-900 focus:outline-none block ml-auto font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ">Submit</button>
    }
  </form>

  )
}






