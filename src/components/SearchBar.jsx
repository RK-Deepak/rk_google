import { Button } from "@mui/material";
import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosMic} from "react-icons/io";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
import useSearchBarFN from "../hooks/useSearchBarFN";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { memo } from "react";

import {
  clearsuggestion,
  setfocused,
  setsearchsuggestion,
} from "../Store/Slices/SearchSlice";
import { recognition } from "../hooks/VoiceRecognition";


const SearchBar = ({ hidebtns ,setislistening }) => {
 
  const dispatch = useDispatch();
  const suggestion = useSelector((store) => store.search.searchsuggestion);
  let searchtext = useSelector((store) => store.search.searchterm);
  const isfocused = useSelector((store) => store.search.isfocused);
  let searchimage = useSelector((store) => store.imagesearch.status);
  

const {
    inputtext,
    handlesubmit,
    searchSuggestionHandler,
    suggestionTextuse,
    randomtext,
    setinputtext,
  } = useSearchBarFN();

  const openVoiceRecognistation=()=>
  {
     setislistening(true);
     recognition.start();

     recognition.onresult=(event)=>
     {
      console.log(event);
      const result=event.results[0][0].transcript;
     
      if(result!==null || result!=="" || result!==" ")
      {
        setinputtext(result);
        handlesubmit(event,result)
        setislistening(false)
       
      }
    
     }
  }

  

  useEffect(() => {
    let timerid;

    if (timerid) {
      clearInterval(timerid);
    }
    timerid = setTimeout(() => {
      async function fetchsuggestion() {
        if (inputtext !== "") {
          const responsedata = await fetch(
            `https://corsproxy.org/?https%3A%2F%2Fsuggestqueries.google.com%2Fcomplete%2Fsearch%3Fclient%3Dfirefox%26ds%3Dyt%26q%3D${inputtext}`
          );
          const obj = await responsedata.json();

          dispatch(setsearchsuggestion(obj[1]));
        }
      }
      fetchsuggestion();
    }, 200);

    return () => clearInterval(timerid);
  }, [inputtext]);

  useEffect(() => {
   
    dispatch(clearsuggestion());
    setinputtext(searchtext);
    dispatch(setfocused(false));
     localStorage.setItem("store_info",JSON.stringify([searchtext,searchimage]))
    
  }, [searchtext]);


  

  return (
    <form
      className={`search flex items-center ${
        hidebtns ? "flex-row pb-2 w-[80%]" : "flex-col"
      }`}
    >
      <div className="searchbar_input border-2 flex p-2 rounded-full w-[50%] items-center mx-auto my-2  justify-between relative ">
        <HiMagnifyingGlass className="mx-2 text-lg sm:text-xl " />
        <input
          type="text"
          className="w-[100%] outline-none pr-2 text-sm sm:text-md"
          onChange={searchSuggestionHandler}
          value={inputtext}
        ></input>

        <IoIosMic className="mx-2 text-lg sm:text-xl  cursor-pointer" onClick={openVoiceRecognistation}/>

        {suggestion && inputtext!="" && suggestion.length > 0 && (
          <div
            className={` absolute bg-white  w-[97%] z-20 top-[2.7rem] left-[4px]  sm:left-2 border-l border-r border-b p-2 ${
              isfocused ? "block" : "hidden"
            } `}
          >
            <ul className="flex flex-col gap-[3px]">
              {suggestion.map((suggestion, index) => {
                return (
                  <Link
                    key={suggestion + index.toString()}
                    className="flex gap-2 items-center  hover:bg-slate-300 px-1 rounded-md "
                    onClick={(e) => {
                      suggestionTextuse(e);
                    }}
                  >
                    <FaSearchengin className="  hidden sm:block sm:text-md " />
                    <li className=" font-semibold sm:font-bold text-slate-500 p-1 capitalize hover:underline text-xs sm:text-[16px]">
                      {suggestion}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {!hidebtns ? (
        <div className="search_buttons flex gap-2 my-3">
          <Button type="submit" className="buttons" onClick={handlesubmit}>
            Google Search
          </Button>
          <Button variant="outlined" onClick={(e) => randomtext(e)}>
            I'm feeling Lucky
          </Button>
        </div>
      ) : (
        <div className="search_buttons flex gap-2 my-3">
          <Button
            type="submit"
            className="buttons btnhidden"
            onClick={handlesubmit}
          >
            Google Search
          </Button>
          <Button variant="outlined" className="btnhidden">
            I'm feeling Lucky
          </Button>
        </div>
      )}
    </form>
  );
};

export default memo(SearchBar);
