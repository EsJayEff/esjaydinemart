import { responseType } from '@/components/utils/ProductsDataArrayAndType';
import Hero from '@/components/views/Hero'
import ProductCarousel from '@/components/views/ProductCarousel';
import ProductTypes from '@/components/views/ProductTypes'
import Jewellery from '@/components/views/Jewellery'
import NewsLetter from '@/components/views/NewsLetter';

async function fetchAllProductsData(){
  let res= await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-07-04/data/query/production?query=*[_type == 'products']`,
  {
    next: {
      revalidate: 60
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch")
  }

  return res.json();
}

export default async function Home() {
  let {result} : responseType = await fetchAllProductsData(); 
  return (
    <div>
     <Hero/>
     <ProductTypes/> 
    <ProductCarousel ProductData={result}/>
    <Jewellery/>
    <NewsLetter/>
    </div>
      )
}
