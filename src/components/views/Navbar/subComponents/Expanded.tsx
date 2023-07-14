"use client";

import React, { FC, useState } from "react";
import { NavbarItemType } from "@/components/utils/NavbarArrayAndTypes";
import Link from "next/link";
import { HiOutlineChevronDown } from "react-icons/hi";

const Expanded: FC<{ key: number , item: NavbarItemType }> = ({ key, item }) => {
  const [isExpanded, setisExpanded] = useState<boolean>(false);
  const [isTimeOut, setisTimeOut] = useState<boolean>(false);

function handleExpand(){
    setisExpanded(!isExpanded);
        setTimeout(()=>
    {
        setisTimeOut(!isTimeOut)
    },100);
}


  return (
    <li className={`${isExpanded ? "h-48" : "h-12"}  duration-300 list-none group mb-6`}>
      <div
        onClick={handleExpand}
        className=" py-2 px-3 flex justify-between hover:bg-gray-400 rounded-md duration-300"
      >
        <Link key={key} href={item.href}>{item.label}</Link>
        {item.isDropDown ? (
          <HiOutlineChevronDown
            className="mt-1 rotate-180 group-hover:rotate-0 duration-300"
            size={15}
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col space-y-1 mt-2">
        {isTimeOut && item.dropDownData?.map((subItem: NavbarItemType, index: number) => (
          item.isDropDown && 
            <Link key={index}
              className="hover:bg-gray-50 rounded-md py-1 px-5 duration-300"
              href={subItem.href}
            >
              {subItem.label}
            </Link>
           
          ))}
      </div>
    </li>
  );
};

export default Expanded;
