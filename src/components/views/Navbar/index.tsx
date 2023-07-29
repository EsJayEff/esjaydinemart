"use client";
import React, { useState } from "react";
import Image from 'next/image'
import { NavbarArray, NavbarItemType} from '@/components/utils/NavbarArrayAndTypes'
import Link from 'next/link'
import {BiSearch} from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi";
import {HiOutlineChevronDown} from "react-icons/hi"
import { IoMdClose } from "react-icons/io";
import {Logo} from "@/components/assets"
import DropDown from "./subComponents/DropDown";
import Expanded from "./subComponents/Expanded";
import { useRouter } from "next/navigation";
import ContextWrapper from "@/global/context";
import CartState from "./subComponents/CartState";

const Navbar = () => {
  const router = useRouter();
   const [isNavBarOpen, setisNavBarOpen] = useState<boolean>(false);
   const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e:any){
    if (e.key === "Enter" && e.keycode === 13)
    {
      router.push(`/search/${searchQuery}`)
    }
  }


   return (
  <ContextWrapper>
   <div className="sticky top-0 backdrop-blur-lg  bg-opacityDownColor z-20">
    <div className="py-6 flex justify-between items-center space-x-12">
        <div className="w-36 flex-shrink-0">
    <Link href="/">
    <Image width={500} height={500} src={Logo} alt="Logo"/>
    </Link>
    </div>
    <div className="hidden lg:flex justify-between items-center w-full">
    <ul className="flex space-x-4 font-medium text-lg">
    {NavbarArray.map((item:NavbarItemType, index:number)=>
    (
     <li key={index} className="flex items-center relative rounded-sm px-3 py-1 hover:bg-gray-100 cursor-pointer group">
            <Link href={item.href}>{item.label}</Link>
            {item.isDropDown ? <HiOutlineChevronDown className="mt-1 rotate-180 group-hover:rotate-0" size={16}/>:""}
            {item.isDropDown && <div className={`invisible group-hover:visible absolute top-8 left-0 py-2 px-6 bg-gray-100 font-light min-w-[7.8rem]`}>
            <DropDown key={index} item={item} /> </div>}
     </li>
        
    ))}
     </ul>
     <div className="border flex items-center px-4 rounded-md bg-white">
        <Link href={`/search/${searchQuery}`}><BiSearch/></Link>
        <input value={searchQuery} 
        onChange={(e)=> setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        type="text" className="pl-1 pr-4 py-1 w-80 focus:outline-none"
        placeholder='Search in Our Store'/>
     </div>
    <CartState/>
     </div>

     <div onClick={() => setisNavBarOpen(!isNavBarOpen)}>
        {isNavBarOpen ? (
          <div className="flex lg:hidden">
            <IoMdClose size={28} />
          </div>
        ) : (
          <div className="flex lg:hidden">
            <GiHamburgerMenu size={25} />
          </div>
        )}
      </div>
</div>
      { isNavBarOpen && <MobileNavbar/>}
      </div>
</ContextWrapper>    
  )
}

export default Navbar

const MobileNavbar = () => {
  return (
      <div className="w-full px-6 py-4 bg-gray-100 lg:hidden mb-4">
          {
              NavbarArray.map((item: NavbarItemType, index: number) => {
                  return (
                      <Expanded key={index} item={item} />
                  )
              })
          }
      </div>
  )
}