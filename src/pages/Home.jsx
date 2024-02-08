import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoApps } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import GoogleImg from "../assets/Google.jpg";
import SearchBar from "../components/SearchBar";
import { languagesArray } from "../config/constant";
import { useDispatch } from "react-redux";
import { setsearchterm } from "../Store/Slices/SearchSlice";
import { GoogleAuthProvider,signInWithPopup,getRedirectResult,signOut,setPersistence,inMemoryPersistence } from "firebase/auth";
import { auth } from "../config/firebase";

import Authuser from "../context/AuthContext.jsx";



// import useLocationCheck from '../hooks/useLocationCheck';



function Home({setislistening}) {

 

   const {authobj,setauthobj}=Authuser()
   let localStorageData;

   if(localStorage.getItem("islogin"))
   {
        localStorageData=JSON.parse(localStorage.getItem("islogin")) 
      
   }
   else 
   {
    localStorage.setItem("islogin",JSON.stringify([false]))
   }
  
   function signinout()
   {
    const provider=new GoogleAuthProvider();
   if( localStorageData[0]===false || !JSON.parse(localStorage.getItem("islogin")))
   {
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        // Sign in with Google provider using redirect
        return signInWithPopup(auth, provider);
      })
      .then((result) => {
        // User signed in successfully
        const user = result.user;
        
        setauthobj(user);
        // Update the login state using the toggleLoginState function from the context
      
        
        // Store user authentication state in localStorage if needed
        localStorage.setItem("islogin", JSON.stringify([true,user?.photoURL,user?.displayName]));
      })
      .catch((error) => {
        // Handle sign-in errors
        console.error("Sign-in error:", error);
      });
   }
   else if(localStorageData[0]  )
   {
    signOut(auth)
    .then(() => {
      // User signed out successfully
      console.log("Sign-out successful");
      // Update the login state using the toggleLoginState function from the context
      setauthobj(null)
      // Remove user authentication state from localStorage if needed
      localStorage.setItem("islogin",JSON.stringify([false]));
    })
    .catch((error) => {
      // Handle sign-out errors
      console.error("Sign-out error:", error);
    });
   }
  }

  
 
 




  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setsearchterm(""));
   
  }, []);




  return (
    <div className="home min-h-screen w-full flex flex-col  gap-[6rem]">
      <div className="home_header  flex  justify-between items-center px-4 py-2 ">
        <div className="home_leftbar flex gap-3 items-center">
          <p
           
            className="text-[13px] sm:text-[15px]  mr-4 hover:underline text-slate-600 font-semibold" 
          >
            About
          </p>
        </div>
        <div className="home_rightbar flex  gap-1 sm:gap-3  items-center">
          <Link
            to="/"
            className=" text-[13px] sm:text-[15px] mr-4 hover:underline  text-slate-600 font-semibold"
          >
            Gmail
          </Link>
          <Link
            to="/"
            className="text-[13px] sm:text-[15px]  mr-4 hover:underline  text-slate-600 font-semibold"
          >
            Images
          </Link>
          <IoApps className=" mr-4 text-xl sm:text-2xl" />
          {(localStorage.getItem("islogin") &&  localStorageData[0]) ? (<img src={localStorageData[1]} onClick={signinout} className="rounded-full w-[35px]"/>) : (<RxAvatar className="text-xl sm:text-2xl mr-4 cursor-pointer" onClick={signinout} />)}

        </div>
      </div>
      <div className="home_body flex flex-col justify-center  ">
        <img src={GoogleImg} alt="" className=" max-w-[300px] sm:max-w-[400px] self-center" />
        <SearchBar setislistening={setislistening} />
        <div className="flex gap-2 text-sm items-center w-full justify-center flex-wrap px-2">
        Google offered in:{languagesArray.map((eachlanguage)=><span key={eachlanguage.key} className="text-xs text-blue-700 hover:underline cursor-pointer">{eachlanguage.name}</span>)}
        </div>
      </div>
      <div>
        
      </div>

     
    </div>
  );
}

export default Home;
