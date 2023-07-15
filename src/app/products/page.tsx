
import React from 'react'
import AllProductsComponent from '@/components/views/AllProducts';
import { responseType } from '@/components/utils/ProductsDataArrayAndType';

async function fetchAllProductsData() {
  let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-07-04/data/query/production?query=*[_type == 'products']`, {
    next: {
          revalidate: 120,
      }
})
 
  if (!res.ok) {
      throw new Error("Failed to fetch")
  }
  return res.json();
};


const Products = async () => {
  const {result} : responseType = await fetchAllProductsData();
  return (
    <div>
      <AllProductsComponent ProductData={result}/>
    </div>
  )
}

export default Products