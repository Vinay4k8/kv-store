"use client";
import { cartContext } from '@/components/CartContext'
import Images from '@/components/Images';
import { formatter } from '@/lib/Formatter'
import queryStringToObject from '@/lib/queryStringToObj'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

const page = ({params:{query}}) => {

    const {addToCart}=useContext(cartContext);

    const [product,setProduct]=useState(null)
    useEffect(()=>{
        const pro=queryStringToObject(query);
        setProduct(pro)
    },[])
  
    let properties = product &&  Object.entries(product.properties);

  return (product &&
    <div className='bg-gray-200 p-4 min-h-screen'>
        <h1 className='text-3xl font-bold mx-2 '>
            {product.title}
        </h1>
        <div className='grid grid-cols-2  gap-4 p-5'>
            <Images images={product.images}/>
            <div className='text-base font-medium m-2 gap-y-5 p-2 bg-white rounded-md'>
                <ul type="square" className='gap-y-3 list-disc px-5 '>
                {product.description.split(".").map((item,index)=>{
                    if(item.length>4)
                    return <li className='p-2' key={index}>{item}</li>
                    return null
                })}
                </ul>
                <div className='p-2 text-sm mt-5 mx-2'>
                    {properties.map(([key,value])=>{
                        return <p key={key}>{`${key} : ${value}`}</p>
                    })}
                </div>
                <div className='flex gap-4 m-1 p-1'>
                    <h3 className=' font-base text-base m-2 p-2'>
                       { `  ${formatter.format(product.price)} `}
                    </h3>
                    <button onClick={(e)=>{addToCart(e,product._id,product.title,product.price)}} 
                        className='hover:bg-blue-400 border-[1px] rounded-md bg-transparent border-blue-400 text-blue-400 hover:text-white flex gap-2 px-3 hover:scale-105 py-2
                        shadow-md m-2'  >Add To Cart
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page