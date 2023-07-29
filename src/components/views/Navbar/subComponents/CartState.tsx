"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {BsCart2} from "react-icons/bs"

const CartState = () => {
    const [cartQuantity, setcartQuantity] = useState(0);
    useEffect(() => {
        let stateStorage : any = localStorage.getItem("cart") as string;
        stateStorage = JSON.parse(stateStorage);
        if (stateStorage){
          setcartQuantity(stateStorage.length);      
        }
    }, [])

  return (
      <div className="flex-shrink-0 relative w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center">
          <Link href="/cart">
          <div
              className="w-4 h-4 absolute top-1 right-2 bg-red-400 text-xs font-light rounded-full flex justify-center items-center"
          >
              {cartQuantity}
          </div>
          <BsCart2 size={24} />
          </Link>
      </div>
  )

}
export default CartState