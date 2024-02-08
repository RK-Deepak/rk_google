import React from "react";

import useGoogleSearch from "../hooks/useGoogleSearch";
import googleimg from "../assets/Google.jpg";
import SearchBar from "../components/SearchBar";
import { Link, Outlet } from "react-router-dom";
import { PiImageSquareBold } from "react-icons/pi";
import { FaArrowLeft, FaArrowRight, FaSearchengin } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../Store/Slices/ImageSlice";
import Chatgpt from "../components/Chatgpt";
import { memo } from "react";



function Search({setislistening}) {
  const dispatch = useDispatch();





  const {
    loading,
    error,
    nextpageloading,
    previouspageloading,
    startindeximages,
    startindexpages,
    searchimage,
  } = useGoogleSearch();
  const wholedata = useSelector((store) => store.search.datavalue);

  let searchtext = useSelector((store) => store.search.searchterm);

    
   const localdata=JSON.parse(localStorage.getItem("store_info"))
  return (
    <div className="search_page ">
      
      <div className="search_page_header border-b-2 flex flex-col px-2 gap-3 p-3 w-[90%] mx-auto">
        <div className="flex flex-row justify-evenly gap-4">
          <Link to="/">
            <img src={googleimg} alt="" className="w-[158px]" />
          </Link>
          <SearchBar hidebtns="true" setislistening={setislistening} />
        </div>

        <div className="options flex gap-2 mr-4 mb-2 self-center ">
          <Link
            to="/search"
            className={`border py-1 px-2 rounded-full flex items-center gap-1 hover:bg-slate-500 cursor-pointer 
          }`}
            onClick={() => dispatch(changeStatus(false))}
          >
            <FaSearchengin />
            <span>Search</span>
          </Link>
          <Link
            to="/search/images"
            className={`border py-1 px-2 rounded-full flex items-center gap-1 hover:bg-slate-500 cursor-pointer 
          }`}
            onClick={() => dispatch(changeStatus(true))}
          >
            <PiImageSquareBold />
            <span>Images</span>
          </Link>
          
        </div>
        
        {localStorage.getItem("islogin") && JSON.parse(localStorage.getItem("islogin"))[0] ? 
  <span className="self-center underline px-2 py-1 border rounded-full bg-slate-300 font-semibold w-fit">
    {JSON.parse(localStorage.getItem("islogin"))[2]}
  </span> :
  <span className="self-center underline px-2 py-1 border rounded-full bg-slate-300 font-semibold w-fit">
    Guest
  </span>
}

      </div>

      <div className="search_page_body my-2 flex flex-col gap-4 p-3 w-[90%] mx-auto">
      <Chatgpt/>
        <p className="font-bold text-blue-500 text-sm text-md">
          Search Result for or related to{" "}
          <span className="font-blue-500 underline capitalize">
            {searchtext?searchtext:localdata[0]}
          </span>
        </p>
        <p className="text-sm underline font-semibold">
          About {wholedata?.searchInformation?.formattedTotalResults} results (
          {wholedata?.searchInformation?.formattedSearchTime}secconds)
        </p>

        <Outlet />
        <div className="flex gap-1 items-center mb-[4.75rem]">
          {searchimage && startindeximages >= 11 ? (
            <button
              className="flex gap-1 items-center px-2 py-1 rounded-md font-bold text-blue-400"
              onClick={previouspageloading}
            >
              <FaArrowLeft  />
              Previous
            </button>
          ) : (
            startindexpages >= 11 && (
              <button
                className="flex gap-1 items-center  px-2 py-1 rounded-md font-bold text-blue-400"
                onClick={previouspageloading}
              >
                <FaArrowLeft />
                Previous
              </button>
            )
          )}
          <button
            className="flex gap-1 items-center  px-2 py-1 rounded-md font-bold text-blue-400"
            onClick={nextpageloading}
          >
            Next
            <FaArrowRight />
          </button>
        </div>
      </div>
      

    </div>
  );
}

export default memo(Search);
