"use client"


import React, { useContext, useEffect,useState } from 'react'
import { cartContext } from './CartContext';

const Featured = () => {
 const [featured,setFeatured]=useState({_id:"",title:"",description:"",images:[]});
 const {addToCart}=useContext(cartContext);

 useEffect(()=>{
  (async()=>{
  let product=await fetch("/api/products/featured");
  setFeatured(await product.json())
})()
 },[])


  return (featured &&
    <div className='bg-[#222]'>
      <div className='p-4  grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-5'>
        <div className='my-auto order-2 md:order-1'>
          <h3 className='text-4xl capitalize text-white m-2'>
            {featured.title}
          </h3>
          <div className='text-gray-500 text-lg p-2 m-1 line-clamp-4'>
          {featured.description}
          </div>
          <div className='flex gap-4 justify-center mt-3'>
                <button className='p-2 text-xl hover:scale-105 outline-gray-400 bg-[#222] rounded-md text-white border-2'>
                  Read More
                </button>
                <button onClick={(e)=>{addToCart(e,featured._id,featured.title,featured.price)}} 
                className=' flex gap-2 hover:scale-105 hover:bg-blue-500/80 p-2 text-xl bg-blue-500 text-white rounded-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                   Add to Cart
                </button>
          </div>
        </div>
        <div className='m-2 p-2 w-auto md:order-2 order-1'>
            <img
            // src={"https://m.economictimes.com/thumb/msid-80285989,width-1200,height-900,resizemode-4,imgsize-1363135/apple-macbook-pro.jpg"}
            src={featured.images.length >0 ? featured.images[0].fileUrl:""}
            className='rounded-lg shadow-lg'
            alt='img'
            />
        </div>
      </div>
      </div>
  )
}

export default Featured