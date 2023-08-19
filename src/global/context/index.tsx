"use client";

import React,{FC, ReactNode, createContext, useEffect, useReducer, useState} from 'react'
import { cartReducer } from '../reducer';
import { auth } from '@/lib/firebase';
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import BASE_PATH_FOR_API from '@/components/shared/BasePath';
export const cartContext = createContext<any>(null);


// For User Management Code
interface indexForError {
    [key: string]: string
};



const ContextWrapper : FC <{children : ReactNode}> = ({children}) => {

// Calling APIs to fetch the data

const [cartArray, setCartArray] = useState<any>([]);
const [loading, setLoading] = useState(false);
const [userData, setUserData] = useState<any>();
let router = useRouter();
const [quantity, setQuantity] = useState(0);

async function fetchApiForAllCartItems(){
let res = await fetch(`${BASE_PATH_FOR_API}/api/cartfunc`);
if(!res.ok){
    throw new Error ("Failed to Fetch something went wrong")
}
let dataToReturn = await res.json();
setCartArray((prev:any)=> dataToReturn.allCartData);
setQuantity(cartArray.length);
console.log(setQuantity);
if (dataToReturn){
return true;
}
}


useEffect(() => {
    if (cartArray.length !== 0) {
        setQuantity(cartArray.length);
    }else{
        let zeroVariable=0;
        setQuantity(zeroVariable);
    }
}, [cartArray, quantity]);


// Function to call on page load
useEffect(() => {
    fetchApiForAllCartItems();
}, [userData]);


async function dispatch(payload:string, data:any){
    console.log("Database Array of Cart:", cartArray.length);
    if (payload === "addToCart"){
        console.log("Function running for add to cart");
        await fetch(`${BASE_PATH_FOR_API}/api/cartfunc`,{
            method: "POST",
            body:JSON.stringify(data),
        });
    }else if (payload === "removeFromCart"){
        console.log("Function running for remove from cart");
        await fetch(`${BASE_PATH_FOR_API}/api/cartfunc?product_id=${data.product_id}&user_id=${data.user_id}`,{
            method: "DELETE",
        });
    }else if (payload === "updateCart"){
        console.log("Function running update to cart");
        setLoading(true);
        await fetch(`${BASE_PATH_FOR_API}/api/cartfunc`,{
            method: "PUT",
            body:JSON.stringify(data),
        });

        setLoading(false);
    } 
    let resp = await fetchApiForAllCartItems();
    setQuantity(cartArray.length);
    if(resp){
    return "success";
} else {
    return "unsuccessful"
}
}



// cart Management when using local storage for testing
// const cartInitializer = {
//     cart:[],
//  }
// const [state, dispatch] = useReducer(cartReducer,cartInitializer); 

// useEffect(() => {
//  let cart = localStorage.getItem("cart") as string;

//  if (cart === null)
//  {
//     const ISSERVER = typeof window === "undefined";
//     if (!ISSERVER) localStorage.setItem("cart", JSON.stringify(state.cart));
//  }
//  else {
//      cartInitializer.cart = JSON.parse(cart);
//  }
// })

// useEffect(() =>{ 
// localStorage.setItem("cart", JSON.stringify(state.cart))
// },[state.cart])




// User Management 

const [errorsOfFirebase, setErrorsOfFirebase] = useState({
    key: "",
    errorMessage: "",
});
let user = auth.currentUser;
const [errorViaUserCredential, setErrorViaUserCredential] = useState<indexForError | "">("")

useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
        if (user) {
            setUserData({
                displayName: user.displayName,
                email: user.email,
                uuid: user.uid,
                // photoUrl: user.photoURL,
                emailVerified: user.emailVerified
            })
        } else {
            setUserData(null);
        }
    });
}, [])

// user sign up
function signUpUser(email: string, password: string) {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password).then((res: any) => {
        setLoading(false);
        router.push("/");
    }).catch((res: any) => {
        let error = res.code.split("/")
        error = error[error.length - 1];
        setErrorsOfFirebase({
            key: "signup",
            errorMessage: error
        })
        setLoading(false);
    });
    setLoading(false);
};

// user sign in
function signInUser(email: string, password: string) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password).then((res: any) => {
        setLoading(false);
        router.push("/");
    }).catch((res: any) => {
        let error = res.code.split("/")
        error = error[error.length - 1];
        setErrorsOfFirebase({
            key: "signin",
            errorMessage: error
        })
    });
    setLoading(false);
}

// user Logout function
function LogOut() {
    setLoading(true);
    signOut(auth);
    setLoading(false);
    window.location.reload();
};


// Sign up with Google Function
let provider = new GoogleAuthProvider();
function signUpViaGoogle() {
    setLoading(true)
    return signInWithPopup(auth, provider).then((userData: any) => {
        if (userData) {
            setUserData({
                displayName: userData.user.displayName,
                email: userData.user.email,
                uuid: userData.user.uid,
                // photoUrl: userData.user.photoURL,
                emailVerified: userData.user.emailVerified
            });
            router.push("/")
        }
        setLoading(false)
    })
}


function sendEmailVerificationCode() {
    setLoading(true);
    if (user) {
        sendEmailVerification(user).then((res: any) => {
            console.log("sended");
            window.location.href = "/"
        })
        setLoading(false);
    }
}

function updateUserNamePhoto(userName: string, photoURL?: string) {
    setLoading(true);
    if (user) {
        updateProfile(user, {
            displayName: userName, 
            // photoURL: "https://sigc.edu/sigc/ad-sigc/datas/images/user.png"
        }).then(() => {
            setLoading(false);
            window.location.reload();
        }).catch((error: any) => {
            setLoading(false);
            console.log(error)
        });
    }
}


return (
    <cartContext.Provider value={{cartArray, quantity, dispatch, signUpUser, signInUser, LogOut,signUpViaGoogle,loading,errorsOfFirebase, userData, updateUserNamePhoto,sendEmailVerificationCode}}>
        {children}
    </cartContext.Provider>
  )
}


export default ContextWrapper