import { createSlice } from "@reduxjs/toolkit";

const ImageSlice = createSlice({
  name: "imagesearch",
  initialState: {
    status: false,
  },
  reducers: {
    changeStatus: (state, action) => {
   
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});
export default ImageSlice.reducer;
export const { changeStatus } = ImageSlice.actions;
