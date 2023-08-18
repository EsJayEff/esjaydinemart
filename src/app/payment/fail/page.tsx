"use client";

import React from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';


const Fail = () => {
 return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Something Went Wrong!</h2>
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

export default Fail