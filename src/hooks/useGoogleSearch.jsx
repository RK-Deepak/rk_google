import { useEffect, useState } from "react";
import { config } from "../config/config";

import { useDispatch } from "react-redux";
import { changevalue, removeAllvalue } from "../Store/Slices/SearchSlice";
import { useSelector } from "react-redux";





const useGoogleSearch = () => {

  const localdata=JSON.parse(localStorage.getItem("store_info"));
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const [startindexpages, setstartindexpages] = useState(1);
  const [startindeximages, setstartindeximages] = useState(1);
  const dispatch = useDispatch();
  let searchimage = useSelector((store) => store.imagesearch.status);
 
  let searchtext = useSelector((store) => store.search.searchterm);

 

  

if(searchtext==="")
{
  searchtext=localdata[0];
 searchimage=localdata[1]
  
  
  
}
  
   

  const fetchsearchdata = async () => {
   

    try {
      setloading(true);

      if (!searchimage && searchtext !== "") {
        
        dispatch(removeAllvalue());
        let dataresponse = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${config.googleapi}&cx=${config.searchengine_id}&q=${searchtext}&start=${startindexpages}&gl=in`
          
        );

        const dataobj = await dataresponse.json();
        localStorage.setItem("store_info",JSON.stringify([searchtext,searchimage]));

        dispatch(changevalue(dataobj));

       

    
        
           
        

         
        
       

       

      } else if (searchimage && searchtext !== "") {
        dispatch(removeAllvalue());
        let dataresponse = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${config.googleapi}&cx=${config.searchengine_id}&q=${searchtext}&start=${startindeximages}&gl=in&searchType=image`
        );
        const dataobj = await dataresponse.json();
        localStorage.setItem("store_info",JSON.stringify([searchtext,searchimage]));

       console.log(dataobj)

        dispatch(changevalue(dataobj));
      }

     
    } catch (error) {
      seterror(error);
    } finally {
      setloading(false);
    }
  };

  function nextpageloading() {
    if (searchimage) {
      setstartindeximages((prev) => prev + 10);
    } else {
      setstartindexpages((prev) => prev + 10);
    }
  }
  function previouspageloading() {
    if (searchimage) {
      setstartindeximages((prev) => prev - 10);
    } else {
      setstartindexpages((prev) => prev - 10);
    }
  }
  useEffect(() => {
    fetchsearchdata();
  }, [searchtext, searchimage, startindexpages, startindeximages]);

  return {
    error,
    nextpageloading,
    previouspageloading,
    startindeximages,
    startindexpages,
    searchimage,
  };
};

export default useGoogleSearch;
