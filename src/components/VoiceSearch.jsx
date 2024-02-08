import React from "react";
import { IoMicCircleOutline } from "react-icons/io5";
import { GiSplitCross } from "react-icons/gi";
import { recognition } from "../hooks/VoiceRecognition";
import { memo } from "react";

const VoiceSearch = ({setislistening,isListening }) => {
  function closevoicerecognition()
  {
     setislistening(false);
     recognition.stop();
  }
  return (
    <div
      className="absolute left-0 right-0 top-0 bottom-0 w-full min-h-screen z-40"
      style={{ backgroundColor: "rgba(50, 50, 50, 0.8)" }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[400px] w-[60%] bg-white flex justify-center items-center z-50   flex-col gap-2">
        <div className="p-2 listeningeffect  ">
          <IoMicCircleOutline className="font-sans text-[100px] cursor-pointer" />
          <GiSplitCross className="absolute top-4 right-4 text-2xl"  onClick={closevoicerecognition}/>
        </div>
        <p className="text-xl absolute bottom-5 font-semibold">
          {isListening ? "Bolo Jai Shree Ram...." : ""}
        </p>
      </div>
    </div>
  );
};

export default memo(VoiceSearch);
