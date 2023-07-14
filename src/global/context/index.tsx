"use client";

import React,{FC, ReactNode, createContext, useReducer, useState} from 'react'
import { cartReducer } from '../reducer';

export const cartContext = createContext<any>(null);

const ContextWrapper : FC <{children : ReactNode}> = ({children}) => {
 const cartInitializer = {
    cart:[
        {
            productId:"",
            quantity:1,
        }
    ]
 }
 
 
 const [name, setname] = useState("name");
 const [state, dispatch] = useReducer(cartReducer,cartInitializer); 
 
    return (
    <cartContext.Provider value={{state, dispatch}}>
        {children}
    </cartContext.Provider>
  )
}


export default ContextWrapper