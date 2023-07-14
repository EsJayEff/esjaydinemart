import React from 'react'
import BASE_PATH_FOR_API from '@/components/shared/BasePath';
import AllProductsComponent from '@/components/views/AllProducts';
import { oneProductType } from '@/components/utils/ProductsDataArrayAndType';

async function fetchAllProducts (){
  let res = await fetch(`${BASE_PATH_FOR_API}/api/products?start=0&end=10`, { next: {
    revalidate:120
  }})
  
  if(!res.ok){
    throw new Error ("Failed to fetch")
  }
  return res.json();
}




const Products = async () => {
  const ProductsData = await fetchAllProducts();
  return (
    <div>
      <AllProductsComponent ProductData={ProductsData}/>
    </div>
  )
}

export default Products