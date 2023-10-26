"use client";
import { cartContext } from '@/components/CartContext'
import { productContext } from '@/components/ProductContext';
import Table from '@/components/Table'
import { useSession } from 'next-auth/react';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
  const { cartProducts ,products} = useContext(cartContext)
  const cls = 'p-2 m-2 shadow-sm w-full border-[0.5px] focus:border-blue-400 rounded-md '
  const {data:session}=useSession();
  const {user}=useContext(productContext);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    email: "",
    city: "", postalcode: "",
    streetAddress: "",
    country: ""
  });
  const orderOnChange = (e) => {

    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  }


  const Payment=async()=>{
    if(!session.user){
      toast.error("Please Login to continue Payment")
    }else{
    let placingOrder={cartProducts,orderInfo:{...orderInfo,userId:user._id}}
    let res=await fetch("/api/order/",{
      method:"POST",
      body:JSON.stringify(placingOrder),
    })
    let orderDetails=await res.json();
    let {url,Order}=orderDetails;
    if(url){
    window.location=url;
    }}
  }

  return (cartProducts.length > 0 && products.length>0 ?
    <div className=" min-h-screen grid md:grid-cols-3 max-w-6xl mx-auto gap-4 m-2 p-2">
      <div className="col-span-2 bg-white rounded-md shadow-sm p-3">
        <h2 className='text-5xl font-bold'>Cart</h2>
        <Table cartProducts={cartProducts} products={products} />
      </div>
      <div className="bg-white shadow-sm rounded-md py-3 px-4 ml-10 md:ml-0 w-full">
        <h3 className='text-2xl font-bold text-center'>Order Information</h3>
        <input type='text' value={orderInfo.name} onChange={(e) => orderOnChange(e)} name='name' className={cls} placeholder=' Name' />

        <input type='text' value={orderInfo.email} onChange={(e) => orderOnChange(e)} name='email' className={cls} placeholder=' Email' />

        <div className='grid grid-cols-2 gap-2'>
          <input type='text' value={orderInfo.city} onChange={(e) => orderOnChange(e)} name='city' className={cls} placeholder=' City' />

          <input type='text' value={orderInfo.postalcode} onChange={(e) => orderOnChange(e)} name='postalcode' className={cls} placeholder=' Postal Code' />
        </div>
        <input type='text' value={orderInfo.streetAddress} onChange={(e) => orderOnChange(e)} name='streetAddress' className={cls} placeholder='StreetAddress' />
        <input type='text' value={orderInfo.country} onChange={(e) => orderOnChange(e)} name='country' className={cls} placeholder=' Country' />

        <button 
        onClick={()=>Payment()}
        className='bg-green-500 text-white p-1 w-full text-center rounded-md' >Continue To Payment</button>
      </div>
    </div> : <div className="text-4xl font-bold min-h-screen grid grid-cols-3 max-w-6xl mx-auto gap-4 m-2 p-2">
      Cart is Empty
    </div>

  )
}

export default page