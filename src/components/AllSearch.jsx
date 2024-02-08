import React from "react";
import logog from "../assets/logog.png";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import { memo } from "react";

const AllSearch = () => {
  const wholedata = useSelector((store) => store.search.datavalue);

  

  return (
    <div className="flex flex-col gap-[1.75rem]">
      {wholedata !== null && wholedata?.items.length > 0 ? (
        wholedata?.items?.map((eachdata) => (
          <div
            key={eachdata.title}
            className="rounded-md flex gap-1 p-2 w-full sm:w-[80%] border sm:border-b sm:border-r-0 sm:border-l-0 sm:border-t-0"
          >
            <div>
              <img
                src={logog}
                alt=""
                className="w-[35px] aspect-auto rounded-full my-2"
              />
            </div>
            <div className="flex flex-col gap-1 overflow-clip">
              <div>
                <a
                  href={eachdata.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-black flex items-center gap-1 underline"
                >
                  {eachdata.link}
                </a>
              </div>
              <div>
                <a
                  href={eachdata.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md sm:text-lg font-semibold text-blue-800 hover:text-blue-400"
                >
                  {eachdata.title}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {eachdata.snippet}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Shimmer />
      )}
    </div>
  );
};

export default memo(AllSearch);
