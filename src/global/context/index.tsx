"use client";

import React,{FC, ReactNode, createContext, useEffect, useReducer, useState} from 'react'
import { cartReducer } from '../reducer';
import { auth } from '@/lib/firebase';
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
export const cartContext = createContext<any>(null);



const ContextWrapper : FC <{children : ReactNode}> = ({children}) => {
const cartInitializer = {
    cart:[],
 }



const [state, dispatch] = useReducer(cartReducer,cartInitializer); 

useEffect(() => {
 let cart = localStorage.getItem("cart") as string;

 if (cart === null)
 {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) localStorage.setItem("cart", JSON.stringify(state.cart));
 }
 else {
     cartInitializer.cart = JSON.parse(cart);
 }
})

useEffect(() =>{ 
localStorage.setItem("cart", JSON.stringify(state.cart))
},[state])


interface indexForError {
    [key: string]: string
};
const [loading, setLoading] = useState(false);
const [userData, setUserData] = useState<any>();
let router = useRouter();
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
                photoUrl: user.photoURL,
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
                photoUrl: userData.user.photoURL,
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
            photoURL: "https://sigc.edu/sigc/ad-sigc/datas/images/user.png"
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
    <cartContext.Provider value={{state, dispatch, signUpUser, signInUser, LogOut,signUpViaGoogle,loading,errorsOfFirebase, userData, updateUserNamePhoto,sendEmailVerificationCode}}>
        {children}
    </cartContext.Provider>
  )
}


export default ContextWrapper