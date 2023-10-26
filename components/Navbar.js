"use client"


import { Navlinks } from '@/lib/Navlinks'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { cartContext } from './CartContext'
import { usePathname } from 'next/navigation'

import Login from './Login'

const Navbar = () => {

  const {cartProducts}=useContext(cartContext);
  const [activeNav,setActiveNav]=useState(false);
  const pathName=usePathname();
  let active="text-white decoration-white  underline transition-all duration-200 "
  return (
    <div className='bg-[#222] text-gray-500 shadow-lg'>
        <div className='max-w-6xl justify-between mx-auto p-4 flex' >
        <Link href={"/"} className='font-bold text-xl text-white'>KV-STORE</Link>
        <button className='p-2 m-2  md:hidden'  onClick={()=>{setActiveNav(activeNav?false:true)}} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        </button>
        <div className={`md:flex  fixed md:static transition-all duration-300  flex-col md:flex-row gap-4 text-gray-500 text-lg ${activeNav ?"flex gap-y-4 min-h-screen -right-0 w-full bg-[#222] ml-5 p-3":"-right-full"}`}>
        {/* <Link href={"/"} className='md:hidden p-2 mb-4 font-bold text-xl text-white'>KV-STORE</Link> */}
            <button className='p-2   md:hidden'  onClick={()=>{setActiveNav(activeNav?false:true)}} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        {Navlinks.map((item)=>{
            return <Link href={item.link} key={item.title} className={`capitalize ${pathName===item.link?active:""}`}>
            {item.title}
            </Link>
        })}
        <Link href={"/cart"} className={`capitalize ${pathName==="/cart"?active:""}`}>
            Cart ({cartProducts?.length>0 ?cartProducts.length:0})
        </Link>
        <Login/>
        </div>
        </div>
    </div>
  )
}

export default Navbar