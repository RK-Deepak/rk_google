import React from "react";
import { geolocation } from "../config/constant.js";
import useLocationCheck from "../hooks/useLocationCheck.jsx";
import { memo } from "react";

const Footer = () => {
  const {exactLocation}= useLocationCheck();
  const locationdata = exactLocation;
  

  return (
    <div className="flex flex-col gap-2 bg-slate-200">
      <div className="flex text-xs sm:text-[13px] gap-1 font-semibold  p-2">
        <span>
          {locationdata?.addresses[0]?.address?.countrySecondarySubdivision},
          
        </span>
        <span>{locationdata?.addresses[0]?.address?.countrySubdivision},</span>
        <span>{locationdata?.addresses[0]?.address?.country}</span>
      </div> 
       <div className="text-xs sm:text-sm text-center text-slate-600 ">
        @Copyright-Made By Deepak Verma
      </div>
    </div>
  );
};

export default memo(Footer);
