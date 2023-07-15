"use client";

import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { FC } from "react";
import Card from "../Card";

interface propsType {
  ProductArray: oneProductType[];
}

import React from 'react'

const AllProductsComponent: FC<{ ProductData: Array<oneProductType> }> = ({ ProductData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ProductData.map((items: oneProductType, index: number) => (
            <Card key={index} singleProductData={items} />
    ))}
 </div>
  )
}

export default AllProductsComponent