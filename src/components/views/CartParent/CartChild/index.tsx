"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { urlFor } from "../../../../../sanity/lib/image";
import { cartContext } from "@/global/context";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import getStripe from "../../../../lib/getStripe";

interface propsType {
  ProductArray: oneProductType[];
}

const CartComponent = ({
  allProductsOfStore,
}: {
  allProductsOfStore: Array<oneProductType>;
}) => {
  const [allProductsInCart, setAllProductsInCart] = useState<any>([]);
  let {userData, cartArray, dispatch, loading} = useContext(cartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  let router = useRouter();


function priceSubTotal(){
  let originalToSend: number = 0;
  allProductsInCart && allProductsInCart.forEach((element: oneProductType) => {
      let subTotalPrice = element.quantity * element.price;
      originalToSend = originalToSend + subTotalPrice;
  });
  if (originalToSend !== 0 && cartArray.length !== 0 ) {
    setTotalPrice(originalToSend);
    router.refresh();   
  } else {
    originalToSend = 0;
    setTotalPrice(originalToSend);
  }
}

useEffect(()=>{
priceSubTotal();
},[allProductsInCart])

function handleRemove(product_id:string){
  if(userData){
  let user_id= userData.uuid
  dispatch("removeFromCart", {product_id, user_id} );
}
}

async function handleIncrementByOne(product_id:string, price :any){
  let stableQuantity:number = 0;
  cartArray.forEach((element:any)=>
  {
    if(element.product_id == product_id){
      stableQuantity = element.quantity;
    }
  });
 
await dispatch("updateCart", {product_id:product_id, quantity:stableQuantity+1,user_id:userData.uuid, price:price})
notificationError("Quantity increased by one");
  
}

async function handleDecrementByOne(product_id:string, price :any){
  let stableQuantity:number = 0;
  cartArray.forEach((element:any)=>
  {
    if(element.product_id == product_id){
      stableQuantity = element.quantity;
    }
  });
  if (stableQuantity <= 1 ){
    notificationError("Quantity less than one is not accepeted");
  } else {
  await dispatch("updateCart", {product_id:product_id, quantity:stableQuantity-1,user_id:userData.uuid,price:price})
  notificationError("Quantity decreased by one");
  }
}


const notificationError = (title: string) => {
  toast(title, {
    position: "top-right"
  })
};


// used to check when testing using local storage

  useEffect(() => {
    // let stateStorage: any = localStorage.getItem("cart") as string;
    // stateStorage = JSON.parse(stateStorage);
    if (cartArray) {
      let data = allProductsOfStore.filter((item: oneProductType) => {
        for (let index = 0; index < cartArray.length; index++) {
          let element:any = cartArray[index];
          if (element.product_id === item._id && element.user_id === userData.uuid) {
            return true;
          }
        }
      });
     let updatedData = data.map((elem:oneProductType)=>{
      for (let index=0; index< cartArray.length; index ++){
        let element:any = cartArray[index];
        if(element.product_id === elem._id){
          return{
            ...elem,
            quantity: element.quantity,
          }
        }
      }
     })
setAllProductsInCart(updatedData);
} 
}, [cartArray]);

const handleCheckout = async () => {
  let lineItems : any = [];
  cartArray.forEach((cartItem:any) =>
    lineItems.push({
    name: cartItem.product_name,
    description: cartItem.product_desc,
    images: cartItem.image_url,
    price: cartItem.price,
    quantity: cartItem.quantity,       
}));

 const stripe = await getStripe();

  const checkoutSession = await fetch("/api/stripe-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({lineItems}),
  });

  const sessionID= await checkoutSession.json();
  toast.loading("Redirecting...");
  const result = await stripe?.redirectToCheckout({
    sessionId: sessionID,
  });
  if (result?.error) {
    alert(result.error.message);
  }

};


  return (
    <div className="py-6 px-2 md:px-10">
      <Toaster/>
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
                  <div className="cursor-pointer" onClick={()=>handleRemove(item._id)}><RiDeleteBin6Line size={28} /></div>
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
                  <div className={`flex gap-2 ${loading ? "opacity-50" : "opacity-100"}items-center text-lg`}>
                    <button 
                    onClick={()=>handleDecrementByOne(item._id, item.price)}
                    className="select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gray-200">
                      -
                    </button>
                    <p>
                     {item.quantity}
                    </p>
                    <button 
                    onClick={()=>handleIncrementByOne(item._id,item.price)}
                    disabled={loading}
                    className="border select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full  border-gray-800">
                      +
                    </button>
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
            <p>{cartArray.length}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-lg font-light">SubTotal:</p>
            <p>${totalPrice}</p>
          </div>
          <button 
          onClick={()=>handleCheckout()}
          className="text-white bg-gray-900 border-gray-800 py-2 px-4 w-full">
            Process to Checkout
          </button>
        </div>
      </div>
  );
};

export default CartComponent;
