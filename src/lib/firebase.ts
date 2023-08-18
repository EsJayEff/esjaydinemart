import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU4t5LGkLoEfTHeGfwDn868czQXiFGIo0",
  authDomain: "esjaydinemart.firebaseapp.com",
  projectId: "esjaydinemart",
  storageBucket: "esjaydinemart.appspot.com",
  messagingSenderId:"156686796673",
  appId: "1:156686796673:web:6481f3a95cf6ddfe2f8a80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();




