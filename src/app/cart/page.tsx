
import { oneProductType, responseType } from '@/components/utils/ProductsDataArrayAndType'
import CartComponent from '@/components/views/CartParent/CartChild'
import ContextWrapper from '@/global/context'
import React from 'react'

async function fetchAllStoreProducts() {
  let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-07-04/data/query/production?query=*[_type == 'products']`)
 
  if (!res.ok) {
      throw new Error("Failed to fetch")
  }
  return res.json();
};

const Cart = async () => {
  let {result} : responseType = await fetchAllStoreProducts(); 
  return (
    <CartComponent allProductsOfStore={result}/>
  )
}

export default Cart