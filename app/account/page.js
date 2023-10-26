"use client"
import Orders from '@/components/Orders';
import { productContext } from '@/components/ProductContext';
import { signOut, useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react';

const page = () => {

    const {data:session}=useSession();
    const {orders,getUserId}=useContext(productContext);
   
  return (session?.user ?
    <div className='min-h-screen max-w-6xl mx-auto p-3'>
        <h1  className='text-3xl font-semibold p-2 m-1' >Account</h1>
        <div className='rounded-md bg-white p-2 m-2'>
            <div className='grid md:grid-cols-2 gap-2 shadow-md'>
                <div className='rounded-lg p-2 m-2'>
                <img src={session.user.image} className='rounded-xl' />
                </div>
                <div className=''>
                    <h2 className='text-gray-500 text-xl tracking-widest uppercase'>Name : {session.user.name}</h2>
                    <h2 className='text-gray-500 text-xl tracking-widest'>Email : {session.user.email}</h2>
                    <button onClick={()=>signOut()} className='shadow-md p-2 flex justify-center items-center bg-red-400 text-white rounded-sm hover:scale-105 my-2' >
                        Log Out
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </button>
                   
                </div>
            </div>
        </div>
        <h1  className='text-3xl font-semibold p-2 m-1' >Orders</h1>
        <div className='rounded-md bg-white p-2 md:m-2'>
                <Orders orders={orders}/>
            </div>
    </div>:<div className='bg-gray-200 min-h-screen p-4 flex items-center justify-center'><h1 className=' bg-white text-center text-2xl font-base p-4 rounded-md shadow-sm'>Please Login To Continue</h1></div>
  )
}

export default page