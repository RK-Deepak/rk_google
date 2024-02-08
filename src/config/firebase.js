import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { config } from "./config";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey:config.firebase_api,
    authDomain: "googly-a4001.firebaseapp.com",
    projectId: "googly-a4001",
    storageBucket: "googly-a4001.appspot.com",
    messagingSenderId: "1000418766278",
    appId: "1:1000418766278:web:42500a45ffe3f530be96c7",
    measurementId: "G-7H49L9EJ75",
    databaseURL:"https://googly-a4001-default-rtdb.firebaseio.com"
  };

 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()