import Image from "next/image"
import React from 'react'
import { urlFor } from "../../../sanity/lib/image"
import PortableText from "react-portable-text"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from "next/link"

const Card = ({singleProductData}:any) => {
return (
<Link href={`/catalog/${singleProductData.slug.current}`}>
    <div className="max-w-sm min-w-[20rem] space-y-3 select-none hover:scale-110 duration-300">
        <div className="relative w-full">
            <div className="absolute inset-0 z-10" />
            <Image width={1000} height={1000} src={urlFor(singleProductData.image[0]).width(1000).height(1000).url()} alt={singleProductData.image[0]}/>
        </div>
        <div className="space-y-2 text-gray-600 font-semibold text-lg">
            <h6>{singleProductData.productName}</h6>
            <PortableText className="text-sm font-normal" content={singleProductData.description} />
            <p>${singleProductData.price}</p>
        </div>
    </div>
</Link>
  )
}

export default Card