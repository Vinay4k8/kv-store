"use client";
import ProductCard from '@/components/ProductCard';
import { productContext } from '@/components/ProductContext'
import React, { useContext } from 'react'


const page = () => {

    const {products}=useContext(productContext)
  return (products.length>0 &&
    <div className='bg-gray-200 py-3 md:px-2'>
        <h1 className='text-3xl font-semibold p-2  '>All Products</h1>
        <div className='grid md:grid-cols-4 grid-cols-2 p-1 md:p-2 md:m-4 m-1  gap-3'>
                {products.map((product)=>{
                    return <ProductCard key={product._id} product={product}/>
                })}
        </div>
        
    </div>
  )
}

export default page