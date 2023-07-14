
import React from 'react'

import { oneProductType, responseType } from '@/components/utils/ProductsDataArrayAndType';
import Card from '@/components/views/Card';


async function fetchAllProductsData() {
  let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-07-04/data/query/production?query=*%5B_type+%3D%3D+%22products%22+%26%26+productTypes%5B1%5D+%3D%3D+%22Kid%22%5D%0A++`, {
    next: {
      revalidate: 60
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch")
  }

  return res.json();
}

  
const Kid = async ({ params }: { params: { ktype: string } }) => {
  let res: responseType = await fetchAllProductsData();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 py-10 lg:grid-cols-3 gap-4">
      {res.result.map((items: oneProductType, index: number) => (
        <Card key={index} singleProductData={items} />
      ))}
    </div>
  )
}

export default Kid