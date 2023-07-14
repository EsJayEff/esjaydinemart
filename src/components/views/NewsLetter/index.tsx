import React from 'react'

const NewsLetter = () => {
  return (
    <div className="relative text-center space-y-4 min-h-[40vh] md:h-[70vh] lg:min-h-[40rem] flex flex-col justify-center items-center ">
      <h6 className="absolute text-6xl md:text-[9rem] font-bold text-gray-200 text-center -z-50 mx-auto">Newsletter</h6>
      <h6 className="text-3xl md:text-4xl text-gray-800">Subscribe Our Newsletter</h6>
        <p className='max-w-[16rem] text-lg font-medium'>Get the latest information and promo offers directly</p>
        <div className="flex space-x-4 flex-wrap items-center justify-center">
        <input className="border-gray-600 border py-1 px:2 md:px-4 flex flex-grow w-52 md:w-[80]" type="text" placeholder="Input email address"/>
       
        <button className="text-white bg-gray-900 border-gray-800 py-2 px-4">Get Started</button>
        </div>
        
    </div>
  )
}

export default NewsLetter