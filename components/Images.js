"use client"
import React, { useState } from 'react'
const Images = ({images}) => {
    const [activeImg,setActiveImg]=useState(images[0]?.fileUrl);

  return (
    <div className='bg-white rounded-md'>
        <div className='flex justify-center items-center p-3 shadow-md'>
            <img alt={activeImg} src={activeImg} className='m-2 p-2 w-64'/>
        </div>
        <div className='grid grid-cols-4 gap-2 m-3'>
            {images.length>0 && images.map(({fileUrl})=>{
                
                return <div onClick={(e)=>setActiveImg(fileUrl)} 
                 className={`p-2 border-[1px] shadow-md rounded-sm ${activeImg===fileUrl?"border-blue-400":"border-gray-400"} flex justify-center items-center`}> 
                <img src={fileUrl} alt={fileUrl} key={fileUrl} className='w-20' />
                </div>
            })}
        </div>
    </div>
  )
}

export default Images