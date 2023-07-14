import { HeroGirl,Bazaar,Bustle,Versace,InStyle } from '@/components/assets'
import Image from 'next/image'
import React from 'react'
import {BsCart2} from 'react-icons/bs'


const Hero = () => {
return (
    <div className= "flex justify-between items-center">
        {/* Right Side */}
    <div className="space-y-5 max-w-sm">
    <button aria-label="redirect the user to the sale page" className="rounded-md bg-blue-300 text-blue-600  px-3 py-1 font-medium">Sale 70%</button>
    <h1 className="text-3xl md:text-6xl text-gray-800 font-bold">An Industrial Take on Streetwear</h1>
    <p className="text-gray-800">Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</p>
    <button aria-label="redirect the user to the sale page" className="flex gap-3 bg-gray-900 text-white font-semibold py-4 px-4">
    <BsCart2 size={24}/>
    <p className="whitespace-pre-line">Start shopping</p>    
    </button> 
    <div className="flex justify-evenly gap-6">
    <div className="w-14 md:w-24">
    <Image width={120} height={200} src={Bazaar} alt="Bazaar"/>
    </div>
    <div className="w-14 md:w-24">
    <Image width={120} height={200} src={Bustle} alt="Bustle"/>
    </div>
    <div className="w-14 md:w-24">
    <Image width={120} height={200}  src={Versace} alt="Versace"/>
    </div>
    <div className="w-14 md:w-24">
    <Image width={120} height={200} src={InStyle} alt="InStyle"/>
    </div>
    </div>
    </div>
    {/* Left Side */}
    <div className="hidden md:flex bg-primaryWhite rounded-full ">
        <Image src={HeroGirl} width={650} height={650} alt="HeroGirl"/>
    </div>
    </div>
  )
}

export default Hero