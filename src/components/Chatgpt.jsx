import React, { useEffect, useState } from 'react';
import { FaUpDown } from 'react-icons/fa6';
import ChatgptShimmer from './ChatgptShimmer.jsx';
import { model } from '../config/openai-test.js';
import { memo } from "react";

const Chatgpt = () => {
  const [showgptresult, setshowgptresult] = useState(false);
  const [gptdata, setgptdata] = useState(null);
  const localdata = JSON.parse(localStorage.getItem('store_info'));

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getChatGptData() {
      try {
        if (localdata[0] !== '' ) {
          const result = await model.generateContent(`Generate content based on ${localdata[0]}
            Include song lyrics if the topic pertains to a song.
            Ensure the generated content consists of relevant headings and separated paragraphs.
            Maintain a total word count between 500 and 800 words.
            Apply HTML tags and Tailwind CSS classes to style the content.
            Use different colors for headings and paragraphs, with headings being larger in size (text-lg) compared to paragraphs (text-md or text-sm).
          
            Avoid adding videos and images.
            Exclusively use Tailwind CSS for styling, without regular CSS.
            Ensure the generated HTML code is concise and free of unnecessary elements.
            Ensure the generated code snippet in html tags`
          , { signal });
          const response = result.response;
       
          setgptdata(response);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted Request");
        } else {
          console.error(error);
        }
      }
    }

    getChatGptData();

    return () => {
      controller.abort(); 
    };
  }, [localdata[0]]);

  function handleGptSearch() {
    setshowgptresult((prev) => !prev);
  }

  return (
    <div className='flex flex-col gap-2 relative'>
      <div className='flex justify-between items-center p-2 border-2 rounded-md' onClick={handleGptSearch}>
        <span className='font-bold text-[16px]'>Gemini AI Result</span>
        <FaUpDown />
      </div>
      {showgptresult && (
        <div className='py-2 px-4 absolute top-[3rem] w-full h-fit bg-white font-serif text-sm border-2 rounded-md z-10'>
          {gptdata && gptdata !== '' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: gptdata?.candidates[0]?.content?.parts[0].text,
              }}
            />
          ) : (
            <ChatgptShimmer />
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Chatgpt);
