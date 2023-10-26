"use client";
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const cartContext=createContext({});

const CartContextProvider = ({children}) => {

  

    const [cartProducts,setCartProducts]=useState(  []);
    

    const [products,setProducts]=useState([])
    const [totalPrice,setTotalPrice]=useState(0);

    const quantityOfProduct=(id,num)=>{
     
      let cartP=cartProducts.map((product)=>{
        if(product._id===id){
          let quantity=num==1?product.quantity+1:product.quantity-1
          let p= num==1?totalPrice+product.price:totalPrice-product.price
          setTotalPrice(p)
          if(quantity<=0)
          return null 
        let newP={...product,quantity:quantity}
        return newP
        }
        return product
      })
      cartP = cartP.filter((product) => product !== null);
      setCartProducts(cartP);
      if(cartProducts.length<=0){
        setTotalPrice(0)
      }
      localStorage.setItem("cart",JSON.stringify(cartP))
    }


    const addToCart=(e,id,name,price)=>{
      console.log(totalPrice)
        e.preventDefault()
        const idToFind = id
        const foundObject = cartProducts.find(obj => obj._id === idToFind);
        if (foundObject) {
          toast.error(name.toUpperCase()+"Already Exists in Cart")
        } else {setTotalPrice(totalPrice+price)
          setCartProducts((prv)=>{
            return [...prv,{_id:id,quantity:1,title:name,price:price}]
          })
          toast.success(name.toUpperCase()+`Poduct Added Successfully`)
        }
        localStorage.setItem("cart",JSON.stringify(cartProducts))

    }
const getProducts=async()=>{
    let res=await fetch("/api/products/latestproducts");
    let pro=await res.json()
    setProducts(pro);
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartProducts(storedCart);
      storedCart.length>0 && storedCart.map(({price})=>{setTotalPrice(prv=>prv+price)})
    }
}

    useEffect(()=>{
        getProducts();
    },[])

  return (
    <cartContext.Provider  value={{cartProducts,totalPrice,addToCart,products,quantityOfProduct}} >
        {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider