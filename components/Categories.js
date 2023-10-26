import React from 'react'

const Categories = ({setCategory,categories,categoryid,setCategoryName}) => {
    let active="underline decoration-gray-500 scale-105"
  return (
    <div className='m-3 border-b-[1px] border-t-[1px] border-b-gray-500  border-t-gray-500 p-2'>
        <div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
            {categories.map((cate)=>{
                
                return <button key={cate._id} onClick={()=>{setCategory(cate._id);setCategoryName(cate.name)}} className={`text-gray-500 p-2 m-2 font-base ${categoryid===cate._id?active:""}`}>{cate.name}</button>
            })
        }
        </div>
    </div>
  )
}

export default Categories