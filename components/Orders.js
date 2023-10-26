"use client"
import React, { useContext } from 'react'
import { productContext } from './ProductContext'


const Orders = ({orders}) => {
  const {products}=useContext(productContext);


  const getImgUrl=(name)=>{
const product=products.find(obj=>obj.title===name);
return product?.images[0]?.fileUrl
  }

  
  return ( orders.length >0 &&
    <div>
      <table className='w-full'>
        <thead>
        <tr>
          <th>Product Details</th>
          <th>Order Details</th>
          <th className='hidden md:inline-block'>Address</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>{orders.map((order)=>{
          return (order.line_items.map((item,index)=>{
            return(
            <tr key={index} >
              <td className='flex flex-col items-center justify-center '>
                <img className='w-20 md:w-44'
                // src='https://utfs.io/f/b1808e2d-38dd-4ef2-8f7e-a89038c4cc39-wq0k1j.jpg'
              src={getImgUrl(item.price_data.product_data.name)}
                alt='img'/>
                <span className='md:text-xl text-sm font-bold tracking-wider'>{item.price_data.product_data.name}</span>
                  </td>
                  <td className='text-left  md:text-base text-sm max-w-lg'>
                  OrderID : {order._id}
                  <span className='block'>DATE : {new Date(order.createdAt).toLocaleString()}</span>
                  <span>Quantity: {item.quantity}</span>
                  </td>
                  <td className='md:text-base text-sm max-w-sm hidden md:inline-flex items-center md:-mt-[100px]'>{`${order.name},${order.email},\n${order.streetAddress},${order.city} ${order.postalcode}, \n${order.country}`}</td>
                  <td className='text-green-500'>Order Placed</td>
                  </tr>
            )
          })
            
          )
        })}
       
        </tbody>
      </table>
    </div>
  )
}

export default Orders