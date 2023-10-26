"use client"
import React, { useContext, useState } from 'react'
import { cartContext } from './CartContext'
import { formatter } from '@/lib/Formatter';

const Table = ({cartProducts,products}) => {

    const {quantityOfProduct,totalPrice}=useContext(cartContext);
    
  return (
    <div>
        <table className='w-full'>
            <thead className='border-b-[0.2px] border-b-gray-400'>
                <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
               {cartProducts.length>0 &&  cartProducts.map((item)=>{
                    const product = products.find(obj => obj._id === item._id);
                    return( <tr key={product._id}>
                        <td className='flex flex-col items-center justify-center '>
                        <img className='md:w-44 w-20'
                        // src='https://utfs.io/f/b1808e2d-38dd-4ef2-8f7e-a89038c4cc39-wq0k1j.jpg'
                        src={product?.images[0].fileUrl}
                         alt='img'/>
                        <span className='md:text-xl text-base font-bold tracking-wider'>{product.title}</span>
                    </td>
                    <td className=''>
                    <button onClick={()=>quantityOfProduct(product._id,-1)} >-</button>
                       <span>{item.quantity}</span> 
                    <button onClick={()=>quantityOfProduct(product._id,1)} >+</button>
                    </td>
                    <td className='font-base'>INR {formatter.format(item.price*item.quantity).substring(1)}</td>
                    </tr>
                    );
                })}
                <tr>
                <td></td>
                <td></td>
                <td className='font-base'>INR {formatter.format(totalPrice).substring(1) }</td>
                </tr>
                    
                
            </tbody>

        </table>
    </div>
  )
}

export default Table