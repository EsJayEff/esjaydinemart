"use client";
import React, { useState } from "react";
import Image from 'next/image'
import { NavbarArray, NavbarItemType} from '@/components/utils/NavbarArrayAndTypes'
import Link from 'next/link'
import {BiSearch} from "react-icons/bi"
import {BsCart2} from "react-icons/bs"
import { GiHamburgerMenu } from "react-icons/gi";
import {HiOutlineChevronDown} from "react-icons/hi"
import { IoMdClose } from "react-icons/io";
import {Logo} from "@/components/assets"
import DropDown from "./subComponents/DropDown";
import Expanded from "./subComponents/Expanded";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
   const [isNavBarOpen, setisNavBarOpen] = useState<boolean>(false);
   const [cartItemNumber, setcartItemNumber] = useState<number>(0);
   const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e:any){
    if (e.key === "Enter" && e.keycode === 13)
    {
      router.push(`/search/${searchQuery}`)
    }
  }


   return (
   <div className="sticky top-0 backdrop-blur-lg  bg-opacityDownColor z-50">
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
     <div className="flex-shrink-0 relative w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 absolute top-1 right-2 bg-red-400 text-xs font-light rounded-full flex justify-center items-center">{cartItemNumber}</div>
        <BsCart2 size={24}/>
        </div>
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