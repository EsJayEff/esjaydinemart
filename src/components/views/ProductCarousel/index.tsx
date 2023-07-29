"use client";

import React, { FC } from 'react'
import { oneProductType } from '@/components/utils/ProductsDataArrayAndType';
import Card from '../Card';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductCarousel: FC<{ ProductData: Array<oneProductType> }> = ({ ProductData }) => {
let dataToItrate = ProductData.slice(0, 15);

    var settings = {
        dots: false,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

return (
<div>
    <Slider {...settings}>
{dataToItrate.map((item: oneProductType, index: number) => (
                    <Card key={index + 4} singleProductData={item} />
                ))}
    </Slider>
</div>
    )
}

export default ProductCarousel