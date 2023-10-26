"use client";
import Categories from '@/components/Categories'
import ProductCard from '@/components/ProductCard';
import { productContext } from '@/components/ProductContext';
import React, { useContext, useState } from 'react'

const page = () => {
    const [categoryid,setCategoryId]=useState("")
    const [categoryname,setCategoryName]=useState("")
    const {products,categories}=useContext(productContext);

  return (
    <div className='bg-gray-200 min-h-screen '>
        <div className='p-1 md:p-5'>
        <h1 className='text-3xl font-semibold'>Categories</h1>
        <Categories categoryid={categoryid} setCategory={setCategoryId} setCategoryName={setCategoryName} categories={categories}/>
        <div>
            <h3 className='text-2xl mx-3 md:p-2 font-base uppercase'>{categoryid.length>0?categoryname:"Products"}</h3>
            <div className='grid grid-cols-2  md:grid-cols-4 gap-4 p-2 md:m-2'>

                    {products.map((product)=>{
                        if(categoryid===product.category && categoryid.length>1)
                        return <ProductCard key={product._id} product={product} />
                        else if(categoryid.length<1)
                        return <ProductCard key={product._id} product={product} />
                        
                    })}
            </div>
        </div>
        </div>
    </div>
  )
}

export default page