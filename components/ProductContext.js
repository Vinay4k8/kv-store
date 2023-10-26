"use client";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
export const productContext=createContext({});

export const ProductContext=({children})=>{
    const {data:session}=useSession();
    const [products,setProducts]=useState([]);
    const [user,setUser]=useState({})
    const [orders,setOrders]=useState([]);
    const [categories,setCategories]=useState([])


    const getProducts=async()=>{
        let res=await fetch("/api/products")
        let cate=await fetch("/api/categories");
        setCategories(await cate.json())
        setProducts(await res.json());
    }
    
   
    const getUserId=async()=>{
        
        if(session?.user){
        let res=await fetch("/api/user",{method:"POST",
        body:JSON.stringify({email:session.user.email})})
        let userp=await res.json()
        setUser(userp);
        
        let ordersfetch=await fetch("/api/order/getUserOrders",{method:"POST",
    body:JSON.stringify({id:userp._id})})
    setOrders(await ordersfetch.json());
}
    }
   

    useEffect(()=>{
        getUserId()
    },[session])


    useEffect(()=>{getProducts()},[])

    return <productContext.Provider value={{categories,products,user,setUser,orders,getUserId}}>
        {children}
    </productContext.Provider>
}