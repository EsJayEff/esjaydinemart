import BASE_PATH_FOR_API from '@/components/shared/BasePath';
import { responseType } from '@/components/utils/ProductsDataArrayAndType';
import Hero from '@/components/views/Hero'
import ProductCarousel from '@/components/views/ProductCarousel';
import ProductTypes from '@/components/views/ProductTypes'
import { client } from "../../sanity/lib/client"
import Jewellery from '@/components/views/Jewellery'
import NewsLetter from '@/components/views/NewsLetter';

// async function fetchAllProductsData(){
//   let res= await fetch(`${BASE_PATH_FOR_API}/api/products`);
//   if (!res.ok){
//     throw new Error("Failed to fetch")
//   }
//   return res.json();
// }

export const fetchAllProductsData = async () => {
  const productsQuery = '*[_type == "products"]';
  const products = await client.fetch(productsQuery);
  return products;
};


export default async function Home() {
 const result : responseType = await fetchAllProductsData(); 
//  console.log(result)
 return (
    <div>
     {/* <Hero/>
     <ProductTypes/> 
    <ProductCarousel ProductData={result}/>
    <Jewellery/>
    <NewsLetter/> */}
    </div>
      )
}
