import { configureStore } from "@reduxjs/toolkit";
import ImageSlice from "./Slices/ImageSlice";
import SearchSlice from "./Slices/SearchSlice";
import ChatgptSlice from "./Slices/ChatgptSlice";


export const appStore = configureStore({
  reducer: {
    imagesearch: ImageSlice,
    search: SearchSlice,
    gptsearch:ChatgptSlice
    
  },
});
