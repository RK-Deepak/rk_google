// import OpenAI from "openai";
// import { config } from "./config";

// export const openai = new OpenAI(
//   {
//     apiKey:config.chatgpt_api, dangerouslyAllowBrowser: true 
//   }
// );
import {GoogleGenerativeAI} from "@google/generative-ai"
import { config } from "./config";


const genAI=new GoogleGenerativeAI(config.gemini_api);
export const model = genAI.getGenerativeModel({ model: "gemini-pro"});
export const modelimage=genAI.getGenerativeModel({model:"gemini-pro-vision"})

