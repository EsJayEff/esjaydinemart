"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Feature } from "@/components/assets";
import { RiDeleteBin6Line } from "react-icons/ri";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { urlFor } from "../../../../../sanity/lib/image";

interface propsType {
  ProductArray: oneProductType[];
}

const CartComponent = ({
  allProductsOfStore,
}: {
  allProductsOfStore: Array<oneProductType>;
}) => {
  const [allProductsInCart, setAllProductsInCart] = useState<any>([]);

  useEffect(() => {
    let stateStorage: any = localStorage.getItem("cart") as string;
    stateStorage = JSON.parse(stateStorage);
    if (stateStorage) {
      let data = allProductsOfStore.filter((item: oneProductType) => {
        for (let index = 0; index < stateStorage.length; index++) {
          let element = stateStorage[index];
          if (element.productId === item._id) {
            return true;
          }
        }
      });
      setAllProductsInCart(data);
    }
  }, []);

  return (
    <div className="py-6 px-2 md:px-10">
      {/* {First} */}
      <div className="py-6">
        <h1 className="text-xl font-semibold text-grey-900">Shopping Cart</h1>
      </div>
        {/* {Second} */}

        {allProductsInCart?.map((item: any, index: number) => (
          <div className="  flex flex-col lg:flex-row gap-6 py-4">
            {/* <div className=" flex flex-shrink-0 basis-9/12 gap-6"> */}
              {/* <div className="flex flex-shrink-0 gap-6"> */}
              <div className="w-[14rem] ">
                <Image
                  className="rounded-xl"
                  src={urlFor(item.image[0]).width(1000).height(1000).url()}
                  alt={item.image[0].alt}
                  width={350}
                  height={350}
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 md:space-y-3 w-full">
                <div className="flex justify-between">
                  <h2 className="md:text-2xl font-light text-gray-700">
                    {item.productName}
                  </h2>
                  <RiDeleteBin6Line size={28} />
                </div>
                <p className="text-gray-400 font-medium">
                  {item.productTypes[1] ? item.productTypes[1] : "All"}
                </p>
                <h3 className="text-sm md:text-base">Delivery Estimation</h3>
                <h4 className="text-orange-400 font-semibold md:text-xl">
                  5 Working Days
                </h4>
                <div className="flex justify-between">
                  <p className="font-semibold md:text-lg ">${item.price}</p>
                  <div className="flex gap-2 items-center text-lg">
                    <div className="select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gray-200">
                      -
                    </div>
                    <p>5</p>
                    <div className="border select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full  border-gray-800">
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          // </div>
          // </div>
        ))}

        {/* {Third} */}
        <div className="basis-1/ space-y-6 px-4 py-4 bg-gray-200">
          <h6 className="font-semibold text-xl ">Order Summary</h6>
          <div className="flex justify-between ">
            <p className="text-lg font-light">Quantity</p>
            <p>3 Products</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-lg font-light">SubTotal:</p>
            <p>$ 585</p>
          </div>
          <button className="text-white bg-gray-900 border-gray-800 py-2 px-4 w-full">
            Process to Checkout
          </button>
        </div>
      </div>
  );
};

export default CartComponent;
