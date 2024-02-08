import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import ImageShimmer from "./ImageShimmer.jsx";
import { memo } from "react";

const Images = () => {
  const data = useSelector((store) => store.search.datavalue);

  if (data === null) {
    return <ImageShimmer />;
  }

  return (
    <div className="flex justify-around gap-3 flex-wrap p-2">
      {data.items && data.items.length > 0 && (
        data.items.map((eachdata) => (
          <div key={uuid()} className="flex flex-col gap-2 w-[250px] h-[250px] rounded-md">
            <a href={eachdata?.image?.contextLink} target="_blank" rel="noopener noreferrer">
              <img src={eachdata.link} alt="" className="w-[250px] max-h-[180px] rounded-md" />
              <p className="text-[14px] font-bold text-[#3c4043] underline overflow-clip">
                {eachdata?.snippet}
              </p>
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default memo(Images);
