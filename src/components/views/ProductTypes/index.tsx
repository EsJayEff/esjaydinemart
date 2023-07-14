import { event1,event2,event3 } from '@/components/assets'
import Image from 'next/image'
import React from 'react'

const ProductTypes = () => {
  return (
    <div className="py-16 px-2 space-y-3">
      <div className="text-center space-y-3"> 
         <div>
            <p className="text-blue-800 text-2xl font-bold">PROMOTIONS</p>
          </div>
          <div><h3 className="text-5xl text-gray-800 font-bold">Our Promotions Events</h3></div>
        </div>
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 px-6 text-gray-800">
        
        {/* First Grid */}
        <div className=" flex w-full flex-col sm:flex-row  col-span-1 md:col-span-2  bg-cat1 px-12 items-center justify-between">
        <div className="max-w-[13rem] py-8">
          <h4 className="text-2xl font-bold">GET UP TO 60%</h4>
          <p className="text-xl">For the summer season</p>
        </div>  
        <div className="w-64">
        <Image width={1000} height={1000} src={event1} alt="event1" />
        </div>
        </div>
        {/* Second Grid */}
        <div className="w-full row-span-1 md:row-span-2 h-full bg-cat3 flex  flex-col items-center justify-center">
        <div className="p-4">
          <p>Flex Sweatshirt</p>
          <p className="text-lg">
            <del>$100.00</del>
          &nbsp;&nbsp;&nbsp;
          <b ><ins>$75.00</ins>
          </b>
          </p>
        </div>
        <div className="w-64">
        <Image width={1000} height={1000} src={event2} alt="event2" />
        </div>
        </div>
        {/* Third Grid */}
        <div className="w-full row-span-1 md:row-span-2 bg-cat4 flex  flex-col items-center justify-center">
        <div className="p-4">
          <p>Flex Sweatshirt</p>
          <p className="text-lg">
            <del>$100.00</del>
          &nbsp;&nbsp;&nbsp;
          <b ><ins>$75.00</ins>
          </b>
          </p>
        </div>
        <div className="w-64">
        <Image width={1000} height={1000} src={event3} alt="event3" />
        </div>


        </div>
        {/* Fourth Grid */}
        <div className="text-white w-full py-8 col-auto md:col-span-2 bg-cat2 flex flex-col justify-center items-center space-y-3">
          <h3 className="font-extrabold text-4xl">GET 30% Off</h3>
          <p>USE PROMO CODE</p>
          <button aria-label="Redirect user to Dine Week End Sale"
          className="py-1 px-6 bg-gray-600 rounded-lg tracking-widest font-medium"
          >DINEWEEKENDSALE</button>


        </div>
      </div>
      </div>
  )
}

export default ProductTypes