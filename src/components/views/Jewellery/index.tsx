import React from "react";
import { Feature} from '@/components/assets'
import Image from "next/image";
import Link from "next/link";

const Jewellery = () => {
  return (
    <div className="px-1 text-gray-700">
      {/* Top Heading */}
      <div className="flex justify-start md:justify-end text-4xl md:text-5xl font-bold py-4">
        <h6 className="max-w-[27rem]">
          Unique and Authentic Vintage Designer Jewellery{" "}
        </h6>
      </div>
      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between py-4 mt-2 gap-5">
        {/* Left Section */}
        <div className=" relative basis-1/2 gap-6 lg:gap-10 grid grid-cols-2 grid-rows-2">
            <div className="absolute -z-50 inset-0 text-gray-100">
                <h6 className="text-[7.5rem] leading-[5.9rem] font-extrabold">Different from others</h6>
            </div>
          <div className="text-lg max-w-[13rem]">
            <h6 className="font-semibold text-xl">
              Using Good Quality Materials
            </h6>
            <p>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
          </div>
          <div className="text-lg max-w-[13rem]">
            <h6 className="font-semibold text-xl">100% Handmade Products</h6>
            <p>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
          </div>
          <div className="text-lg  max-w-[13rem]">
            <h6 className="font-semibold text-xl">Modern Fashion Design</h6>
            <p>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
          </div>
          <div className="text-lg max-w-[13rem]">
            <h6 className="font-semibold text-xl">Discount for Bulk Orders</h6>
            <p>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
          </div>
        </div>
       {/* Right Section */}
       <div className="basis-1/2 flex flex-col lg:flex-row ">
       <div className="w-full lg:w-80 px-4 lg:px-0">
        <Image src={Feature} alt="feature" width={1000} height={1000} loading="lazy"/>
       </div>
       <div className="space-y-6 md:space-y-4 p-6">
        <p style={{wordSpacing:"0.8rem"}} className="h-[90%] lg:max-w-[15rem] py-4">This piece is ethically crafted in our small family-owned workshop in Peru with unmatched attention to detail and care. The Natural color is the actual natural color of the fiber, undyed and 100% traceable.</p>
        <Link href="/products">
        <button className="text-white bg-gray-900 rounded-md py-2 px-6">See All products</button>
        </Link>
       </div>
       </div>
      </div>
    </div>
  );
};

export default Jewellery;
