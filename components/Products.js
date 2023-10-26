"use client";
import React ,{ useState,useEffect, useContext} from 'react'
import ProductCard from './ProductCard';
import { cartContext } from './CartContext';

const Products = () => {

  const {products}=useContext(cartContext);


  return (
    <div className='max-w-6xl mx-auto'>
        <div className='grid md:grid-cols-3 p-2 grid-cols-2'>
        {products.length>0 && products.map((product)=>{
            return <ProductCard key={product._id} product={product} />
        })}
        </div>
    </div>
  )
}

export default Products