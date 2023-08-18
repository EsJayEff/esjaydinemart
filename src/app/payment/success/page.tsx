"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '../../../lib/utils';
import BASE_PATH_FOR_API from '@/components/shared/BasePath';

async function removeAllFromDB()
{
  console.log("Function running for remove all from cart");
  await fetch(`${BASE_PATH_FOR_API}/api/cartfunc`,{
  method: "DELETE",
})};

const Success = () => {
removeAllFromDB();

useEffect(() => {
 runFireworks();
  }, []);

 
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@esjaystore.com">
          order@esjaydinemart.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success