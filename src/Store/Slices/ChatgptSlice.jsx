import { createSlice } from "@reduxjs/toolkit";

const ChatgptSlice = createSlice({
  name: "gptsearch",
  initialState: {
    gptdata: null,
  },
  reducers: {
    changegptdata: (state, action) => {
   
      return {
        ...state,
        gptdata: action.payload,
      };
    },
  },
});
export default ChatgptSlice.reducer;
export const { changegptdata } = ChatgptSlice.actions;
