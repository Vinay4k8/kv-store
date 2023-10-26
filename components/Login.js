"use client";
import React from 'react'
import {FcGoogle} from "react-icons/fc"
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
    const {data:session}=useSession()
   
  return (
    <div className='mx-2 md:-mt-1'>
        {session?.user ?<div className="md:flex gap-3 items-center justify-center">
           <img src={session.user.image} className='w-10 rounded-2xl h-10' /> <span className='text-white capitalize
        '>{session.user.name}</span>
        
        </div>:
        <button onClick={()=>{signIn('google')}}
         className='flex gap-2 items-center justify-center bg-transparent hover:bg-white hover:text-black text-white rounded-md px-2 py-1 border-[1px] border-white hover:border-black'>
            LogIn
        <FcGoogle size={20} />
        </button>}
    </div>
  )
}

export default Login