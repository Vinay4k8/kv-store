"use client";
import Link from 'next/link';
import React, { useContext } from 'react'
import { cartContext } from './CartContext';
import objectToQueryString from '@/lib/objToQueryString';

const ProductCard = ({product}) => {
  const {addToCart}=useContext(cartContext);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
      });
      
     let price=formatter.format(product.price)
  return (<Link href={`/product/${objectToQueryString(product)}`}>
    <div className='m-3 w-auto h-auto shadow-lg rounded-md py-2 px-4 flex-col items-center justify-center'>
        <div className='bg-white w-full flex items-center justify-center h-auto p-3 rounded-md'>
            <img className='w-44' 
            src={product.images ? product.images[0].fileUrl:""} alt={product.title} />
        </div>
        <div className='m-2 p-1 md:pt-3 md:p-1'>
           <h1 className='font-bold md:text-lg text-sm'
           >{product.title}</h1>
           <div className='flex items-center m-1 gap-4 '>
           <h3 className=' font-semibold text-base'>
              INR { price.substring(1) }
          </h3>
          <button onClick={(e)=>{addToCart(e,product._id,product.title,product.price)}} 
          className='hover:bg-blue-400 border-[1px] rounded-md bg-transparent border-blue-400 text-blue-400 hover:text-white flex gap-2 px-3 hover:scale-105 py-2
           shadow-md'  ><span className='hidden md:block'>Add To Cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
           </div>
          
        </div>

    </div>
    </Link>
  )
}

export default ProductCard